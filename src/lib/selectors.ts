import { DISTRICTS } from "@/lib/demo-data";

import type {
  HomeData,
  PlotDossier,
  PlotSummary,
  RiskLevel,
} from "@/lib/types";
import type { PlotDetailApi, PlotSummaryApi } from "@/redux/plot/plotApi";
import type { ReportSummaryApi as ReportRecord } from "@/redux/report/reportApi";

// Exported so page components (e.g. the plot dossier's "nearby plots"
// section) can map raw PlotSummaryApi rows into PlotSummary themselves,
// without duplicating this mapping logic.
export function plotToSummary(plot: PlotSummaryApi): PlotSummary {
  return {
    id: plot.id,
    code: plot.code,
    district: plot.district,
    districtBn: plot.districtBn,
    upazila: plot.upazila ?? plot.district,
    upazilaBn: plot.upazilaBn ?? plot.districtBn,
    mouza: plot.mouza,
    mouzaBn: plot.mouzaBn,
    jlNo: plot.jlNo,
    khatianNo: plot.khatianNo,
    dagNo: plot.dagNo,
    areaDecimal: plot.areaDecimal,
    landClass: plot.landClass,
    landClassBn: plot.landClassBn,
    surveyType: plot.surveyType,
    khajnaStatus: plot.khajnaStatus,
    khajnaYear: plot.khajnaYear,
    possession: plot.possession as PlotSummary["possession"],
    riskScore: plot.riskScore,
    riskLevel: plot.riskLevel,
    courtHint: plot.courtHint,
    mortgaged: plot.mortgaged,
    flagCount: plot._count?.flags || 0,
    ownerLabel: "",
    ownerLabelBn: "",
  };
}

export type HomeFilters = {
  q?: string;
  district?: string;
  risk?: "all" | RiskLevel;
};

function matchesQuery(plot: PlotSummary, q: string): boolean {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const haystacks = [
    plot.district,
    plot.districtBn,
    plot.upazila,
    plot.upazilaBn,
    plot.mouza,
    plot.mouzaBn,
    plot.khatianNo,
    plot.dagNo,
    plot.code,
    plot.landClass,
    plot.landClassBn,
    plot.ownerLabel,
    plot.ownerLabelBn,
  ];
  return haystacks.some((h) => h.toLowerCase().includes(needle));
}

export function getHomeData(
  filters: HomeFilters,
  plots: PlotSummaryApi[],
  _reports: ReportRecord[],
): HomeData {
  const q = (filters.q ?? "").trim();
  const district = (filters.district ?? "").trim();
  const risk = filters.risk && filters.risk !== "all" ? filters.risk : "";
  const queried = Boolean(q || district || risk);

  const summaries = plots.map(plotToSummary);

  const filtered = summaries.filter((p) => {
    if (q && !matchesQuery(p, q)) return false;
    if (
      district &&
      p.district.toLowerCase() !== district.toLowerCase() &&
      p.district !== district
    )
      return false;
    if (risk && p.riskLevel !== risk) return false;
    return true;
  });

  const sortByRisk = (a: PlotSummary, b: PlotSummary) =>
    b.riskScore - a.riskScore || a.district.localeCompare(b.district);

  const homePlots = queried
    ? [...filtered].sort(sortByRisk)
    : [...summaries].sort(sortByRisk).slice(0, 8);

  const highRisk = summaries
    .filter((p) => p.riskLevel === "red")
    .sort(sortByRisk);

  const snapshot = {
    plots: summaries.length,
    red: summaries.filter((p) => p.riskLevel === "red").length,
    overdue: summaries.filter(
      (p) => p.khajnaStatus === "Pending" || p.khajnaStatus === "Partial",
    ).length,
    flags: summaries.reduce((sum, p) => sum + p.flagCount, 0),
  };

  return {
    plots: homePlots,
    highRisk,
    districts: DISTRICTS,
    snapshot,
    queried,
  };
}

export function getPlot(detail: PlotDetailApi): PlotDossier {
  return {
    id: detail.id,
    code: detail.code,
    district: detail.district,
    districtBn: detail.districtBn,
    upazila: detail.upazila,
    upazilaBn: detail.upazilaBn,
    mouza: detail.mouza,
    mouzaBn: detail.mouzaBn,
    jlNo: detail.jlNo,
    khatianNo: detail.khatianNo,
    dagNo: detail.dagNo,
    areaDecimal: detail.areaDecimal,
    landClass: detail.landClass,
    landClassBn: detail.landClassBn,
    surveyType: detail.surveyType,
    khajnaStatus: detail.khajnaStatus,
    khajnaYear: detail.khajnaYear,
    possession: detail.possession,
    riskScore: detail.riskScore,
    riskLevel: detail.riskLevel,
    courtHint: detail.courtHint,
    mortgaged: detail.mortgaged,
    flagCount: detail.flags.length,
    ownerLabel: detail.owners[0]?.nameEn ?? "",
    ownerLabelBn: detail.owners[0]?.nameBn ?? "",
    notesBn: detail.notesBn,
    notesEn: detail.notesEn,
    owners: detail.owners,
    mutations: detail.mutations,
    receipts: detail.khajnaReceipts,
    warnings: detail.warnings,
    flags: detail.flags,
    nearby: [], // merged in at the page level — see plot/[code]/page.tsx
    checklist: detail.checklist ?? [], // merged in at the page level — see plot/[code]/page.tsx
  } as PlotDossier;
}

export function getPlotsByCodes(
  codes: string[],
  plots: PlotSummaryApi[],
  _reports: ReportRecord[],
): PlotSummary[] {
  const wanted = new Set(codes.map((c) => c.trim().toLowerCase()));
  if (wanted.size === 0) return [];

  return plots
    .filter((p) => wanted.has(p.code.trim().toLowerCase()))
    .map(plotToSummary)
    .sort((a, b) => b.riskScore - a.riskScore || a.code.localeCompare(b.code));
}

// export { buildDossier };
