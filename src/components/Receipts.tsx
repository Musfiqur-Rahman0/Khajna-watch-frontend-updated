import { useI18n } from "@/lib/i18n";
import { PlotDossier } from "@/lib/types";
import { formatBdt } from "@/lib/utils";

export default function Receipts({ dossier }: { dossier: PlotDossier }) {
  const { t } = useI18n();
  return (
    <div className="overflow-x-auto rounded-xl bg-surface shadow-[0_0_0_1px_var(--color-line)]">
      <table className="w-full min-w-md text-left text-sm">
        <thead className="text-xs text-muted">
          <tr className="border-b border-line">
            <th className="px-4 py-3 font-medium">{t.fiscal}</th>
            <th className="px-4 py-3 font-medium">{t.amount}</th>
            <th className="px-4 py-3 font-medium">{t.paidOn}</th>
          </tr>
        </thead>
        <tbody>
          {dossier.receipts.map((r) => (
            <tr key={r.id} className="border-b border-line last:border-0">
              <td className="px-4 py-3 tabular-nums">{r.fiscalYear}</td>
              <td className="px-4 py-3 tabular-nums">
                {formatBdt(r.amountBdt)}
              </td>
              <td className="px-4 py-3">
                {r.status === "paid" && r.paidOn ? (
                  r.paidOn
                ) : (
                  <span className="font-medium text-seal">{t.unpaid}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}