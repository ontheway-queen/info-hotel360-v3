"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { Section, SectionHeader } from "@/components/Section";
import { DemoForm } from "@/components/DemoForm";

export default function Page() {
  useSeo("contact");
  const { t } = useLanguage();
  return (
    <Section className="!pt-16">
      <SectionHeader title={t.nav.contact} subtitle={t.demoForm.subtitle} />
      <div className="max-w-3xl mx-auto">
        <DemoForm />
      </div>
    </Section>
  );
}
