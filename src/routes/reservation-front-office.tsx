import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { StandardPage } from "@/components/StandardPage";
import { Section, SectionHeader, FeatureGrid } from "@/components/Section";

export const Route = createFileRoute("/reservation-front-office")({
  component: Page,
  head: () => ({ meta: [{ title: "Reservation & Front Office | THEHOTEL360" }] }),
});

function Page() {
  useSeo("reservation");
  const { t } = useLanguage();
  return (
    <StandardPage title={t.reservation.title} subtitle={t.reservation.subtitle} features={t.reservation.features}>
      <Section>
        <SectionHeader title={t.folio.title} subtitle={t.folio.subtitle} />
        <FeatureGrid items={t.folio.features} />
      </Section>
    </StandardPage>
  );
}
