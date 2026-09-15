"use client";

import { motion } from "motion/react";
import { GLOSSARY, GUIDE_STEPS } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";

export default function GuidePage() {
  const { lang, t } = useI18n();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-forest">
        {t.guideKicker}
      </p>
      <h1 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">
        {t.guideTitle}
      </h1>
      <p className="mt-3 text-muted">{t.guideLead}</p>

      <ol className="mt-10 space-y-4">
        {GUIDE_STEPS.map((step, i) => (
          <motion.li
            key={step.title.en}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.3) }}
            className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]"
          >
            <p className="text-xs font-medium tabular-nums text-muted">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-1 font-display text-xl">{step.title[lang]}</h2>
            <p className="mt-2 text-sm text-muted">{step.body[lang]}</p>
          </motion.li>
        ))}
      </ol>

      <h2 className="mt-12 font-display text-2xl">{t.glossaryTitle}</h2>
      <dl className="mt-4 divide-y divide-line rounded-xl bg-surface shadow-[0_0_0_1px_var(--color-line)]">
        {GLOSSARY.map((item) => (
          <div key={item.term.en} className="px-5 py-4">
            <dt className="font-medium">{item.term[lang]}</dt>
            <dd className="mt-1 text-sm text-muted">{item.body[lang]}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
