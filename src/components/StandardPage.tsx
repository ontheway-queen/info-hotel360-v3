import type { ReactNode } from "react";
import { Section, SectionHeader, FeatureGrid, CTABanner } from "@/components/Section";
import { useLanguage } from "@/i18n/LanguageProvider";

export function StandardPage({
  title,
  subtitle,
  intro,
  features,
  children,
  showDemoCta = true,
}: {
  title: string;
  subtitle?: string;
  intro?: string;
  features?: readonly string[];
  children?: ReactNode;
  showDemoCta?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <>
      <Section className="!pt-16 !pb-10">
        <SectionHeader title={title} subtitle={subtitle ?? intro} />
      </Section>
      {features && (
        <Section className="!pt-0">
          <FeatureGrid items={features} />
        </Section>
      )}
      {children}
      {showDemoCta && (
        <CTABanner
          title={t.comparison.cta}
          primary={{ label: t.common.requestDemo, to: "/pricing" }}
          secondary={{ label: t.common.exploreFeatures, to: "/features" }}
        />
      )}
    </>
  );
}
