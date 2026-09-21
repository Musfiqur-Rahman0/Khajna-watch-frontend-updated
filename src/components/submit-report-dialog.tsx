"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { PenLine, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FLAG_LABEL, FLAG_REASONS } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { getReportPlotOptions } from "@/lib/report-selectors";
import { useAppSelector } from "@/redux/store";
import { useGetPlotsQuery } from "@/redux/plot/plotApi";
import { useCreateReportMutation } from "@/redux/report/reportApi";
import type { ApiError } from "@/redux/api/baseApi";
import type { FlagReason } from "@/lib/types";

export function SubmitReportDialog({
  plotCode,
  plotId,
  trigger,
}: {
  plotCode?: string;
  plotId?: number;
  trigger?: React.ReactNode;
}) {
  const { lang, t } = useI18n();
  const user = useAppSelector((s) => s.auth.user);
  const { data: plots = [] } = useGetPlotsQuery();
  const [createReport] = useCreateReportMutation();
  const plotOptions = getReportPlotOptions(plots);
  const [open, setOpen] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(
    plotCode ?? plotOptions[0]?.code ?? "",
  );
  const [reason, setReason] = useState<FlagReason>("grab_attempt");
  const [anonymous, setAnonymous] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit = selectedPlot && description.trim().length > 8;

  function reset() {
    setName("");
    setDescription("");
    setAnonymous(false);
    setReason("grab_attempt");
  }

  async function submit() {
    if (!canSubmit) return;

    if (!user) {
      toast.warning("Please login before reporting a plot.");
      return;
    }

    const targetPlotId =
      plotId ??
      Number(plotOptions.find((p) => p.code === selectedPlot)?.id ?? 0);

    if (!(targetPlotId > 0)) {
      toast.error("Unable to resolve plot id for this report.");
      return;
    }

    try {
      await createReport({
        plotId: targetPlotId,
        payload: {
          isAnonymous: anonymous,
          reason,
          description: description.trim(),
        },
      }).unwrap();

      toast.success(t.reportOk);
      reset();
      setOpen(false);
    } catch (error) {
      const message =
        (error as ApiError)?.message ?? "Could not submit report.";
      toast.error(message);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {trigger ?? (
          <Button className="no-print">
            <PenLine />
            {t.reportSubmitCta}
          </Button>
        )}
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-40 bg-ink/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[min(32rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-surface p-5 text-ink shadow-[0_0_0_1px_var(--color-line),0_16px_40px_rgba(28,25,20,0.18)]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start justify-between gap-3">
                  <Dialog.Title className="font-display text-2xl leading-tight">
                    {t.reportDialogTitle}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={t.reportCancel}
                    >
                      <X />
                    </Button>
                  </Dialog.Close>
                </div>
                <Dialog.Description className="mt-2 text-sm text-muted">
                  {t.reportDialogHelp}
                </Dialog.Description>

                <div className="mt-4 space-y-4">
                  {!plotCode && (
                    <div>
                      <Label htmlFor="report-plot">{t.reportFieldPlot}</Label>
                      <select
                        id="report-plot"
                        value={selectedPlot}
                        onChange={(e) => setSelectedPlot(e.target.value)}
                        className="mt-1.5 h-11 w-full rounded-md bg-surface px-3 text-sm text-ink shadow-[0_0_0_1px_var(--color-line)]"
                      >
                        {plotOptions.map((p) => (
                          <option key={p.code} value={p.code}>
                            {p.code} — {lang === "bn" ? p.mouzaBn : p.mouza}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="report-reason">{t.reportFieldReason}</Label>
                    <select
                      id="report-reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value as FlagReason)}
                      className="mt-1.5 h-11 w-full rounded-md bg-surface px-3 text-sm text-ink shadow-[0_0_0_1px_var(--color-line)]"
                    >
                      {FLAG_REASONS.map((r) => (
                        <option key={r} value={r}>
                          {FLAG_LABEL[r][lang]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      className="size-4 accent-forest"
                    />
                    {t.reportFieldAnon}
                  </label>

                  {!anonymous && (
                    <div>
                      <Label htmlFor="report-name">{t.reportFieldName}</Label>
                      <Input
                        id="report-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="report-description">
                      {t.reportFieldDescription}
                    </Label>
                    <textarea
                      id="report-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t.reportFieldDescriptionPh}
                      rows={4}
                      className="mt-1.5 w-full rounded-md bg-surface px-3 py-2 text-sm text-ink shadow-[0_0_0_1px_var(--color-line)]"
                    />
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={submit}
                    disabled={!canSubmit}
                  >
                    {t.reportSubmit}
                  </Button>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    {t.reportCancel}
                  </Button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
