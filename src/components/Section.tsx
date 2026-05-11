import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-14 ${align === "center" ? "text-center max-w-3xl mx-auto" : ""}`}
    >
      {eyebrow && (
        <div className="inline-block px-3 py-1 rounded-full bg-soft text-primary text-xs font-semibold mb-4 uppercase tracking-wider">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}

export function FeatureGrid({ items }: { items: readonly string[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((it, i) => (
        <motion.div
          key={it}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: (i % 6) * 0.04 }}
          className="group p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-card transition-all"
        >
          <div className="flex items-start gap-3">
            <span className="mt-1 size-2 rounded-full bg-gradient-primary group-hover:scale-150 transition-transform" />
            <span className="text-sm font-medium">{it}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function CTABanner({
  title,
  primary,
  secondary,
}: {
  title: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <Section className="!py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-dark text-white p-10 md:p-16 shadow-elegant"
      >
        <div className="absolute -top-32 -right-32 size-96 rounded-full bg-gradient-primary opacity-30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-2xl md:text-4xl font-bold max-w-2xl">{title}</h3>
          <div className="flex flex-wrap gap-3">
            <a href={primary.to} className="px-6 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold shadow-elegant hover:scale-105 transition">
              {primary.label}
            </a>
            {secondary && (
              <a href={secondary.to} className="px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/10 transition">
                {secondary.label}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

export function WorkflowTimeline({ steps }: { steps: readonly string[] }) {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {steps.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-card transition"
          >
            <div className="size-8 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold flex items-center justify-center mb-3">
              {i + 1}
            </div>
            <p className="text-sm font-semibold leading-snug">{s}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
