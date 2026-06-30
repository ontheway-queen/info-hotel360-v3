// eslint-disable-next-line @typescript-eslint/no-explicit-any
"use client";
import ReactCountryFlag from "react-country-flag";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { MdFacebook } from "react-icons/md";

const logo = "/reservation.png";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-dark text-white/80 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-16 grid grid-cols-2 md:grid-cols-6 gap-5">
        <div className="col-span-2">
          <div className="flex items-center bg-white p-3 w-fit rounded-lg gap-2 mb-4">
            <img src={logo} alt="" className="h-[65px] w-[220px] rounded-lg" />
          </div>
          <p className="text-sm max-w-sm">{t.footer.tagline}</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">{t.footer.product}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/features" className="hover:text-primary">
                {t.nav.features}
              </Link>
            </li>
            <li>
              <Link href="/modules" className="hover:text-primary">
                {t.nav.modules}
              </Link>
            </li>
            <li>
              <Link href="/online-booking" className="hover:text-primary">
                {t.nav.onlineBooking}
              </Link>
            </li>
            <li>
              <Link href="/multi-property" className="hover:text-primary">
                {t.nav.multiProperty}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">{t.nav.operations}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/reservation-front-office" className="hover:text-primary">
                {t.nav.reservation}
              </Link>
            </li>
            <li>
              <Link href="/cash-drawer" className="hover:text-primary">
                {t.nav.cashDrawer}
              </Link>
            </li>
            <li>
              <Link href="/night-audit" className="hover:text-primary">
                {t.nav.nightAudit}
              </Link>
            </li>
            <li>
              <Link href="/inventory" className="hover:text-primary">
                {t.nav.inventory}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">{t.nav.finance}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/accounting-finance" className="hover:text-primary">
                {t.nav.accounting}
              </Link>
            </li>
            <li>
              <Link href="/settlement" className="hover:text-primary">
                {t.nav.settlement}
              </Link>
            </li>
            <li>
              <Link href="/reports" className="hover:text-primary">
                {t.nav.reports}
              </Link>
            </li>
            <li>
              <Link href="/hrm-payroll" className="hover:text-primary">
                {t.nav.hrm}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">{t.footer.contact}</h4>

          <ul className="space-y-3 text-sm">
            {/* Address */}

            {/* Phones */}
            <li className="flex items-center gap-2">
              <Phone className="size-8 text-white" />
              <a href={`tel:${t.contactInfo.phone}`} className="hover:text-primary transition">
                {t.contactInfo.phone}
              </a>
            </li>

            {/* Email */}
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-white" />
              <a href={`mailto:${t.contactInfo.email}`} className="hover:text-primary transition">
                {t.contactInfo.email}
              </a>
            </li>
          </ul>

          {/* Social */}
          <div className="flex items-center gap-3 mt-5">
            <a
              href="https://www.facebook.com/profile.php?id=61584037133680"
              target="_blank"
              className="size-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition"
            >
              <MdFacebook className="size-4" />
            </a>
          </div>
        </div>
      </div>
      <section className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {t?.officeLocations?.map((office: any) => (
              <div key={office.id}>
                <div className="flex items-center gap-2">
                  <ReactCountryFlag
                    countryCode={office.flag}
                    svg
                    style={{
                      width: "28px",
                      height: "20px",
                    }}
                  />

                  <h3 className="font-semibold text-white">{office.country}</h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-gray-200">{office.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 px-8 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} THEHOTEL360. {t.footer.rights} | A Product By{" "}
            <Link className="text-[#38B1ED]" target="_blank" href="https://m360ict.com/">
              M360 ICT
            </Link>
          </p>
          <p>{t.footer.address}</p>
        </div>
      </div>
    </footer>
  );
}
