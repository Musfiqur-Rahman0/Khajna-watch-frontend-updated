"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ThumbsUp, ThumbsDown, Lock } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  FLAG_LABEL,
  REPORT_STATUS_HINT,
  REPORT_STATUS_LABEL,
} from "@/lib/copy";
import {
  CONFIRM_THRESHOLD,
  CONSIDER_THRESHOLD,
  LOCK_THRESHOLD,
  MIN_VOTES_FOR_REVIEW,
} from "@/lib/report-status";
import { useI18n } from "@/lib/i18n";
import { formatRelative, cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";

import type { CommunityReportView, ReportStatus } from "@/lib/types";
import type { ApiError } from "@/redux/api/baseApi";
import { useVoteReportMutation } from "@/redux/report/reportApi";

const STATUS_TONE: Record<ReportStatus, string> = {
  submitted: "bg-paper-2 text-muted",
  under_consideration: "bg-warn-soft text-warn",
  confirmed: "bg-seal-soft text-seal",
  withdrawn: "bg-paper-2 text-muted line-through",
  rejected: "bg-paper-2 text-subtle line-through",
};

export function ReportCard({ report }: { report: CommunityReportView }) {
  const { lang, t } = useI18n();
  const user = useAppSelector((s) => s.auth.user);
  const [voteReport, { isLoading: voting }] = useVoteReportMutation();

  const mouza = report.plot
    ? lang === "bn"
      ? report.plot.mouzaBn
      : report.plot.mouza
    : report.plotCode;
  const district = report.plot
    ? lang === "bn"
      ? report.plot.districtBn
      : report.plot.district
    : "";
  const locked = report.status === "confirmed";
  const hasMinVotes = report.totalVotes >= MIN_VOTES_FOR_REVIEW;

  async function handleVote(vote: "yes" | "no") {
    if (!user) {
      toast.warning("Please login before voting on a report.");
      return;
    }
    const reportId = Number(report.id);
    const plotId = report.plot?.id ?? 0;
    if (!Number.isFinite(reportId) || plotId <= 0) {
      toast.error("This report cannot be voted on without a linked plot.");
      return;
    }
    try {
      await voteReport({ plotId, reportId, vote }).unwrap();
      toast.success("Vote recorded successfully.");
    } catch (error) {
      const message = (error as ApiError)?.message ?? "Unable to record vote.";
      toast.error(message);
    }
  }

  const votingLocked =
    locked ||
    report.status === "rejected" ||
    report.status === "confirmed" ||
    voting;
  const yesDisabled =
    votingLocked || report.myVote ? report.myVote !== "no" : false;
  const noDisabled =
    votingLocked || report.myVote ? report.myVote !== "yes" : false;



  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={STATUS_TONE[report.status]}>
          {locked && <Lock className="mr-1 inline size-3" />}
          {REPORT_STATUS_LABEL[report.status][lang]}
        </Badge>
        <Badge className="bg-paper-2 text-ink">
          {FLAG_LABEL[report.reason]?.[lang] ?? report.reason}
        </Badge>
        <Link
          href={`/plot/${report.plotCode}`}
          className="text-sm font-medium text-forest hover:underline"
        >
          {mouza}
          {district ? ` · ${district}` : ""}
        </Link>
      </div>

      <p className="mt-3 text-sm leading-relaxed">{report.description}</p>

      <p className="mt-3 text-xs text-subtle">
        {report.isAnonymous || !report.reporterName
          ? t.reportAnon
          : report.reporterName}{" "}
        · {formatRelative(report.createdAt, lang)}
      </p>

      {/* yes/no progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>
            {report.yesPercent}% {t.reportYesShare} · {report.totalVotes}{" "}
            {t.reportVotesCount}
          </span>
          {!hasMinVotes && <span>{t.reportNeedMoreVotes}</span>}
        </div>
        <div className="relative mt-1.5 h-1.5 overflow-hidden rounded-full bg-seal-soft">
          <motion.div
            className="h-full rounded-full bg-ok"
            initial={{ width: 0 }}
            animate={{ width: `${report.yesPercent}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* threshold ticks at 30 / 50 / 70 */}
          {[CONSIDER_THRESHOLD, CONFIRM_THRESHOLD, LOCK_THRESHOLD].map(
            (pct) => (
              <span
                key={pct}
                className="absolute top-0 h-full w-px bg-paper/70"
                style={{ left: `${pct}%` }}
              />
            ),
          )}
        </div>
        {report.status !== "rejected" && report.status !== "confirmed" && (
          <p className="mt-1 text-[11px] text-subtle">
            {REPORT_STATUS_HINT[report.status][lang]}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          disabled={yesDisabled}
          onClick={() => handleVote("yes")}
          className={cn(
            "inline-flex h-9 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
            locked && "cursor-not-allowed",
            report.myVote === "yes"
              ? "bg-ok text-forest-fg"
              : "bg-ok-soft text-ok hover:opacity-90",
          )}
        >
          <ThumbsUp className="size-4" />
          {t.reportVoteYes}
        </button>
        <button
          type="button"
          disabled={noDisabled}
          onClick={() => handleVote("no")}
          className={cn(
            "inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
            report.myVote === "no"
              ? "bg-seal text-forest-fg"
              : "bg-seal-soft text-seal hover:opacity-90",
          )}
        >
          <ThumbsDown className="size-4" />
          {t.reportVoteNo}
        </button>
      </div>

      {locked && (
        <p className="mt-2 text-xs font-medium text-seal">{t.reportLocked}</p>
      )}
      {report.status === "rejected" && (
        <p className="mt-2 text-xs font-medium text-seal">{t.reportRejected}</p>
      )}
    </motion.li>
  );
}
