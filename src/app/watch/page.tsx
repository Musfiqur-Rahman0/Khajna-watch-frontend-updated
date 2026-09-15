"use client";

import { useMemo } from "react";
import Link from "next/link";
import { PlotCard } from "@/components/plot-card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { getPlotsByCodes } from "@/lib/selectors";
import { useAppSelector } from "@/redux/store";
import { useGetPlotsQuery } from "@/redux/plot/plotApi";
import { useGetReportsQuery } from "@/redux/report/reportApi";

export default function WatchPage() {
  const { t } = useI18n();
  const codes = useAppSelector((s) => s.watchlist.codes);
  const { data: plotsFromApi = [] } = useGetPlotsQuery();
  const { data: reports = [] } = useGetReportsQuery();

  const plots = useMemo(
    () => getPlotsByCodes(codes, plotsFromApi, reports),
    [codes, plotsFromApi, reports],
  );

  const live = plots.filter(
    (p) =>
      p.riskLevel === "red" || p.flagCount > 0 || p.khajnaStatus !== "paid",
  );
  const rest = plots.filter((p) => !live.some((l) => l.code === p.code));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl sm:text-4xl">{t.watchTitle}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t.watchLead}</p>

      {codes.length === 0 && (
        <div className="mt-10 max-w-lg">
          <p className="text-muted">{t.watchEmpty}</p>
          <Button asChild className="mt-5">
            <Link href="/">{t.backHome}</Link>
          </Button>
        </div>
      )}

      {codes.length > 0 && plots.length === 0 && (
        <p className="mt-8 text-muted">{t.watchEmpty}</p>
      )}

      {live.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-seal">
            {t.watchActivity}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {live.map((p) => (
              <PlotCard key={p.code} plot={p} />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mt-10">
          <div className="grid gap-4 md:grid-cols-2">
            {rest.map((p) => (
              <PlotCard key={p.code} plot={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
