import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { StandardPage } from "@/components/StandardPage";

export const Route = createFileRoute("/hrm-payroll")({
  component: Page,
  head: () => ({ meta: [{ title: "HRM & Payroll | THEHOTEL360" }] }),
});

function Page() {
  useSeo("hrm");
  const { t } = useLanguage();
  return <StandardPage title={t.hrm.title} features={t.hrm.features} />;
}
