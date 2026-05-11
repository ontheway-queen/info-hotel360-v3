import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div className="inline-flex items-center bg-muted rounded-full p-1 text-xs font-semibold">
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
          lang === "en"
            ? "bg-primary text-primary-foreground shadow"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-pressed={lang === "en"}
      >
        {t.common.languageEn}
      </button>
      <button
        onClick={() => setLang("bn")}
        className={`px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
          lang === "bn"
            ? "bg-primary text-primary-foreground shadow"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-pressed={lang === "bn"}
      >
        {t.common.languageBn}
      </button>
    </div>
  );
}
