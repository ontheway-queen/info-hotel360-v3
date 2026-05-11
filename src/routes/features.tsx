import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { StandardPage } from "@/components/StandardPage";

export const Route = createFileRoute("/features")({
  component: Page,
  head: () => ({ meta: [{ title: "Features | THEHOTEL360" }] }),
});

function Page() {
  useSeo("features");
  const { t } = useLanguage();
  return <StandardPage title={t.modules.title} subtitle={t.modules.subtitle} features={t.modules.items} />;
}
