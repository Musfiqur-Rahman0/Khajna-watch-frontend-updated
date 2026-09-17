import { baseApi } from "@/redux/api/baseApi";
import type { PlotSummaryApi } from "@/redux/plot/plotApi";

export type WatchlistEntry = {
  id: number;
  plotId: number;
  userId: string | null;
  anonId: string | null;
  createdAt: string;
  plot: PlotSummaryApi;
};

export const watchlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** Is the current identity (session or anon) watching this one plot? */
    getWatchStatus: builder.query<
      { plotId: number; watching: boolean },
      number
    >({
      query: (plotId) => `/plots/${plotId}/watchlist`,
      providesTags: (_result, _error, plotId) => [
        { type: "Watchlist", id: plotId },
      ],
    }),

    addToWatchlist: builder.mutation<unknown, number>({
      query: (plotId) => ({
        url: `/plots/${plotId}/watchlist`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, plotId) => [
        { type: "Watchlist", id: plotId },
        { type: "Watchlist", id: "LIST" },
      ],
    }),

    removeFromWatchlist: builder.mutation<unknown, number>({
      query: (plotId) => ({
        url: `/plots/${plotId}/watchlist`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, plotId) => [
        { type: "Watchlist", id: plotId },
        { type: "Watchlist", id: "LIST" },
      ],
    }),

    /** Logged-in users only — the backend requires a real account for this one. */
    getMyWatchlist: builder.query<WatchlistEntry[], void>({
      query: () => "/watchlist",
      providesTags: [{ type: "Watchlist", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWatchStatusQuery,
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,
  useGetMyWatchlistQuery,
} = watchlistApi;
