// import { createFileRoute } from "@tanstack/react-router";
// import { useLanguage } from "@/i18n/LanguageProvider";
// import { useSeo } from "@/lib/useSeo";
// import { Section, SectionHeader } from "@/components/Section";
// import { DemoForm } from "@/components/DemoForm";

// export const Route = createFileRoute("/pricing")({
//   component: Page,
//   head: () => ({ meta: [{ title: "Pricing & Demo | THEHOTEL360" }] }),
// });

// function Page() {
//   useSeo("pricing");
//   const { t } = useLanguage();
//   return (
//     <Section className="!pt-16">
//       <SectionHeader title={t.demoForm.title} subtitle={t.demoForm.subtitle} />
//       <div className="max-w-3xl mx-auto">
//         <DemoForm />
//       </div>
//     </Section>
//   );
// }

import { useLanguage } from "@/i18n/LanguageProvider";
import { createFileRoute } from "@tanstack/react-router";

// ─── Pricing data (add this block into your translations.ts under both en & bn) ───
// translations.en.pricing = { ... }  /  translations.bn.pricing = { ... }
// The shape is defined by PricingPlan[] below.

export interface PricingPlan {
  name: string;
  subtitle: string;
  price: string;
  currency: string;
  period: string;
  features: string[];
  highlighted: boolean;
}

export interface PricingTranslation {
  sectionBadge: string;
  sectionTitle1: string;
  sectionTitle2: string;
  subtitle: string;
  popular: string;
  cta: string;
  plans: PricingPlan[];
}

