import { motion } from "framer-motion";
import {
  BedDouble,
  Users,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Wallet,
  Moon,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export function DashboardMockup() {
  const { t } = useLanguage();
  const m = t.hero.mockup;
  const cards = [
    { icon: TrendingUp, label: m.occupancy, value: "82%", tone: "primary" },
    { icon: BedDouble, label: m.availableRooms, value: "24", tone: "neutral" },
    { icon: ArrowRight, label: m.checkInsToday, value: "37", tone: "neutral" },
    { icon: ArrowLeft, label: m.checkOutsToday, value: "29", tone: "neutral" },
    { icon: DollarSign, label: m.revenueToday, value: "$12,840", tone: "primary" },
    { icon: Wallet, label: m.pendingSettlement, value: "$3,210", tone: "neutral" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative"
    >
      <div className="absolute -inset-10 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative bg-card rounded-2xl border border-border shadow-elegant p-6 backdrop-blur"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              {m.subtitle}
            </p>
            <h3 className="text-lg font-bold">{m.title}</h3>
          </div>
          <div className="flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-success/10 text-success font-semibold">
            <span className="size-1.5 rounded-full bg-success animate-pulse" /> Live
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className={`p-4 rounded-xl border ${c.tone === "primary" ? "bg-soft border-primary/30" : "bg-background border-border"}`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon
                    className={`size-4 ${c.tone === "primary" ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span className="text-[10px] text-muted-foreground font-medium leading-tight">
                    {c.label}
                  </span>
                </div>
                <p className="text-xl font-bold">{c.value}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 p-4 rounded-xl bg-gradient-dark text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-primary/20 flex items-center justify-center">
              <Moon className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-white/60">{m.nightAuditReady}</p>
              <p className="text-sm font-semibold">22:00 → 06:00</p>
            </div>
          </div>
          <Users className="size-4 text-white/40" />
        </div>
      </motion.div>
    </motion.div>
  );
}
