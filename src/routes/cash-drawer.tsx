import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { StandardPage } from "@/components/StandardPage";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/cash-drawer")({
  component: Page,
  head: () => ({ meta: [{ title: "Cash Drawer | THEHOTEL360" }] }),
});

function Page() {
  useSeo("cashDrawer");
  const { t } = useLanguage();
  return (
    <StandardPage title={t.cashDrawer.title} features={t.cashDrawer.features}>
      <Section className="!pt-0">
        <div className="p-8 rounded-2xl bg-gradient-dark text-white/90 leading-relaxed">
          {t.cashDrawer.copy}
        </div>
      </Section>
    </StandardPage>
  );
}
