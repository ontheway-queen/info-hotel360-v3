import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { StandardPage } from "@/components/StandardPage";

export const Route = createFileRoute("/multi-property")({
  component: Page,
  head: () => ({ meta: [{ title: "Multi-property | THEHOTEL360" }] }),
});

function Page() {
  useSeo("multiProperty");
  const { t } = useLanguage();
  return <StandardPage title={t.multiProperty.title} features={t.multiProperty.features} />;
}
