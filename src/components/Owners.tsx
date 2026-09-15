import { useI18n } from "@/lib/i18n";
import { PlotDossier } from "@/lib/types";
import { formatShare } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { ROLE_LABEL } from "@/lib/copy";

export default  function Owners({ dossier }: { dossier: PlotDossier }) {
  const { lang, t } = useI18n();
  return (
    <div className="overflow-x-auto rounded-xl bg-surface shadow-[0_0_0_1px_var(--color-line)]">
      <table className="w-full min-w-xl text-left text-sm">
        <thead className="text-xs text-muted">
          <tr className="border-b border-line">
            <th className="px-4 py-3 font-medium">{t.owner}</th>
            <th className="px-4 py-3 font-medium">{t.share}</th>
            <th className="px-4 py-3 font-medium">{t.since}</th>
            <th className="px-4 py-3 font-medium" />
          </tr>
        </thead>
        <tbody>
          {dossier.owners.map((o) => (
            <tr key={o.id} className="border-b border-line last:border-0">
              <td className="px-4 py-3 font-medium">
                {lang === "bn" ? o.nameBn : o.nameEn}
              </td>
              <td className="px-4 py-3 tabular-nums">
                {formatShare(o.shareAna, lang)}
              </td>
              <td className="px-4 py-3 tabular-nums">{o.sinceYear ?? "—"}</td>
              <td className="px-4 py-3">
                <Badge
                  className={
                    o.role === "claimed"
                      ? "bg-seal-soft text-seal"
                      : o.role === "deceased"
                        ? "bg-paper-2 text-muted"
                        : "bg-ok-soft text-ok"
                  }
                >
                  {ROLE_LABEL[o.role][lang]}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
