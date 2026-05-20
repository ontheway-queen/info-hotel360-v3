"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

const logo = "/reservation.png";

const links = [
  { to: "/", key: "home" as const },
  { to: "/why-thehotel360", key: "why" as const },
  { to: "/features", key: "features" as const },
  { to: "/modules", key: "modules" as const },
  { to: "/online-booking", key: "onlineBooking" as const },
  { to: "/accounting-finance", key: "accounting" as const },
  { to: "/cash-drawer", key: "cashDrawer" as const },
  { to: "/settlement", key: "settlement" as const },
  { to: "/night-audit", key: "nightAudit" as const },
  { to: "/pricing", key: "pricing" as const },
  { to: "/reports", key: "reports" as const },
  { to: "/contact", key: "contact" as const },
];

export function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          }}
        >
          <img src={logo} alt="" className="h-[45px] w-[150px]" />
        </Link>
        <nav className="hidden xl:flex items-center gap-1 text-sm">
          {links.slice(0, 10).map((l) => {
            const isActive = l.to === "/" ? pathname === "/" : pathname?.startsWith(l.to);
            return (
              <Link
                key={l.to}
                href={l.to}
                className={`px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "text-primary font-semibold bg-soft"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {t.nav[l.key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/request-demo"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-elegant hover:opacity-90 transition"
          >
            {t.nav.requestDemo}
          </Link>
          <button
            className="xl:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-border bg-background">
          <nav className="px-4 py-3 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
            {links.map((l) => {
              const isActive = l.to === "/" ? pathname === "/" : pathname?.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "text-primary font-semibold bg-soft"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  {t.nav[l.key]}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
