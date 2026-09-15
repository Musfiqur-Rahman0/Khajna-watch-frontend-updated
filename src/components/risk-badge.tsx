"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/lib/types";

const styles: Record<RiskLevel, string> = {
  green: "bg-ok-soft text-ok",
  amber: "bg-warn-soft text-warn",
  red: "bg-seal-soft text-seal",
};

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  const { t } = useI18n();
  const label = level === "green" ? t.riskGreen : level === "amber" ? t.riskAmber : t.riskRed;
  return <Badge className={cn(styles[level], className)}>{label}</Badge>;
}

export function RiskMeter({ score, level }: { score: number; level: RiskLevel }) {
  const { t } = useI18n();
  const label = level === "green" ? t.riskGreen : level === "amber" ? t.riskAmber : t.riskRed;
  const tone = level === "green" ? "text-ok" : level === "amber" ? "text-warn" : "text-seal";
  const bar = level === "green" ? "bg-ok" : level === "amber" ? "bg-warn" : "bg-seal";
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <p className="text-sm font-medium text-muted">{t.riskTitle}</p>
        <p className={cn("font-display text-3xl leading-none tabular-nums", tone)}>{score}</p>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-paper-2">
        <motion.div
          className={cn("h-full rounded-full", bar)}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className={cn("mt-2 text-sm font-medium", tone)}>{label}</p>
    </div>
  );
}
