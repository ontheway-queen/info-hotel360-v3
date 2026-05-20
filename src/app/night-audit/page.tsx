"use client";

import { Moon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { StandardPage } from "@/components/StandardPage";
import { Section, SectionHeader, WorkflowTimeline } from "@/components/Section";

export default function Page() {
  useSeo("nightAudit");
  const { t } = useLanguage();
  return (
    <StandardPage title={t.nightAudit.title} intro={t.nightAudit.intro}>
      <Section className="!pt-0">
        <SectionHeader title={t.nightAudit.flowTitle} />
        <WorkflowTimeline steps={t.nightAudit.flow} />
      </Section>
      <Section>
        <div className="grid md:grid-cols-2 gap-4">
          {t.nightAudit.highlights.map((h) => (
            <div
              key={h}
              className="p-5 rounded-xl border border-border bg-card flex items-center gap-3"
            >
              <Moon className="size-5 text-primary shrink-0" />
              <span className="text-sm font-medium">{h}</span>
            </div>
          ))}
        </div>
      </Section>
    </StandardPage>
  );
}
