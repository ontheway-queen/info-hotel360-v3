// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useLanguage } from "@/i18n/LanguageProvider";

// export function DemoForm() {
//   const { t } = useLanguage();
//   const f = t.demoForm;
//   const [submitted, setSubmitted] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   function onSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const data = new FormData(e.currentTarget);
//     const errs: Record<string, string> = {};
//     ["fullName", "email", "phone"].forEach((k) => {
//       if (!data.get(k)) errs[k] = f.validation.required;
//     });
//     const email = data.get("email") as string;
//     if (email && !/^\S+@\S+\.\S+$/.test(email)) errs.email = f.validation.email;
//     setErrors(errs);
//     if (Object.keys(errs).length === 0) setSubmitted(true);
//   }

//   if (submitted) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="p-10 rounded-2xl bg-gradient-primary text-primary-foreground text-center font-semibold"
//       >
//         {f.success}
//       </motion.div>
//     );
//   }

//   const fields: { name: string; label: string; type?: string; full?: boolean; textarea?: boolean }[] = [
//     { name: "fullName", label: f.fullName },
//     { name: "companyName", label: f.companyName },
//     { name: "hotelName", label: f.hotelName },
//     { name: "email", label: f.email, type: "email" },
//     { name: "phone", label: f.phone, type: "tel" },
//     { name: "rooms", label: f.rooms, type: "number" },
//     { name: "message", label: f.message, full: true, textarea: true },
//   ];

//   return (
//     <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card grid sm:grid-cols-2 gap-5">
//       {fields.map((field) => (
//         <div key={field.name} className={field.full ? "sm:col-span-2" : ""}>
//           <label className="block text-sm font-semibold mb-1.5">{field.label}</label>
//           {field.textarea ? (
//             <textarea
//               name={field.name}
//               rows={4}
//               className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
//             />
//           ) : (
//             <input
//               name={field.name}
//               type={field.type ?? "text"}
//               className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
//             />
//           )}
//           {errors[field.name] && (
//             <p className="text-xs text-destructive mt-1">{errors[field.name]}</p>
//           )}
//         </div>
//       ))}
//       <button
//         type="submit"
//         className="sm:col-span-2 px-6 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold shadow-elegant hover:opacity-90 transition"
//       >
//         {f.submit}
//       </button>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CheckCircle2, Loader2, SendIcon, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLanguage } from "@/i18n/LanguageProvider";

