"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { Section, SectionHeader, CTABanner } from "@/components/Section";

export default function Page() {
  useSeo("why");
  const { t } = useLanguage();
  return (
    <>
      <Section className="!pt-16">
        <SectionHeader title={t.why.title} subtitle={t.why.subtitle} />
        <div className="grid md:grid-cols-2 gap-5">
          {t.why.items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-card transition"
            >
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-lg bg-gradient-primary shrink-0 flex items-center justify-center text-primary-foreground">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{it.title}</h3>
                  <p className="text-sm text-muted-foreground">{it.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      <Section className="!pt-0">
        <div className="rounded-2xl bg-soft p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-6">Benefits</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {t.why.benefits.map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-primary" /> {b}
              </div>
            ))}
          </div>
        </div>
      </Section>
      <CTABanner title={t.why.cta} primary={{ label: t.common.requestDemo, to: "/pricing" }} />
    </>
  );
}
