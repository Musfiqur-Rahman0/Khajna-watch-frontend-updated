import { FLAG_LABEL } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { PlotDossier } from "@/lib/types";

export default function Flags({ dossier }: { dossier: PlotDossier }) {
  const { lang, t } = useI18n();
  if (dossier.flags.length === 0) {
    return <p className="text-sm text-muted">{t.noFlags}</p>;
  }
  return (
    <ul className="space-y-2">
      {dossier.flags.map((f) => (
        <li
          key={f.id}
          className="flex items-center justify-between rounded-lg bg-surface px-4 py-3 text-sm shadow-[0_0_0_1px_var(--color-line)]"
        >
          <span className="font-medium">{FLAG_LABEL[f.reason][lang]}</span>
          <span className="tabular-nums text-muted">
            {String(f.createdAt).slice(0, 10)}
          </span>
        </li>
      ))}
    </ul>
  );
}
