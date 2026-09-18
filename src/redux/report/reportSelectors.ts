import type { PlotSummaryApi } from "@/redux/plot/plotApi";
import type { ReportSummaryApi } from "@/redux/report/reportApi";
import type { CommunityReportView, FlagReason, PlotSummary } from "@/lib/types";

export type ReportFilters = {
  q?: string;
  reason?: string | "all";
  status?: string | "all";
  sort?: "top" | "new";
};

export function getReportPlotOptions(plots: PlotSummaryApi[] = []) {
  return plots.map((plot) => ({
    id: plot.id,
    code: plot.code,
    mouza: plot.mouza,
    mouzaBn: plot.mouzaBn,
  }));
}

function normalizeStatus(status: string): CommunityReportView["status"] {
  if (status === "confirmed") return "confirmed";
  if (status === "rejected") return "rejected";
  if (status === "submitted") return "submitted";
  if (status === "under_consideration") return "under_consideration";
  return "submitted";
}

export function getReports(
  filters: ReportFilters,
  reports: ReportSummaryApi[],
  plots: PlotSummaryApi[] = [],
): CommunityReportView[] {
  const q = (filters.q ?? "").trim().toLowerCase();
  const reason =
    filters.reason && filters.reason !== "all" ? filters.reason : undefined;
  const status =
    filters.status && filters.status !== "all" ? filters.status : undefined;

  const views = reports.map((report) => {
    const plot = plots.find((p) => p.id === report.plotId) ?? null;
    const totalVotes = report.yesVotes + report.noVotes;
    const yesPercent =
      totalVotes === 0 ? 0 : Math.round((report.yesVotes / totalVotes) * 100);
    const basePlot = plot
      ? ({
          id: plot.id,
          code: plot.code,
          district: plot.district,
          districtBn: plot.districtBn,
          upazila: plot.upazila,
          upazilaBn: plot.upazilaBn,
          mouza: plot.mouza,
          mouzaBn: plot.mouzaBn,
          jlNo: "",
          khatianNo: plot.khatianNo,
          dagNo: plot.dagNo,
          areaDecimal: plot.areaDecimal,
          landClass: "",
          landClassBn: "",
          surveyType: "",
          khajnaStatus: "unknown" as const,
          khajnaYear: null,
          possession: "matches" as const,
          riskScore: plot.riskScore,
          riskLevel: plot.riskLevel,
          courtHint: plot.courtHint,
          mortgaged: plot.mortgaged,
          flagCount: 0,
          ownerLabel: "",
          ownerLabelBn: "",
        } as PlotSummary)
      : null;

    return {
      id: String(report.id),
      plotCode: plot?.code ?? "",
      reporterName: report.reporterUserId ?? "",
      isAnonymous: Boolean(report.isAnonymous),
      reason: (report.reason as FlagReason) ?? "grab_attempt",
      description: report.description,
      status: normalizeStatus(report.status),
      yesVotes: report.yesVotes,
      noVotes: report.noVotes,
      createdAt: report.createdAt,
      confirmedAt: report.confirmedAt ?? null,
      rejectedAt: report.rejectedAt ?? null,
      totalVotes,
      yesPercent,
      myVote: report.myVote ?? null,
      plot: basePlot,
    } as CommunityReportView;
  });
  const filtered = views.filter((r) => {
    if (
      q &&
      !`${r.description} ${r.reason} ${r.plotCode}`.toLowerCase().includes(q)
    )
      return false;
    if (reason && r.reason !== reason) return false;
    if (status && r.status !== normalizeStatus(status)) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (filters.sort === "new") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (b.yesVotes !== a.yesVotes) return b.yesVotes - a.yesVotes;
    return b.totalVotes - a.totalVotes;
  });

  return sorted;
}
