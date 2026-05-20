"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { StandardPage } from "@/components/StandardPage";
import { Section, SectionHeader, WorkflowTimeline } from "@/components/Section";

export default function Page() {
  useSeo("onlineBooking");
  const { t } = useLanguage();
  return (
    <StandardPage
      title={t.onlineBooking.title}
      subtitle={t.onlineBooking.subtitle}
      features={t.onlineBooking.features}
    >
      <Section>
        <SectionHeader title={t.onlineBooking.flowTitle} />
        <WorkflowTimeline steps={t.onlineBooking.flow} />
      </Section>
    </StandardPage>
  );
}
