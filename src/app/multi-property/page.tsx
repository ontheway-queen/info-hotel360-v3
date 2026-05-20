"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { StandardPage } from "@/components/StandardPage";

export default function Page() {
  useSeo("multiProperty");
  const { t } = useLanguage();
  return <StandardPage title={t.multiProperty.title} features={t.multiProperty.features} />;
}
