import type {
  ChecklistItem,
  DistrictOption,
  MutationEvent,
  PlotDossier,
  PlotFlag,
  PlotOwner,
  PlotSummary,
  PlotWarning,
  KhajnaReceipt,
} from "@/lib/types";

export const DISTRICTS: DistrictOption[] = [
  { id: "dhaka", labelEn: "Dhaka", labelBn: "ঢাকা" },
  { id: "gazipur", labelEn: "Gazipur", labelBn: "গাজীপুর" },
  { id: "khulna", labelEn: "Khulna", labelBn: "খুলনা" },
  { id: "cumilla", labelEn: "Cumilla", labelBn: "কুমিল্লা" },
  { id: "bogura", labelEn: "Bogura", labelBn: "বগুড়া" },
];

