import { Link } from "@tanstack/react-router";
import { Globe, Hotel, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import logo from "/reservation.png";
import { MdFacebook } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-dark text-white/80 mt-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-4 py-16 grid grid-cols-2 md:grid-cols-6 gap-5">
        <div className="col-span-2">
          <div className="flex items-center bg-white p-3 w-fit rounded-lg gap-2 mb-4">
            {/* <div className="size-9 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground">
              <Hotel className="size-5" />
            </div>
            <span className="font-bold text-lg text-white">
              THE<span className="text-primary">HOTEL</span>360
            </span> */}
            <img src={logo} alt="" className="h-[65px] w-[220px]  rounded-lg" />
          </div>
          <p className="text-sm max-w-sm">{t.footer.tagline}</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">{t.footer.product}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/features" className="hover:text-primary">
                {t.nav.features}
              </Link>
            </li>
            <li>
              <Link to="/modules" className="hover:text-primary">
                {t.nav.modules}
              </Link>
            </li>
            <li>
              <Link to="/online-booking" className="hover:text-primary">
                {t.nav.onlineBooking}
              </Link>
            </li>
            <li>
              <Link to="/multi-property" className="hover:text-primary">
                {t.nav.multiProperty}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">{t.nav.operations}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/reservation-front-office" className="hover:text-primary">
                {t.nav.reservation}
              </Link>
            </li>
            <li>
              <Link to="/cash-drawer" className="hover:text-primary">
                {t.nav.cashDrawer}
              </Link>
            </li>
            <li>
              <Link to="/night-audit" className="hover:text-primary">
                {t.nav.nightAudit}
              </Link>
            </li>
            <li>
              <Link to="/inventory" className="hover:text-primary">
                {t.nav.inventory}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">{t.nav.finance}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/accounting-finance" className="hover:text-primary">
                {t.nav.accounting}
              </Link>
            </li>
            <li>
              <Link to="/settlement" className="hover:text-primary">
                {t.nav.settlement}
              </Link>
            </li>
            <li>
              <Link to="/reports" className="hover:text-primary">
                {t.nav.reports}
              </Link>
            </li>
            <li>
              <Link to="/hrm-payroll" className="hover:text-primary">
                {t.nav.hrm}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">{t.footer.contact}</h4>

          <ul className="space-y-3 text-sm">
            {/* Address */}
            <li className="flex items-start gap-2">
              <MapPin className="size-6 mt-0.5 text-white" />
              <span>{t.contactInfo.address}</span>
            </li>

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

            {/* Website */}
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

            {/* <a
              href="#"
              className="size-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition"
            >
              <FaLinkedin className="size-4" />
            </a> */}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} THEHOTEL360. {t.footer.rights}
          </p>
          <p>{t.footer.address}</p>
        </div>
      </div>
    </footer>
  );
}
