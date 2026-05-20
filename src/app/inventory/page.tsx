"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { StandardPage } from "@/components/StandardPage";

export default function Page() {
  useSeo("inventory");
  const { t } = useLanguage();
  return <StandardPage title={t.inventory.title} features={t.inventory.features} />;
}
