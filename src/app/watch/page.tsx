"use client";

import { useMemo } from "react";
import Link from "next/link";
import { PlotCard } from "@/components/plot-card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { plotToSummary } from "@/lib/selectors";
import { useGetMyWatchlistQuery } from "@/redux/watchlist/watchlistApi";

export default function WatchPage() {
  const { t } = useI18n();
  // Reads from the server, keyed by session cookie or anon ID — not
  // localStorage — so this survives reloads, cleared caches, and works
  // for logged-out visitors the same way it works for logged-in ones.
  const { data: entries = [], isLoading } = useGetMyWatchlistQuery();

  const plots = useMemo(
    () => entries.map((entry) => plotToSummary(entry.plot)),
    [entries],
  );

  const live = plots.filter(
    (p) =>
      p.riskLevel === "red" || p.flagCount > 0 || p.khajnaStatus !== "Paid",
  );
  const rest = plots.filter((p) => !live.some((l) => l.code === p.code));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl sm:text-4xl">{t.watchTitle}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t.watchLead}</p>

      {!isLoading && plots.length === 0 && (
        <div className="mt-10 max-w-lg">
          <p className="text-muted">{t.watchEmpty}</p>
          <Button  className="mt-5">
            <Link href="/">{t.backHome}</Link>
          </Button>
        </div>
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