"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { Eye, EyeOff, Flag, Printer } from "lucide-react";
import { SubmitReportDialog } from "@/components/submit-report-dialog";
import { PlotDetailSkeleton } from "@/components/loading-skeletons";
import { PlotCard } from "@/components/plot-card";
import { RiskBadge, RiskMeter } from "@/components/risk-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CHECK_LABEL,
  COURT_LABEL,
  FLAG_LABEL,
  KHAJNA_LABEL,
  MUTATION_KIND,
  MUTATION_STATUS,
  POSSESSION_LABEL,
  ROLE_LABEL,
} from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { getPlot, plotToSummary } from "@/lib/selectors";
import type { PlotDossier } from "@/lib/types";
import { formatArea, formatBdt, formatShare, cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useGetPlotByCodeQuery, useGetPlotsQuery } from "@/redux/plot/plotApi";
import { toggleWatch } from "@/redux/watchlist/watchlistSlice";
import {
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,
} from "@/redux/watchlist/watchlistApi";
import { registerPush } from "@/lib/push-notification";
import Owners from "@/components/Owners";
import Mutations from "@/components/Mutations";
import Receipts from "@/components/Receipts";
import Flags from "@/components/Flags";
import Checklist from "@/components/CheckList";

type TabId = "owners" | "mutations" | "khajna" | "flags" | "check";

