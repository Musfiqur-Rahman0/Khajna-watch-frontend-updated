import { MUTATION_KIND, MUTATION_STATUS } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { PlotDossier } from "@/lib/types";
import { Badge } from "./ui/badge";

export default function Mutations({ dossier }: { dossier: PlotDossier }) {
  const { lang, t } = useI18n();
  if (dossier.mutations.length === 0) {
    return <p className="text-sm text-muted">{t.noMutations}</p>;
  }
  return (
    <ol className="space-y-3">
      {dossier.mutations.map((m) => (
        <li
          key={m.id}
          className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {MUTATION_KIND[m.kind]?.[lang] ?? m.kind} · {m.happenedOn}
            </p>
            <Badge
              className={
                m.status === "approved"
                  ? "bg-ok-soft text-ok"
                  : m.status === "objected"
                    ? "bg-seal-soft text-seal"
                    : "bg-warn-soft text-warn"
              }
            >
              {MUTATION_STATUS[m.status][lang]}
            </Badge>
          </div>
          <p className="mt-2 text-sm">
            <span className="text-muted">{t.from} </span>
            {lang === "bn" ? m.fromBn : m.fromEn}
            <span className="text-muted"> → {t.to} </span>
            {lang === "bn" ? m.toBn : m.toEn}
          </p>
          <p className="mt-1 text-xs text-muted">
            {t.caseNo} {m.caseNo} · {lang === "bn" ? m.officeBn : m.officeEn}
          </p>
          {(lang === "bn" ? m.noteBn : m.noteEn) ? (
            <p className="mt-2 text-sm text-muted">
              {lang === "bn" ? m.noteBn : m.noteEn}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