export function DemoForm() {
  const { t, lang } = useLanguage();
  const isBn = lang === "bn";

  const demoSchema = z.object({
    fullName: z
      .string()
      .trim()
      .min(2, isBn ? "পূর্ণ নাম প্রয়োজন" : "Full name is required"),

    companyName: z.string().optional(),

    hotelName: z.string().optional(),

    email: z
      .string()
      .trim()
      .email(isBn ? "একটি সঠিক ইমেইল দিন" : "Invalid email address"),

    phone: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val || val.trim() === "" || (/^\+?\d+$/.test(val.trim()) && val.trim().length >= 8),
        {
          message: isBn ? "সঠিক ফোন নম্বর দিন" : "Invalid phone number",
        },
      ),

    rooms: z.string().optional(),

    message: z
      .string()
      .trim()
      .min(5, isBn ? "মেসেজ প্রয়োজন" : "Message is required"),
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // "I'm not a robot" checkbox state
  const [isRobotVerified, setIsRobotVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [robotError, setRobotError] = useState<string | null>(null);

  type DemoFormValues = z.infer<typeof demoSchema>;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    mode: "onChange",
  });

  // Watch required fields to conditionally disable submit button
  const watchedFullName = watch("fullName");
  const watchedEmail = watch("email");
  const watchedMessage = watch("message");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isFormValid =
    Boolean(watchedFullName && watchedFullName.trim().length >= 2) &&
    Boolean(watchedEmail && emailRegex.test(watchedEmail.trim())) &&
    Boolean(watchedMessage && watchedMessage.trim().length >= 5) &&
    isRobotVerified;

  const isSubmitDisabled = loading || !isFormValid;

  const handleRobotToggle = () => {
    if (isRobotVerified) {
      setIsRobotVerified(false);
      return;
    }
    if (isVerifying) return;
    setIsVerifying(true);
    setRobotError(null);
    setTimeout(() => {
      setIsVerifying(false);
      setIsRobotVerified(true);
    }, 600);
  };

  const onSubmit = async (data: DemoFormValues) => {
    if (!isRobotVerified) {
      setRobotError(t.demoForm.validation.robotRequired);
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    try {
      const payload: Record<string, string> = {
        service_name: "Hotel360",
      };

      if (data.fullName?.trim()) payload.name = data.fullName.trim();
      if (data.email?.trim()) payload.email = data.email.trim();
      if (data.phone?.trim()) payload.phone = data.phone.trim();
      if (data.companyName?.trim()) payload.company_name = data.companyName.trim();

      const detailsParts: string[] = [];
      if (data.hotelName?.trim()) detailsParts.push(`Hotel Name: ${data.hotelName.trim()}`);
      if (data.rooms?.trim()) detailsParts.push(`Rooms: ${data.rooms.trim()}`);
      if (data.message?.trim()) detailsParts.push(`Details: ${data.message.trim()}`);

      if (detailsParts.length > 0) {
        payload.details = detailsParts.join(", ");
      }

      const res = await fetch(
        "https://erm-server.m360ict.com/api/v1/public/common/service-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to submit request");
      }

      setSubmitted(true);
      reset();
      setIsRobotVerified(false);
      setRobotError(null);
    } catch (err) {
      console.error("Service request error:", err);
      setErrorMsg(
        isBn
          ? "অনুরোধ জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
          : "Something went wrong submitting your request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-[var(--success)]/30 bg-[var(--success)]/10 p-10 text-center"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-[var(--success)]" />

        <p className="mt-4 text-lg font-semibold text-foreground">{t.demoForm.success}</p>
      </motion.div>
    );
  }

  const field = (
    name: keyof DemoFormValues,
    label: string,
    placeholder: string,
    type = "text",
    as: "input" | "textarea" = "input",
    required = false,
  ) => (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-destructive font-bold">*</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          {...register(name)}
          placeholder={placeholder}
          rows={4}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      ) : (
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      )}

      {errors[name] && <p className="mt-1 text-xs text-destructive">{errors[name]?.message}</p>}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {field(
          "fullName",
          t.demoForm.fullName,
          t.demoForm.placeholders.fullName,
          "text",
          "input",
          true,
        )}

        {field("companyName", t.demoForm.companyName, t.demoForm.placeholders.companyName)}

        {field("hotelName", t.demoForm.hotelName, t.demoForm.placeholders.hotelName)}

        {field("email", t.demoForm.email, t.demoForm.placeholders.email, "email", "input", true)}

        {field("phone", t.demoForm.phone, t.demoForm.placeholders.phone, "tel")}

        {field("rooms", t.demoForm.rooms, t.demoForm.placeholders.rooms, "number")}
      </div>

      <div className="mt-4">
        {field(
          "message",
          t.demoForm.message,
          t.demoForm.placeholders.message,
          "text",
          "textarea",
          true,
        )}
      </div>

      <div className="mt-5">
        <div
          className={`inline-flex w-full max-w-[310px] items-center justify-between rounded-lg border bg-[#f9fafb] px-3.5 py-3 shadow-xs dark:bg-card/90 transition-all ${
            robotError
              ? "border-destructive ring-1 ring-destructive/30"
              : "border-border hover:border-border/80"
          }`}
        >
          <div
            onClick={handleRobotToggle}
            className="flex cursor-pointer items-center gap-3 select-none"
          >
            <button
              type="button"
              role="checkbox"
              aria-checked={isRobotVerified}
              disabled={isVerifying}
              onClick={(e) => {
                e.stopPropagation();
                handleRobotToggle();
              }}
              className={`relative flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-sm border-2 bg-white transition-all dark:bg-slate-900 ${
                isRobotVerified
                  ? "border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40"
                  : "border-slate-300 hover:border-slate-400 dark:border-slate-700"
              }`}
            >
              {isVerifying ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : isRobotVerified ? (
                <Check className="h-5 w-5 text-emerald-600 stroke-[3]" />
              ) : null}
            </button>

            <span className="text-sm font-medium text-foreground">{t.demoForm.robotCheck}</span>
          </div>

          <div className="flex flex-col items-center pl-4 text-muted-foreground select-none">
            <ShieldCheck className="h-6 w-6 text-primary/80" />
            <span className="text-[10px] font-semibold tracking-tight text-foreground/80">
              reCAPTCHA
            </span>
            <div className="flex gap-1 text-[9px] text-muted-foreground/70">
              <span>Privacy</span>
              <span>·</span>
              <span>Terms</span>
            </div>
          </div>
        </div>

        {robotError && <p className="mt-1.5 text-xs font-medium text-destructive">{robotError}</p>}
      </div>

      {errorMsg && (
        <p className="mt-3 text-center text-sm font-medium text-destructive">{errorMsg}</p>
      )}

      <div className="w-full flex justify-center">
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-primary-glow px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none md:w-auto"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {t.demoForm.submit}
              <SendIcon size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
