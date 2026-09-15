import { baseApi } from "@/redux/api/baseApi";
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
  myVote : string;
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

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** Omit plotId to fetch every report across all plots (used on /reports). */
    getReports: builder.query<ReportSummaryApi[], number | void>({
      query: (plotId) => (plotId ? `/plots/${plotId}/reports` : "/reports"),
      providesTags: (result) =>
        result
          ? [
              ...result.map((r) => ({ type: "Report" as const, id: r.id })),
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
