import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { TranslationShape } from "@/i18n/translations";

type SeoKey = keyof TranslationShape["seo"];

export function useSeo(key: SeoKey) {
  const { t, lang } = useLanguage();
  useEffect(() => {
    const meta = t.seo[key];
    if (!meta) return;
    document.title = meta.title;
    const setMeta = (sel: string, attr: string, value: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(sel);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(`meta[name="description"]`, "name", "description", meta.description);
    setMeta(`meta[property="og:title"]`, "property", "og:title", meta.title);
    setMeta(`meta[property="og:description"]`, "property", "og:description", meta.description);
  }, [key, lang, t]);
}
