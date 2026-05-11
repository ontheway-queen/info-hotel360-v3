import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { StandardPage } from "@/components/StandardPage";

export const Route = createFileRoute("/inventory")({
  component: Page,
  head: () => ({ meta: [{ title: "Inventory | THEHOTEL360" }] }),
});

function Page() {
  useSeo("inventory");
  const { t } = useLanguage();
  return <StandardPage title={t.inventory.title} features={t.inventory.features} />;
}
