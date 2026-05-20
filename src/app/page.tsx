"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { DashboardMockup } from "@/components/DashboardMockup";
import {
  Section,
  SectionHeader,
  FeatureGrid,
  CTABanner,
  WorkflowTimeline,
} from "@/components/Section";
import { ComparisonTable } from "@/components/ComparisonTable";

export default function Home() {
  useSeo("home");
  const { t } = useLanguage();
  const words = t.hero.title.split(" ");
  const half = Math.ceil(words.length / 2);

  const firstHalf = words.slice(0, half).join(" ");
  const secondHalf = words.slice(half).join(" ");
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-soft via-background to-background" />
        <div className="absolute top-1/4 -left-40 size-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-0 -right-40 size-[500px] rounded-full bg-primary-glow/15 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-soft border border-primary/20 text-primary text-xs font-semibold mb-6"
            >
              <Sparkles className="size-3.5" /> {t.hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl"
            >
              <span className="text-black dark:text-white">{firstHalf} </span>

              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {secondHalf}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-lg text-muted-foreground max-w-xl"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/request-demo"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold shadow-elegant hover:scale-105 transition"
              >
                {t.hero.primaryCta}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href="/features"
                className="px-6 py-3 rounded-lg border border-border bg-card font-semibold hover:border-primary/50 hover:text-primary transition"
              >
                {t.hero.secondaryCta}
              </Link>
            </motion.div>
          </div>
          <DashboardMockup />
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {t.stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl font-bold text-gradient">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-tight">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why */}
      <Section>
        <SectionHeader eyebrow={t.nav.why} title={t.why.title} subtitle={t.why.subtitle} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.why.items.slice(0, 6).map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-card transition"
              >
                <div className="size-10 rounded-lg bg-gradient-primary mb-4 flex items-center justify-center">
                  <Icon className="text-white text-xl" />
                </div>
                <h3 className="font-bold text-lg mb-2">{it.title}</h3>
                <p className="text-sm text-muted-foreground">{it.desc}</p>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link href="/why-thehotel360" className="text-primary font-semibold hover:underline">
            {t.common.learnMore} →
          </Link>
        </div>
      </Section>

      {/* Modules */}
      <Section className="bg-soft/40 !max-w-none px-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Modules" title={t.modules.title} subtitle={t.modules.subtitle} />
          <FeatureGrid items={t.modules.items.slice(0, 18)} />
          <div className="mt-10 text-center">
            <Link href="/modules" className="text-primary font-semibold hover:underline">
              {t.common.learnMore} →
            </Link>
          </div>
        </div>
      </Section>

      {/* Online booking */}
      <Section>
        <SectionHeader title={t.onlineBooking.title} subtitle={t.onlineBooking.subtitle} />
        <WorkflowTimeline steps={t.onlineBooking.flow} />
      </Section>

      {/* Cash drawer + Settlement combo */}
      <Section className="bg-gradient-dark !max-w-none px-0 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.cashDrawer.title}</h2>
            <p className="text-white/70 mb-6">{t.cashDrawer.copy}</p>
            <Link href="/cash-drawer" className="text-primary font-semibold hover:underline">
              {t.common.learnMore} →
            </Link>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.settlement.title}</h2>
            <p className="text-white/70 mb-6">{t.settlement.intro}</p>
            <Link href="/settlement" className="text-primary font-semibold hover:underline">
              {t.common.learnMore} →
            </Link>
          </div>
        </div>
      </Section>

      {/* Night audit */}
      <Section>
        <SectionHeader title={t.nightAudit.title} subtitle={t.nightAudit.intro} />
        <WorkflowTimeline steps={t.nightAudit.flow} />
      </Section>

      {/* Comparison */}
      <Section>
        <SectionHeader title={t.comparison.title} subtitle={t.comparison.subtitle} />
        <ComparisonTable />
      </Section>

      <CTABanner
        title={t.comparison.cta}
        primary={{ label: t.common.requestDemo, to: "/pricing" }}
        secondary={{ label: t.common.exploreFeatures, to: "/features" }}
      />
    </>
  );
}
