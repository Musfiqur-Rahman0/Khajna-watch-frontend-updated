"use client";

import { PlotExplorer } from "@/components/plot-explorer";
import { useI18n } from "@/lib/i18n";

export default function Home() {
  const { lang, t } = useI18n();

  return (
    <main>
      <PlotExplorer />

      <section className="border-t border-line bg-surface/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          {[
            [t.how1t, t.how1d],
            [t.how2t, t.how2d],
            [t.how3t, t.how3d],
          ].map(([title, body]) => (
            <div key={title}>
              <h3 className="font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
