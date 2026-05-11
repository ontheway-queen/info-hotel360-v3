import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { StandardPage } from "@/components/StandardPage";

export const Route = createFileRoute("/reports")({
  component: Page,
  head: () => ({ meta: [{ title: "Reports | THEHOTEL360" }] }),
});

function Page() {
  useSeo("reports");
  const { t } = useLanguage();
  return <StandardPage title={t.reports.title} subtitle={t.reports.subtitle} features={t.reports.items} />;
}
