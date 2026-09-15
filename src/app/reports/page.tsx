"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { ReportCard } from "@/components/report-card";
import { ReportCardSkeleton } from "@/components/loading-skeletons";
import { SubmitReportDialog } from "@/components/submit-report-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FLAG_LABEL,
  FLAG_REASONS,
  REPORT_STATUSES,
  REPORT_STATUS_LABEL,
} from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { getReports } from "@/lib/report-selectors";
import { useGetPlotsQuery } from "@/redux/plot/plotApi";
import { useGetReportsQuery } from "@/redux/report/reportApi";
import { cn } from "@/lib/utils";
import type { FlagReason, ReportStatus } from "@/lib/types";

export default function ReportsPage() {
  const { lang, t } = useI18n();
  const { data: plots = [] } = useGetPlotsQuery();
  const { data: reports = [], isFetching: reportsLoading } =
    useGetReportsQuery();
  const [q, setQ] = useState("");
  const [reason, setReason] = useState<FlagReason | "all">("all");
  const [status, setStatus] = useState<ReportStatus | "all">("all");
  const [sort, setSort] = useState<"top" | "new">("top");

  const reportViews = useMemo(
    () => getReports({ q, reason, status, sort }, reports, plots),
    [q, reason, status, sort, reports, plots],
  );

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-forest">
        {t.reportsKicker}
      </p>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl leading-tight sm:text-4xl">
            {t.reportsTitle}
          </h1>
          <p className="mt-2 max-w-xl text-muted">{t.reportsLead}</p>
        </div>
        <SubmitReportDialog />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-8 rounded-xl bg-surface p-3 shadow-[0_0_0_1px_var(--color-line)] sm:p-4"
      >
        <div className="grid gap-3 sm:grid-cols-[1fr_10rem_10rem]">
          <div>
            <Label htmlFor="report-q" className="sr-only">
              {t.reportSearchPlaceholder}
            </Label>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
              <Input
                id="report-q"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t.reportSearchPlaceholder}
                className="pl-10"
                autoComplete="off"
              />
            </div>
          </div>
          <select
            aria-label={t.reportReasonAll}
            value={reason}
            onChange={(e) => setReason(e.target.value as FlagReason | "all")}
            className="h-11 rounded-md bg-surface px-3 text-sm text-ink shadow-[0_0_0_1px_var(--color-line)]"
          >
            <option value="all">{t.reportReasonAll}</option>
            {FLAG_REASONS.map((r) => (
              <option key={r} value={r}>
                {FLAG_LABEL[r][lang]}
              </option>
            ))}
          </select>
          <select
            aria-label={t.reportStatusAll}
            value={status}
            onChange={(e) => setStatus(e.target.value as ReportStatus | "all")}
            className="h-11 rounded-md bg-surface px-3 text-sm text-ink shadow-[0_0_0_1px_var(--color-line)]"
          >
            <option value="all">{t.reportStatusAll}</option>
            {REPORT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {REPORT_STATUS_LABEL[s][lang]}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 flex gap-1">
          {[
            { id: "top" as const, label: t.reportSortTop },
            { id: "new" as const, label: t.reportSortNew },
          ].map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSort(s.id)}
              className={cn(
                "h-9 rounded-md px-3 text-sm font-medium",
                sort === s.id
                  ? "bg-forest text-forest-fg"
                  : "bg-paper-2 text-ink",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </motion.div>

      {reportsLoading && reportViews.length === 0 ? (
        <ul className="mt-6 space-y-3" aria-busy="true">
          {Array.from({ length: 4 }, (_, index) => (
            <ReportCardSkeleton key={index} />
          ))}
        </ul>
      ) : reportViews.length === 0 ? (
        <p className="mt-10 max-w-lg text-muted">{t.reportEmpty}</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {reportViews.map((r) => (
            <ReportCard key={r.id} report={r} />
          ))}
        </ul>
      )}
    </main>
  );
}
