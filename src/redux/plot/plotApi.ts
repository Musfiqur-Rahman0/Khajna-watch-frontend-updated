import { ChecklistItem } from "@/lib/types";
import { baseApi } from "@/redux/api/baseApi";

export type PlotSummaryApi = {
  id: number;
  code: string;
  district: string;
  districtBn: string;
  upazila: string;
  upazilaBn: string;
  mouza: string;
  mouzaBn: string;
  khatianNo: string;
  dagNo: string;
  areaDecimal: number;
  // added:
  jlNo: string;
  landClass: string;
  landClassBn: string;
  surveyType: string;
  khajnaStatus: "Paid" | "Pending" | "Partial";
  khajnaYear: string;
  possession: string;
  _count: { flags: number };
  // existing:
  riskScore: number;
  riskLevel: "green" | "amber" | "red";
  courtHint: "none" | "rumored" | "pending";
  mortgaged: boolean;
  updatedAt: string;
};

export type PlotOwnerApi = {
  id: number;
  nameBn: string;
  nameEn: string;
  shareAna: string;
  role: "recorded" | "claimed" | "deceased" | "heir";
  sinceYear: number;
  sortOrder: number;
};

export type MutationApi = {
  id: number;
  caseNo: string;
  kind: string;
  fromBn: string;
  fromEn: string;
  toBn: string;
  toEn: string;
  officeBn: string;
  officeEn: string;
  happenedOn: string;
  status: "approved" | "pending" | "objected";
  noteEn: string | null;
  noteBn: string | null;
};

export type KhajnaReceiptApi = {
  id: number;
  fiscalYear: number;
  amountBdt: string;
  paidOn: string | null;
  status: "paid" | "unpaid" | "partial";
};

export type PlotWarningApi = {
  id: number;
  code: string;
  severity: "high" | "medium" | "low";
  titleBn: string;
  titleEn: string;
  detailBn: string;
  detailEn: string;
};

export type PlotFlagApi = {
  id: number;
  reportId: number;
  reason: string;
  createdAt: string;
};

// Full row from getByCode — every scalar column on Plot, plus the
// relations the backend's include adds. Distinct from PlotSummaryApi,
// which is the narrower shape /plots (list) returns.
export type PlotDetailApi = PlotSummaryApi & {
  jlNo: string;
  landClass: string;
  landClassBn: string;
  surveyType: string;
  khajnaStatus: string;
  khajnaYear: string;
  possession: string;
  notesBn: string;
  notesEn: string;
  owners: PlotOwnerApi[];
  mutations: MutationApi[];
  khajnaReceipts: KhajnaReceiptApi[];
  warnings: PlotWarningApi[];
  flags: PlotFlagApi[];
  checklist?: ChecklistItem[];
};

export type PlotSearchParams = {
  search?: string;
  district?: string;
  riskLevel?: "green" | "amber" | "red";
  page?: number;
  limit?: number;
  sort?: "updated" | "risk";
};

export type PlotListResult = {
  items: PlotSummaryApi[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type PlotStats = {
  plots: number;
  red: number;
  overdue: number;
  flags: number;
};

export const plotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlots: builder.query<PlotSummaryApi[], void>({
      query: () => "/plots",
      providesTags: (result) =>
        result
          ? [
              ...result.map((plot) => ({ type: "Plot" as const, id: plot.id })),
              { type: "Plot" as const, id: "LIST" },
            ]
          : [{ type: "Plot" as const, id: "LIST" }],
    }),

    /** Server-side filtered + paginated — used by the home page search/results. */
    searchPlots: builder.query<PlotListResult, PlotSearchParams | void>({
      query: (params) => ({ url: "/plots", params: params ?? {} }),
      transformResponse: (response: PlotSummaryApi[], meta): PlotListResult => {
        const m = meta as unknown as {
          pagination: PlotListResult["pagination"];
        };
        return { items: response, pagination: m.pagination };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((plot) => ({
                type: "Plot" as const,
                id: plot.id,
              })),
              { type: "Plot" as const, id: "LIST" },
            ]
          : [{ type: "Plot" as const, id: "LIST" }],
    }),

    getPlotStats: builder.query<PlotStats, void>({
      query: () => "/plots/stats",
      providesTags: [{ type: "Plot", id: "STATS" }],
    }),

    getPlotByCode: builder.query<PlotDetailApi, string>({
      query: (code) => `/plots/code/${encodeURIComponent(code)}`,
      providesTags: (_result, _error, code) => [{ type: "Plot", id: code }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPlotsQuery,
  useSearchPlotsQuery,
  useGetPlotStatsQuery,
  useGetPlotByCodeQuery,
} = plotApi;
