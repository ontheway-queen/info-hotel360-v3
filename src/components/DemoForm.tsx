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
import { CheckCircle2, Loader2, SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLanguage } from "@/i18n/LanguageProvider";

export function DemoForm() {
  const { t, lang } = useLanguage();
  const isBn = lang === "bn";

  const demoSchema = z.object({
    fullName: z.string().min(2, isBn ? "পূর্ণ নাম প্রয়োজন" : "Full name is required"),

    companyName: z.string().optional(),

    hotelName: z.string().optional(),

    email: z.string().email(isBn ? "একটি সঠিক ইমেইল দিন" : "Invalid email address"),

    phone: z
      .string()
      .min(8, isBn ? "ফোন নম্বর খুব ছোট" : "Phone number is too short")
      .regex(/^\+?\d+$/, isBn ? "সঠিক ফোন নম্বর দিন" : "Invalid phone number"),

    rooms: z.string().optional(),

    message: z.string().min(5, isBn ? "মেসেজ প্রয়োজন" : "Message is required"),
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  type DemoFormValues = z.infer<typeof demoSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: DemoFormValues) => {
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

      const res = await fetch("https://erm-server.m360ict.com/api/v1/public/common/service-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit request");
      }

      setSubmitted(true);
      reset();
    } catch (err) {
      console.error("Service request error:", err);
      setErrorMsg(
        isBn
          ? "অনুরোধ জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
          : "Something went wrong submitting your request. Please try again."
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
  ) => (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>

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
        {field("fullName", t.demoForm.fullName, t.demoForm.placeholders.fullName)}

        {field("companyName", t.demoForm.companyName, t.demoForm.placeholders.companyName)}

        {field("hotelName", t.demoForm.hotelName, t.demoForm.placeholders.hotelName)}

        {field("email", t.demoForm.email, t.demoForm.placeholders.email, "email")}

        {field("phone", t.demoForm.phone, t.demoForm.placeholders.phone, "tel")}

        {field("rooms", t.demoForm.rooms, t.demoForm.placeholders.rooms, "number")}
      </div>

      <div className="mt-4">
        {field("message", t.demoForm.message, t.demoForm.placeholders.message, "text", "textarea")}
      </div>
      {errorMsg && (
        <p className="mt-3 text-center text-sm font-medium text-destructive">{errorMsg}</p>
      )}
      <div className="w-full flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-primary-glow px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed md:w-auto"
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
