import { CHECK_LABEL } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { PlotDossier } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function Checklist({ dossier }: { dossier: PlotDossier }) {
  const { lang } = useI18n();
  return (
    <ul className="space-y-2">
      {dossier.checklist.map((item) => {
        const copy = CHECK_LABEL[item.id];
        if (!copy) return null; // defensive — see note below
        const tone = item.pass ? "pass" : item.warn ? "warn" : "fail";

        return (
          <li
            key={item.id}
            className={cn(
              "rounded-lg px-4 py-3 shadow-[0_0_0_1px_var(--color-line)]",
              tone === "pass"
                ? "bg-ok-soft"
                : tone === "warn"
                  ? "bg-warn-soft"
                  : "bg-seal-soft",
            )}
          >
            <p className="text-sm font-medium">{copy.title[lang]}</p>
            {tone !== "pass" && (
              <p className="mt-1 text-sm text-muted">
                {tone === "warn"
                  ? (copy.warn?.[lang] ?? copy.fail[lang])
                  : copy.fail[lang]}
              </p>
            )}
          </li>
        );
      })}
    </ul>
    // <p>tohhasodfhoiasdhfoih</p>
  );
}
