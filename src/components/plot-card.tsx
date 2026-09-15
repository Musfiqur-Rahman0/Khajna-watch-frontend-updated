"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { RiskBadge } from "@/components/risk-badge";
import { useI18n } from "@/lib/i18n";
import type { PlotSummary } from "@/lib/types";
import { formatArea } from "@/lib/utils";


export function PlotCard({ plot }: { plot: PlotSummary }) {
  const { lang, t } = useI18n();
  const district = lang === "bn" ? plot.districtBn : plot.district;
  const upazila = lang === "bn" ? plot.upazilaBn : plot.upazila;
  const mouza = lang === "bn" ? plot.mouzaBn : plot.mouza;
  const land = lang === "bn" ? plot.landClassBn : plot.landClass;
  const owner = lang === "bn" ? plot.ownerLabelBn : plot.ownerLabel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/plot/${plot.code}`}
        className="group block rounded-xl bg-surface p-4 text-ink shadow-[0_0_0_1px_var(--color-line),0_1px_2px_rgba(28,25,20,0.04)] transition-[box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-forest)_35%,var(--color-line))]"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              {district} · {upazila}
            </p>
            <h3 className="mt-1 font-display text-xl leading-snug">{mouza}</h3>
          </div>
          <RiskBadge level={plot.riskLevel} />
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted">{t.khatian}</dt>
            <dd className="font-medium tabular-nums">{plot.khatianNo}</dd>
          </div>
          <div>
            <dt className="text-muted">{t.dag}</dt>
            <dd className="font-medium tabular-nums">{plot.dagNo}</dd>
          </div>
          <div>
            <dt className="text-muted">{t.area}</dt>
            <dd className="font-medium tabular-nums">{formatArea(plot.areaDecimal, lang)}</dd>
          </div>
          <div className="col-span-2 sm:col-span-3">
            <dt className="text-muted">{t.owner}</dt>
            <dd className="font-medium">{owner}</dd>
          </div>
        </dl>
        <div className="mt-4 flex items-center justify-between text-sm text-muted">
          <span>
            {plot.surveyType} · {land}
            {plot.flagCount > 0 ? ` · ${plot.flagCount} ${t.flags}` : ""}
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-forest">
            {t.openDossier}
            <ChevronRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