export const pricingTranslations: Record<"en" | "bn", PricingTranslation> = {
  en: {
    sectionBadge: "Pricing Plans",
    sectionTitle1: "Simple & ",
    sectionTitle2: "Transparent Pricing",
    subtitle: "Choose the right plan for your business size. No hidden charges.",
    popular: "⭐ Popular",
    cta: "Get Started",
    plans: [
      {
        name: "Basic",
        subtitle: "For small hotels",
        price: "18,000",
        currency: "BDT",
        period: "/month",
        highlighted: false,
        features: [
          "Up to 20 rooms",
          "Basic reports",
          "Email support",
          "Monthly backup",
          "3 user accounts",
        ],
      },
      {
        name: "Pro",
        subtitle: "For medium-sized businesses",
        price: "30,000",
        currency: "BDT",
        period: "/month",
        highlighted: false,
        features: [
          "Up to 40 rooms",
          "5 restaurants",
          "Advanced reports & analytics",
          "Human resource management",
          "Real-time room availability tracking",
          "Accounts management",
          "Daily backup",
          "10 user accounts",
          "Guest reports",
        ],
      },
      {
        name: "Business",
        subtitle: "For large/medium/small businesses",
        price: "60,000",
        currency: "BDT",
        period: "/month",
        highlighted: true,
        features: [
          "Unlimited rooms",
          "Unlimited restaurants",
          "Advanced reports & analytics",
          "Human resource management",
          "Real-time room availability tracking",
          "Hotel website (online booking)",
          "Expense management",
          "Inventory management",
          "Vendor management",
          "Accounts management",
          "Daily backup",
          "Unlimited users",
          "Custom email templates",
          "Guest reports",
        ],
      },
      {
        name: "Enterprise",
        subtitle: "For large hotel chains & resorts",
        price: "Custom",
        currency: "",
        period: "",
        highlighted: false,
        features: [
          "Unlimited rooms",
          "Unlimited restaurants",
          "Advanced reports & analytics",
          "Human resource management",
          "Real-time room availability tracking",
          "Hotel website (online booking)",
          "Expense management",
          "Inventory management",
          "Vendor management",
          "Accounts management",
          "Daily backup",
          "Unlimited users",
          "Custom email templates",
          "Guest reports",
          "Housekeeping management",
          "Channel manager",
          "Custom services & value-added services",
        ],
      },
    ],
  },

  bn: {
    sectionBadge: "প্লান সমূহ",
    sectionTitle1: "সহজ ও ",
    sectionTitle2: "স্বচ্ছ প্রাইসিং",
    subtitle: "আপনার ব্যবসার সাইজ অনুযায়ী সঠিক প্লান বেছে নিন। কোন লুকানো চার্জ নেই।",
    popular: "⭐ জনপ্রিয়",
    cta: "শুরু করুন",
    plans: [
      {
        name: "বেসিক",
        subtitle: "ছোট হোটেলের জন্য",
        price: "১৮,০০০",
        currency: "টাকা",
        period: "/মাস",
        highlighted: false,
        features: [
          "২০টি পর্যন্ত রুম",
          "বেসিক রিপোর্ট",
          "Email সাপোর্ট",
          "মাসিক ব্যাকআপ",
          "৩ জন ইউজার",
        ],
      },
      {
        name: "প্রো",
        subtitle: "মাঝারি আকারের ব্যবসার জন্য",
        price: "৩০,০০০",
        currency: "টাকা",
        period: "/মাস",
        highlighted: false,
        features: [
          "৪০টি পর্যন্ত রুম",
          "৫টি রেস্তুরেন্ট",
          "Advanced রিপোর্ট ও Analytics",
          "হিউমান রিসোর্স ম্যানেজমেন্ট",
          "রিয়েল-টাইম রুম availability ট্র্যাকিং",
          "অ্যাকাউন্টস ম্যানেজমেন্ট",
          "দৈনিক ব্যাকআপ",
          "১০ জন ইউজার",
          "গেস্ট রিপোর্ট",
        ],
      },
      {
        name: "বিজনেস",
        subtitle: "বড়/মাঝারি/ছোট আকারের ব্যবসার জন্য",
        price: "৬০,০০০",
        currency: "টাকা",
        period: "/মাস",
        highlighted: true,
        features: [
          "Unlimited রুম",
          "Unlimited রেস্তুরেন্ট",
          "Advanced রিপোর্ট ও Analytics",
          "হিউমান রিসোর্স ম্যানেজমেন্ট",
          "রিয়েল-টাইম রুম availability ট্র্যাকিং",
          "হোটেল ওয়েবসাইট (অনলাইন বুকিং)",
          "এক্সপেন্স ম্যানেজমেন্ট",
          "ইনভেন্টরি ম্যানেজমেন্ট",
          "ভেন্ডর ম্যানেজমেন্ট",
          "অ্যাকাউন্টস ম্যানেজমেন্ট",
          "দৈনিক ব্যাকআপ",
          "Unlimited ইউজার",
          "কাস্টম ইমেইল টেমপ্লেট",
          "গেস্ট রিপোর্ট",
        ],
      },
      {
        name: "এন্টারপ্রাইজ",
        subtitle: "বড় হোটেল চেইন ও রিসোর্টের জন্য",
        price: "কাস্টম",
        currency: "",
        period: "",
        highlighted: false,
        features: [
          "Unlimited রুম",
          "Unlimited রেস্তুরেন্ট",
          "Advanced রিপোর্ট ও Analytics",
          "হিউমান রিসোর্স ম্যানেজমেন্ট",
          "রিয়েল-টাইম রুম availability ট্র্যাকিং",
          "হোটেল ওয়েবসাইট (অনলাইন বুকিং)",
          "এক্সপেন্স ম্যানেজমেন্ট",
          "ইনভেন্টরি ম্যানেজমেন্ট",
          "ভেন্ডর ম্যানেজমেন্ট",
          "অ্যাকাউন্টস ম্যানেজমেন্ট",
          "দৈনিক ব্যাকআপ",
          "Unlimited ইউজার",
          "কাস্টম ইমেইল টেমপ্লেট",
          "গেস্ট রিপোর্ট",
          "Housekeeping ম্যানেজমেন্ট",
          "চ্যানেল ম্যানেজার",
          "কাস্টম সেবা ও প্রয়োজনীয় সার্ভিস",
        ],
      },
    ],
  },
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="9" fill="#1D6FE8" fillOpacity="0.12" />
    <path
      d="M5 9.5L7.5 12L13 7"
      stroke="#1D6FE8"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIconWhite = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="9" fill="rgba(255,255,255,0.22)" />
    <path
      d="M5 9.5L7.5 12L13 7"
      stroke="#fff"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/pricing")({
  component: Page,
  head: () => ({ meta: [{ title: "Pricing & Demo | THEHOTEL360" }] }),
});
export default function Page() {
  // lang comes from your existing LanguageProvider — no local toggle needed
  const { lang } = useLanguage();
  const activeLang = (lang === "bn" ? "bn" : "en") as "en" | "bn";
  const p = pricingTranslations[activeLang];

  return (
    <>
      <section className=" py-20 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-primary text-white text-xs font-bold px-5 py-1.5 rounded-full">
            {p.sectionBadge}
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold mt-5 text-slate-900">
            {p.sectionTitle1}
            <span className="text-primary">{p.sectionTitle2}</span>
          </h2>

          <p className="text-slate-500 mt-3 max-w-xl mx-auto">{p.subtitle}</p>
        </div>

        {/* Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {p.plans.map((plan, idx) => (
            <div
              key={idx}
              className={`flex flex-col h-full rounded-2xl border p-6 shadow-sm transition ${
                plan.highlighted
                  ? "bg-primary text-white border-transparent shadow-xl scale-[1.03]"
                  : "bg-white border-slate-200"
              }`}
            >
              {/* Badge */}
              {plan.highlighted && (
                <div className="text-xs font-bold bg-white text-primary px-4 py-1 rounded-full w-fit mx-auto mb-4">
                  {p.popular}
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p
                className={`text-sm mt-1 ${plan.highlighted ? "text-white/70" : "text-slate-500"}`}
              >
                {plan.subtitle}
              </p>

              {/* Divider */}
              <div
                className={`h-1 w-10 rounded mt-4 ${plan.highlighted ? "bg-white/40" : "bg-primary"}`}
              />

              {/* Price */}
              <div className="mt-6">
                {plan.currency ? (
                  <div className="text-3xl font-extrabold">
                    {plan.price}
                    <span className="text-sm ml-1 font-medium">{plan.currency}</span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold">{plan.price}</div>
                )}
                {plan.period && (
                  <div
                    className={`text-sm mt-1 ${plan.highlighted ? "text-white/70" : "text-slate-500"}`}
                  >
                    {plan.period}
                  </div>
                )}
              </div>

              {/* Features (IMPORTANT: flex-1 makes equal height layout work) */}
              <ul className="mt-6 space-y-2 flex-1">
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    className={`flex gap-2 text-sm ${
                      plan.highlighted ? "text-white/90" : "text-slate-600"
                    }`}
                  >
                    {plan.highlighted ? <CheckIconWhite /> : <CheckIcon />}
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`mt-6 w-full py-3 rounded-xl font-semibold transition ${
                  plan.highlighted
                    ? "bg-white text-primary hover:bg-slate-100"
                    : "bg-primary text-white hover:opacity-90"
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// import { useState } from "react";
// import { useLanguage } from "@/i18n/LanguageProvider";
// import { createFileRoute } from "@tanstack/react-router";

// // ─── Types ─────────────────────────────────────────────

// export interface PricingPlan {
//   name: string;
//   subtitle: string;
//   price: string;
//   currency: string;
//   period: string;
//   features: string[];
//   highlighted: boolean;
// }

// export interface PricingTranslation {
//   sectionBadge: string;
//   sectionTitle1: string;
//   sectionTitle2: string;
//   subtitle: string;
//   popular: string;
//   cta: string;
//   plans: PricingPlan[];
// }

// // ─── Translations ──────────────────────────────────────

// export const pricingTranslations: Record<"en" | "bn", PricingTranslation> = {
//   en: {
//     sectionBadge: "Pricing Plans",
//     sectionTitle1: "Simple & ",
//     sectionTitle2: "Transparent Pricing",
//     subtitle: "Choose the right plan for your business size. No hidden charges.",
//     popular: "⭐ Popular",
//     cta: "Get Started",
//     plans: [
//       {
//         name: "Basic",
//         subtitle: "For small hotels",
//         price: "18,000",
//         currency: "BDT",
//         period: "/month",
//         highlighted: false,
//         features: [
//           "Up to 20 rooms",
//           "Basic reports",
//           "Email support",
//           "Monthly backup",
//           "3 user accounts",
//         ],
//       },
//       {
//         name: "Pro",
//         subtitle: "For medium-sized businesses",
//         price: "30,000",
//         currency: "BDT",
//         period: "/month",
//         highlighted: false,
//         features: [
//           "Up to 40 rooms",
//           "5 restaurants",
//           "Advanced reports & analytics",
//           "Human resource management",
//           "Real-time room availability tracking",
//           "Accounts management",
//           "Daily backup",
//           "10 user accounts",
//           "Guest reports",
//         ],
//       },
//       {
//         name: "Business",
//         subtitle: "For large/medium/small businesses",
//         price: "60,000",
//         currency: "BDT",
//         period: "/month",
//         highlighted: true,
//         features: [
//           "Unlimited rooms",
//           "Unlimited restaurants",
//           "Advanced reports & analytics",
//           "Human resource management",
//           "Real-time room availability tracking",
//           "Hotel website (online booking)",
//           "Expense management",
//           "Inventory management",
//           "Vendor management",
//           "Accounts management",
//           "Daily backup",
//           "Unlimited users",
//           "Custom email templates",
//           "Guest reports",
//         ],
//       },
//       {
//         name: "Enterprise",
//         subtitle: "For large hotel chains & resorts",
//         price: "Custom",
//         currency: "",
//         period: "",
//         highlighted: false,
//         features: [
//           "Unlimited rooms",
//           "Unlimited restaurants",
//           "Advanced reports & analytics",
//           "Human resource management",
//           "Real-time room availability tracking",
//           "Hotel website (online booking)",
//           "Expense management",
//           "Inventory management",
//           "Vendor management",
//           "Accounts management",
//           "Daily backup",
//           "Unlimited users",
//           "Custom email templates",
//           "Guest reports",
//           "Housekeeping management",
//           "Channel manager",
//           "Custom services & value-added services",
//         ],
//       },
//     ],
//   },

//   bn: {
//     sectionBadge: "প্লান সমূহ",
//     sectionTitle1: "সহজ ও ",
//     sectionTitle2: "স্বচ্ছ প্রাইসিং",
//     subtitle: "আপনার ব্যবসার সাইজ অনুযায়ী সঠিক প্লান বেছে নিন। কোন লুকানো চার্জ নেই।",
//     popular: "⭐ জনপ্রিয়",
//     cta: "শুরু করুন",
//     plans: [
//       {
//         name: "বেসিক",
//         subtitle: "ছোট হোটেলের জন্য",
//         price: "১৮,০০০",
//         currency: "টাকা",
//         period: "/মাস",
//         highlighted: false,
//         features: [
//           "২০টি পর্যন্ত রুম",
//           "বেসিক রিপোর্ট",
//           "Email সাপোর্ট",
//           "মাসিক ব্যাকআপ",
//           "৩ জন ইউজার",
//         ],
//       },
//       {
//         name: "প্রো",
//         subtitle: "মাঝারি আকারের ব্যবসার জন্য",
//         price: "৩০,০০০",
//         currency: "টাকা",
//         period: "/মাস",
//         highlighted: false,
//         features: [
//           "৪০টি পর্যন্ত রুম",
//           "৫টি রেস্তুরেন্ট",
//           "Advanced রিপোর্ট ও Analytics",
//           "হিউমান রিসোর্স ম্যানেজমেন্ট",
//           "রিয়েল-টাইম রুম availability ট্র্যাকিং",
//           "অ্যাকাউন্টস ম্যানেজমেন্ট",
//           "দৈনিক ব্যাকআপ",
//           "১০ জন ইউজার",
//           "গেস্ট রিপোর্ট",
//         ],
//       },
//       {
//         name: "বিজনেস",
//         subtitle: "বড়/মাঝারি/ছোট আকারের ব্যবসার জন্য",
//         price: "৬০,০০০",
//         currency: "টাকা",
//         period: "/মাস",
//         highlighted: true,
//         features: [
//           "Unlimited রুম",
//           "Unlimited রেস্তুরেন্ট",
//           "Advanced রিপোর্ট ও Analytics",
//           "হিউমান রিসোর্স ম্যানেজমেন্ট",
//           "রিয়েল-টাইম রুম availability ট্র্যাকিং",
//           "হোটেল ওয়েবসাইট (অনলাইন বুকিং)",
//           "এক্সপেন্স ম্যানেজমেন্ট",
//           "ইনভেন্টরি ম্যানেজমেন্ট",
//           "ভেন্ডর ম্যানেজমেন্ট",
//           "অ্যাকাউন্টস ম্যানেজমেন্ট",
//           "দৈনিক ব্যাকআপ",
//           "Unlimited ইউজার",
//           "কাস্টম ইমেইল টেমপ্লেট",
//           "গেস্ট রিপোর্ট",
//         ],
//       },
//       {
//         name: "এন্টারপ্রাইজ",
//         subtitle: "বড় হোটেল চেইন ও রিসোর্টের জন্য",
//         price: "কাস্টম",
//         currency: "",
//         period: "",
//         highlighted: false,
//         features: [
//           "Unlimited রুম",
//           "Unlimited রেস্তুরেন্ট",
//           "Advanced রিপোর্ট ও Analytics",
//           "হিউমান রিসোর্স ম্যানেজমেন্ট",
//           "রিয়েল-টাইম রুম availability ট্র্যাকিং",
//           "হোটেল ওয়েবসাইট (অনলাইন বুকিং)",
//           "এক্সপেন্স ম্যানেজমেন্ট",
//           "ইনভেন্টরি ম্যানেজমেন্ট",
//           "ভেন্ডর ম্যানেজমেন্ট",
//           "অ্যাকাউন্টস ম্যানেজমেন্ট",
//           "দৈনিক ব্যাকআপ",
//           "Unlimited ইউজার",
//           "কাস্টম ইমেইল টেমপ্লেট",
//           "গেস্ট রিপোর্ট",
//           "Housekeeping ম্যানেজমেন্ট",
//           "চ্যানেল ম্যানেজার",
//           "কাস্টম সেবা ও প্রয়োজনীয় সার্ভিস",
//         ],
//       },
//     ],
//   },
// };

// // ─── Route ─────────────────────────────────────────────

// export const Route = createFileRoute("/pricing")({
//   component: Page,
// });

// export default function Page() {
//   const { lang } = useLanguage();
//   const p = pricingTranslations[lang === "bn" ? "bn" : "en"];

//   const [expanded, setExpanded] = useState<Record<number, boolean>>({});

//   const toggle = (idx: number) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [idx]: !prev[idx],
//     }));
//   };

//   return (
//     <section className="py-20 px-4">
//       {/* Header */}
//       <div className="text-center mb-12">
//         <div className="inline-block bg-primary text-white text-xs font-bold px-5 py-1.5 rounded-full">
//           {p.sectionBadge}
//         </div>

//         <h2 className="text-3xl md:text-5xl font-extrabold mt-5">
//           {p.sectionTitle1}
//           <span className="text-primary">{p.sectionTitle2}</span>
//         </h2>

//         <p className="text-slate-500 mt-3 max-w-xl mx-auto">{p.subtitle}</p>
//       </div>

//       {/* Grid */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
//         {p.plans.map((plan, idx) => {
//           const isOpen = expanded[idx];

//           return (
//             <div
//               key={idx}
//               className={`flex flex-col h-full min-h-[520px] rounded-2xl border p-6 transition ${
//                 plan.highlighted
//                   ? "bg-primary text-white border-transparent shadow-xl"
//                   : "bg-white border-slate-200"
//               }`}
//             >
//               {/* Badge */}
//               {plan.highlighted && (
//                 <div className="text-xs font-bold bg-white text-primary px-4 py-1 rounded-full w-fit mx-auto mb-4">
//                   {p.popular}
//                 </div>
//               )}

//               {/* Title */}
//               <h3 className="text-xl font-bold">{plan.name}</h3>
//               <p
//                 className={`text-sm mt-1 ${plan.highlighted ? "text-white/70" : "text-slate-500"}`}
//               >
//                 {plan.subtitle}
//               </p>

//               {/* Price */}
//               <div className="mt-6">
//                 <div className="text-3xl font-extrabold">
//                   {plan.price}
//                   {plan.currency && (
//                     <span className="text-sm ml-1 font-medium">{plan.currency}</span>
//                   )}
//                 </div>
//                 {plan.period && (
//                   <div
//                     className={`text-sm mt-1 ${plan.highlighted ? "text-white/70" : "text-slate-500"}`}
//                   >
//                     {plan.period}
//                   </div>
//                 )}
//               </div>

//               {/* Features */}
//               <ul
//                 className={`mt-6 space-y-2 flex-1 transition-all duration-300 ${
//                   isOpen ? "max-h-[600px]" : "max-h-[220px] overflow-hidden"
//                 }`}
//               >
//                 {(isOpen ? plan.features : plan.features.slice(0, 6)).map((f, i) => (
//                   <li
//                     key={i}
//                     className={`text-sm ${plan.highlighted ? "text-white/90" : "text-slate-600"}`}
//                   >
//                     • {f}
//                   </li>
//                 ))}
//               </ul>

//               {/* Read more */}
//               {plan.features.length > 6 && (
//                 <button
//                   onClick={() => toggle(idx)}
//                   className={`mt-3 text-sm underline ${
//                     plan.highlighted ? "text-white" : "text-primary"
//                   }`}
//                 >
//                   {isOpen ? "Show Less" : "Read More"}
//                 </button>
//               )}

//               {/* CTA */}
//               <button
//                 className={`mt-auto w-full py-3 rounded-xl font-semibold ${
//                   plan.highlighted ? "bg-white text-primary" : "bg-primary text-white"
//                 }`}
//               >
//                 {p.cta}
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
