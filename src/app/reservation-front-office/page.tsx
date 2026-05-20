"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { StandardPage } from "@/components/StandardPage";
import { Section, SectionHeader, FeatureGrid } from "@/components/Section";

export default function Page() {
  useSeo("reservation");
  const { t } = useLanguage();
  return (
    <StandardPage
      title={t.reservation.title}
      subtitle={t.reservation.subtitle}
      features={t.reservation.features}
    >
      <Section>
        <SectionHeader title={t.folio.title} subtitle={t.folio.subtitle} />
        <FeatureGrid items={t.folio.features} />
      </Section>
    </StandardPage>
  );
}
