"use client";

import { Check, X, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";

// Pattern per row: [manual, basic, hotel360]
// Values: 0 = no, 0.5 = partial, 1 = yes
const matrix: Array<[number, number, number]> = [
  [0, 1, 1],
  [0, 0, 1],
  [0, 0.5, 1],
  [0.5, 0.5, 1],
  [0.5, 1, 1],
  [0, 0, 1],
  [0, 0, 1],
  [0, 0, 1],
  [0, 0.5, 1],
  [0, 0.5, 1],
  [0, 0, 1],
  [0, 0, 1],
  [0, 0.5, 1],
  [0, 0.5, 1],
  [0, 0.5, 1],
  [0, 0, 1],
  [0, 0, 1],
  [0, 0, 1],
];

function Cell({ v, highlight }: { v: number; highlight?: boolean }) {
  if (v === 1)
    return <Check className={`size-5 mx-auto ${highlight ? "text-primary" : "text-success"}`} />;
  if (v === 0.5) return <Minus className="size-5 mx-auto text-warning" />;
  return <X className="size-5 mx-auto text-muted-foreground/40" />;
}

export function ComparisonTable() {
  const { t } = useLanguage();
  const c = t.comparison;
  return (
    <div className="overflow-x-auto rounded-2xl border border-border shadow-card">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="text-left px-5 py-4 font-semibold w-1/2">Feature</th>
            <th className="px-4 py-4 font-semibold text-muted-foreground text-center">
              {c.colManual}
            </th>
            <th className="px-4 py-4 font-semibold text-muted-foreground text-center">
              {c.colBasic}
            </th>
            <th className="px-4 py-4 font-bold text-primary text-center bg-soft border-l-2 border-primary">
              {c.colHotel360}
            </th>
          </tr>
        </thead>
        <tbody>
          {c.rows.map((row, i) => (
            <motion.tr
              key={row}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              className="border-t border-border hover:bg-muted/30"
            >
              <td className="px-5 py-3.5 font-medium">{row}</td>
              <td className="px-4 py-3.5 text-center">
                <Cell v={matrix[i][0]} />
              </td>
              <td className="px-4 py-3.5 text-center">
                <Cell v={matrix[i][1]} />
              </td>
              <td className="px-4 py-3.5 text-center bg-soft/50 border-l-2 border-primary">
                <Cell v={matrix[i][2]} highlight />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
