"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PlotCard } from "@/components/plot-card";
import {
  PlotCardSkeleton,
  SnapshotSkeleton,
} from "@/components/loading-skeletons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SAMPLE_CHIPS } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { plotToSummary } from "@/lib/selectors";
import { DISTRICTS } from "@/lib/demo-data";
import {
  useSearchPlotsQuery,
  useGetPlotStatsQuery,
} from "@/redux/plot/plotApi";
import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/lib/types";
import { Pagination } from "@/components/pagination";
import { useDebouncedValue } from "@/lib/use-debounced-value";
import { Reveal } from "@/components/reveal";

const PAGE_SIZE = 4;

export function PlotExplorer() {
  const { lang, t } = useI18n();
  const [q, setQ] = useState("");
  const [district, setDistrict] = useState("");
  const [risk, setRisk] = useState<"all" | RiskLevel>("all");
  const [page, setPage] = useState(1);

  const debouncedQ = useDebouncedValue(q, 350);
  const queried = Boolean(debouncedQ || district || risk !== "all");

  useEffect(() => {
    setPage(1);
  }, [debouncedQ, district, risk]);

  const { data, isFetching: plotsLoading } = useSearchPlotsQuery({
    search: debouncedQ || undefined,
    district: district || undefined,
    riskLevel: queried ? (risk !== "all" ? risk : undefined) : "red",
    sort: "risk",
    page,
    limit: PAGE_SIZE,
  });
  const { data: stats, isLoading: statsLoading } = useGetPlotStatsQuery();

  const plots = useMemo(() => (data?.items ?? []).map(plotToSummary), [data]);
  const totalPages = data?.pagination.totalPages ?? 1;
  const homeLoading = plotsLoading || statsLoading;

  const riskFilters = [
    { id: "all" as const, label: t.riskAll },
    { id: "green" as const, label: t.riskGreen },
    { id: "amber" as const, label: t.riskAmber },
    { id: "red" as const, label: t.riskRed },
  ];

  return (
    <>
      <section className="paper-grain border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest">
              {t.appName}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.15] tracking-tight sm:text-5xl">
              {t.tagline}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
              {t.heroLead}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              className="mt-8 rounded-xl bg-surface p-3 shadow-[0_0_0_1px_var(--color-line),0_1px_2px_rgba(28,25,20,0.04)] sm:p-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-3 sm:grid-cols-[1fr_11rem_auto]">
                <div>
                  <Label htmlFor="q" className="sr-only">
                    {t.searchLabel}
                  </Label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
                    <Input
                      id="q"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className="pl-10"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <select
                  aria-label={t.districtAll}
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="h-11 rounded-md bg-surface px-3 text-sm text-ink shadow-[0_0_0_1px_var(--color-line)]"
                >
                  <option value="">{t.districtAll}</option>
                  {DISTRICTS.map((d) => (
                    <option key={d.id} value={d.labelEn}>
                      {lang === "bn" ? d.labelBn : d.labelEn}
                    </option>
                  ))}
                </select>
                <Button type="submit" className="h-11">
                  {t.searchCta}
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {SAMPLE_CHIPS.map((chip) => (
                  <Button
                    key={chip.q}
                    type="button"
                    className="h-9 rounded-md bg-paper-2 px-3 text-sm text-ink shadow-[0_0_0_1px_var(--color-line)]"
                    onClick={() => setQ(chip.q)}
                  >
                    {chip.label[lang]}
                  </Button>
                ))}
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {statsLoading
                ? Array.from({ length: 4 }, (_, index) => (
                    <SnapshotSkeleton key={index} />
                  ))
                : [
                    [t.snapshotPlots, stats?.plots ?? 0],
                    [t.snapshotRed, stats?.red ?? 0],
                    [t.snapshotOverdue, stats?.overdue ?? 0],
                    [t.snapshotFlags, stats?.flags ?? 0],
                  ].map(([label, value]) => (
                    <div
                      key={String(label)}
                      className="rounded-lg bg-surface/80 px-4 py-3 shadow-[0_0_0_1px_var(--color-line)]"
                    >
                      <dt className="text-xs font-medium text-muted">
                        {label}
                      </dt>
                      <dd className="mt-1 font-display text-2xl tabular-nums">
                        {value}
                      </dd>
                    </div>
                  ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl">
              {queried ? t.resultsTitle : t.highRiskTitle}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {queried ? "" : t.highRiskSub}
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {riskFilters.map((f) => (
              <Button
                key={f.id}
                type="button"
                onClick={() => setRisk(f.id)}
                className={cn(
                  "h-10 rounded-md px-3 text-sm font-medium",
                  risk === f.id
                    ? "bg-forest text-forest-fg"
                    : "bg-paper-2 text-ink",
                )}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>

        {homeLoading ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }, (_, index) => (
              <PlotCardSkeleton key={index} />
            ))}
          </div>
        ) : plots.length === 0 && queried ? (
          <p className="mt-8 max-w-lg text-muted">{t.noResults}</p>
        ) : (
          <>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {plots.map((plot) => (
                <PlotCard key={plot.code} plot={plot} />
              ))}
            </div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              className="mt-8"
            />
          </>
        )}
      </section>
    </>
  );
}
