"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLanguage } from "@/i18n/LanguageProvider";
import { GoogleRecaptcha } from "@/components/GoogleRecaptcha";

export function DemoForm() {
  const { t, lang } = useLanguage();
  const isBn = lang === "bn";

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [robotError, setRobotError] = useState<string | null>(null);

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
    Boolean(captchaToken);

  const isSubmitDisabled = loading || !isFormValid;

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (token) {
      setRobotError(null);
    }
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
  };

  const onSubmit = async (data: DemoFormValues) => {
    if (!captchaToken) {
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
      setCaptchaToken(null);
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

  const siteKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Lf0eOEtAAAAANDfIwtWeIY57OCvZg6mf3FXUPh7";

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

      <div className="mt-5 flex flex-col items-start">
        <div className="overflow-hidden ">
          <GoogleRecaptcha
            key={lang}
            siteKey={siteKey}
            onChange={handleCaptchaChange}
            onExpired={handleCaptchaExpired}
            lang={isBn ? "bn" : "en"}
          />
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
