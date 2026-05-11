import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSeo } from "@/lib/useSeo";
import { Section, SectionHeader } from "@/components/Section";
import { DemoForm } from "@/components/DemoForm";

export const Route = createFileRoute("/contact")({
  component: Page,
  head: () => ({ meta: [{ title: "Contact | THEHOTEL360" }] }),
});

function Page() {
  useSeo("contact");
  const { t } = useLanguage();
  return (
    <Section className="!pt-16">
      <SectionHeader title={t.nav.contact} subtitle={t.demoForm.subtitle} />
      <div className="max-w-3xl mx-auto">
        <DemoForm />
      </div>
    </Section>
  );
}
