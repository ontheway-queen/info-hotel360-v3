"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { StandardPage } from "@/components/StandardPage";

export default function Page() {
  useSeo("reports");
  const { t } = useLanguage();
  return (
    <StandardPage
      title={t.reports.title}
      subtitle={t.reports.subtitle}
      features={t.reports.items}
    />
  );
}
