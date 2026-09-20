import { baseApi, getPaginationMeta } from "@/redux/api/baseApi";
import type { Paginated } from "@/redux/api/types";
import type { FlagReason, ReportStatus } from "@/lib/types";

export type ReportCreatePayload = {
  isAnonymous?: boolean;
  reason: FlagReason;
  description: string;
};

export type ReportSummaryApi = {
  id: number;
  plotId: number;
  reporterUserId: string;
  isAnonymous: boolean;
  reason: FlagReason;
  description: string;
  status: ReportStatus;
  yesVotes: number;
  noVotes: number;
  myVote: "yes" | "no" | null;
  confirmedAt: string | null;
  rejectedAt: string | null;
  createdAt: string;
  updatedAt?: string;
};

export type VoteReportArgs = {
  plotId: number;
  reportId: number;
  vote: "yes" | "no";
};

export type ReportListResult = Paginated<ReportSummaryApi>;

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** Omit plotId to fetch every report across all plots (used on /reports). */
    getReports: builder.query<
      ReportListResult,
      { plotId?: number; page?: number; limit?: number } | number | void
    >({
      query: (arg) => {
        // Accept a bare number for backward compatibility with existing
        // callers like useGetReportsQuery(plotId).
        const params = typeof arg === "number" ? { plotId: arg } : arg;
        if (params?.plotId) {
          return `/plots/${params.plotId}/reports`;
        }
        return {
          url: "/reports",
          params: { page: params?.page, limit: params?.limit },
        };
      },
      // /reports returns { items, pagination } via meta; /plots/:id/reports
      // returns a bare array with no meta at all. Handle both here so
      // callers always get the same { items, pagination } shape back.
      transformResponse: (
        response: ReportSummaryApi[],
        meta,
      ): ReportListResult => {
        const m = getPaginationMeta<{
          pagination?: ReportListResult["pagination"];
        }>(meta);
        if (m?.pagination) {
          return { items: response, pagination: m.pagination };
        }
        return {
          items: response,
          pagination: {
            page: 1,
            limit: response.length,
            total: response.length,
            totalPages: 1,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((r) => ({
                type: "Report" as const,
                id: r.id,
              })),
              { type: "Report" as const, id: "LIST" },
            ]
          : [{ type: "Report" as const, id: "LIST" }],
    }),

    createReport: builder.mutation<
      ReportSummaryApi,
      { plotId: number; payload: ReportCreatePayload }
    >({
      query: ({ plotId, payload }) => ({
        url: `/plots/${plotId}/reports`,
        method: "POST",
        body: payload,
      }),
      // A new report should show up in the /reports list immediately.
      invalidatesTags: [{ type: "Report", id: "LIST" }],
    }),

    voteReport: builder.mutation<ReportSummaryApi, VoteReportArgs>({
      query: ({ plotId, reportId, vote }) => ({
        url: `/plots/${plotId}/reports/${reportId}/votes`,
        method: "POST",
        body: { vote },
      }),
      // Refetch this one report (updates its vote counts/status on screen)
      // and the list (a vote can push a report past a status threshold).
      invalidatesTags: (_result, _error, { reportId }) => [
        { type: "Report", id: reportId },
        { type: "Report", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetReportsQuery,
  useCreateReportMutation,
  useVoteReportMutation,
} = reportApi;
