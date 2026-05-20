"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { StandardPage } from "@/components/StandardPage";
import { Section, SectionHeader, WorkflowTimeline } from "@/components/Section";

export default function Page() {
  useSeo("settlement");
  const { t } = useLanguage();
  return (
    <StandardPage
      title={t.settlement.title}
      intro={t.settlement.intro}
      features={t.settlement.features}
    >
      <Section>
        <SectionHeader title={t.settlement.flowTitle} />
        <WorkflowTimeline steps={t.settlement.flow} />
      </Section>
    </StandardPage>
  );
}
