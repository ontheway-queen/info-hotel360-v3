import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { StandardPage } from "@/components/StandardPage";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/accounting-finance")({
  component: Page,
  head: () => ({ meta: [{ title: "Hotel Accounting & Finance | THEHOTEL360" }] }),
});

function Page() {
  useSeo("accounting");
  const { t } = useLanguage();
  return (
    <StandardPage title={t.accounting.title} intro={t.accounting.intro} features={t.accounting.features}>
      <Section className="!pt-0">
        <div className="p-6 rounded-2xl border-2 border-primary/30 bg-soft flex items-start gap-4">
          <div className="size-11 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center shrink-0">
            <ShieldAlert className="size-5" />
          </div>
          <div>
            <p className="font-bold mb-1">{t.accounting.ruleTitle}</p>
            <p className="text-sm text-muted-foreground">{t.accounting.rule}</p>
          </div>
        </div>
      </Section>
    </StandardPage>
  );
}
