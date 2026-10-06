"use client";

import { useEffect, useRef, useState } from "react";

interface GoogleRecaptchaProps {
  siteKey: string;
  lang?: string;
  onChange: (token: string | null) => void;
  onExpired?: () => void;
  className?: string;
}

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement | string,
        parameters: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark";
          hl?: string;
        },
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
      ready: (callback: () => void) => void;
    };
    __recaptchaLoadedCallback?: () => void;
  }
}

export function GoogleRecaptcha({
  siteKey,
  lang = "en",
  onChange,
  onExpired,
  className,
}: GoogleRecaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const isRenderedRef = useRef(false);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const onExpiredRef = useRef(onExpired);
  onExpiredRef.current = onExpired;

  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Google reCAPTCHA v2 script
  useEffect(() => {
    window.__recaptchaLoadedCallback = () => {
      setScriptLoaded(true);
    };

    if (window.grecaptcha && typeof window.grecaptcha.render === "function") {
      setScriptLoaded(true);
      return;
    }

    const scriptId = "google-recaptcha-v2-api";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?onload=__recaptchaLoadedCallback&render=explicit&hl=${lang}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, [lang]);

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || isRenderedRef.current) return;

    const renderWidget = () => {
      if (!containerRef.current || isRenderedRef.current) return;
      if (!window.grecaptcha || typeof window.grecaptcha.render !== "function") return;

      try {
        containerRef.current.innerHTML = "";
        const widgetId = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            onChangeRef.current(token);
          },
          "expired-callback": () => {
            onChangeRef.current(null);
            onExpiredRef.current?.();
          },
          "error-callback": () => {
            onChangeRef.current(null);
          },
          theme: "light",
          hl: lang,
        });

        widgetIdRef.current = widgetId;
        isRenderedRef.current = true;
      } catch (err) {
        console.warn("reCAPTCHA render error:", err);
      }
    };

    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(renderWidget);
    } else {
      renderWidget();
    }
  }, [scriptLoaded, siteKey, lang]);

  return (
    <div className={className}>
      <div ref={containerRef} className="min-h-[78px] min-w-[304px]" />
    </div>
  );
}