export default function PlotPage() {
  const params = useParams<{ code: string }>();
  const code = String(params.code ?? "");
  const { lang, t } = useI18n();
  const dispatch = useAppDispatch();
  const watchedCodes = useAppSelector((s) => s.watchlist.codes);

  const [tab, setTab] = useState<TabId>("owners");

  const { data: detail, isLoading, isError } = useGetPlotByCodeQuery(code);
  const { data: allPlots = [] } = useGetPlotsQuery();
  const [addToWatchlist] = useAddToWatchlistMutation();
  const [removeFromWatchlist] = useRemoveFromWatchlistMutation();

  const dossier = useMemo(() => {
    if (!detail) return null;
    const nearby = allPlots
      .filter((p) => p.mouza === detail.mouza && p.code !== detail.code)
      .map(plotToSummary);
    return { ...getPlot(detail), nearby };
  }, [detail, allPlots]);

  // console.log("plot details", dossier);

  if (isLoading) {
    return <PlotDetailSkeleton />;
  }

  if (isError || !dossier) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl">{t.notFoundTitle}</h1>
        <p className="mt-3 text-muted">{t.notFoundBody}</p>
        <Button className="mt-6">
          <Link href="/">{t.backHome}</Link>
        </Button>
      </main>
    );
  }

  const watching = watchedCodes.includes(dossier.code.trim().toLowerCase());

  const handleToggleWatch = async () => {
    // Local "starred" list — drives the /watch bookmarks page, unchanged.
    dispatch(toggleWatch(dossier.code));

    // Real backend watchlist — this is what actually makes push
    // notifications fire for this plot.
    try {
      if (watching) {
        await removeFromWatchlist(dossier.id).unwrap();
        toast.success(t.watchToastRemove);
      } else {
        await addToWatchlist(dossier.id).unwrap();
        toast.success(t.watchToast);
        // First time watching something is the natural moment to also
        // ask for notification permission, if not already granted.
        registerPush().catch(() => {
          // Permission denied or unsupported — the watchlist entry still
          // saved, so don't block the user over this.
        });
      }
    } catch (err) {
      console.error("Failed to update watchlist on the server:", err);
      toast.error("Couldn't update your watchlist. Please try again.");
    }
  };
  const mouza = lang === "bn" ? dossier.mouzaBn : dossier.mouza;
  const district = lang === "bn" ? dossier.districtBn : dossier.district;
  const upazila = lang === "bn" ? dossier.upazilaBn : dossier.upazila;
  const land = lang === "bn" ? dossier.landClassBn : dossier.landClass;

  const tabs: { id: TabId; label: string }[] = [
    { id: "owners", label: t.tabOwners },
    { id: "mutations", label: t.tabMutations },
    { id: "khajna", label: t.tabKhajna },
    { id: "flags", label: t.tabFlags },
    { id: "check", label: t.tabCheck },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-forest">
        {t.dossierKicker}
      </p>
      <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="font-display text-3xl leading-tight sm:text-4xl">
            {mouza}
          </h1>
          <p className="mt-1 text-muted">
            {district} · {upazila} · {t.jl} {dossier.jlNo}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={handleToggleWatch}
            className="no-print"
          >
            {watching ? <EyeOff /> : <Eye />}
            {watching ? t.watchRemove : t.watchAdd}
          </Button>
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="no-print"
          >
            <Printer />
            {t.printPack}
          </Button>
          <SubmitReportDialog
            plotCode={dossier.code}
            plotId={dossier.id}
            trigger={
              <Button variant="outline" className="no-print">
                <Flag />
                {t.flagCta}
              </Button>
            }
          />
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <Card className="ledger-rule p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <p className="font-mono text-sm text-muted">{dossier.code}</p>
            <RiskBadge level={dossier.riskLevel} />
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Meta label={t.khatian} value={dossier.khatianNo} />
            <Meta label={t.dag} value={dossier.dagNo} />
            <Meta
              label={t.area}
              value={formatArea(dossier.areaDecimal, lang)}
            />
            <Meta label={t.survey} value={`${dossier.surveyType} · ${land}`} />
            <Meta
              label={t.possession}
              value={
                POSSESSION_LABEL[dossier.possession]?.[lang] ??
                dossier.possession
              }
            />
            <Meta
              label={t.court}
              value={COURT_LABEL[dossier.courtHint][lang]}
            />
          </dl>
          <p className="mt-5 max-w-2xl text-sm text-muted">
            {lang === "bn" ? dossier.notesBn : dossier.notesEn}
          </p>
        </Card>
        <Card className="p-5">
          <RiskMeter score={dossier.riskScore} level={dossier.riskLevel} />
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">{t.tabKhajna}</dt>
              <dd className="font-medium">
                {KHAJNA_LABEL[dossier.khajnaStatus]?.[lang] ??
                  dossier.khajnaStatus}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">{t.mortgage}</dt>
              <dd className="font-medium">
                {dossier.mortgaged
                  ? lang === "bn"
                    ? "আছে"
                    : "Yes"
                  : lang === "bn"
                    ? "নেই"
                    : "No"}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">{t.flags}</dt>
              <dd className="font-medium tabular-nums">{dossier.flagCount}</dd>
            </div>
          </dl>
        </Card>
      </div>

      {dossier.warnings.length > 0 && (
        <ul className="mt-4 grid gap-2">
          {dossier.warnings.map((w) => (
            <li
              key={w.id}
              className={cn(
                "rounded-lg px-4 py-3 text-sm shadow-[0_0_0_1px_var(--color-line)]",
                w.severity === "high"
                  ? "bg-seal-soft"
                  : w.severity === "medium"
                    ? "bg-warn-soft"
                    : "bg-info-soft",
              )}
            >
              <p className="font-medium">
                {lang === "bn" ? w.titleBn : w.titleEn}
              </p>
              <p className="mt-1 text-muted">
                {lang === "bn" ? w.detailBn : w.detailEn}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="no-print mt-8 flex gap-1 overflow-x-auto">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "h-11 shrink-0 rounded-md px-4 text-sm font-medium",
              tab === item.id
                ? "bg-forest text-forest-fg"
                : "bg-paper-2 text-ink",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === "owners" && <Owners dossier={dossier} />}
            {tab === "mutations" && <Mutations dossier={dossier} />}
            {tab === "khajna" && <Receipts dossier={dossier} />}
            {tab === "flags" && <Flags dossier={dossier} />}
            {tab === "check" && <Checklist dossier={dossier} />}
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">{t.nearbyTitle}</h2>
        {dossier.nearby.length === 0 ? (
          <p className="mt-3 text-sm text-muted">{t.noNearby}</p>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {dossier.nearby.map((p) => (
              <PlotCard key={p.code} plot={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="mt-1 font-medium tabular-nums">{value}</dd>
    </div>
  );
}
