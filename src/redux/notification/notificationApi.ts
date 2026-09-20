import { baseApi, getPaginationMeta } from "../api/baseApi";
import type { Paginated } from "../api/types";

export type NotificationItem = {
  id: number;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  plotId: number | null;
  reportId: number | null;
  plot: { code: string } | null;
};

type ListParams = { page?: number; limit?: number; unreadOnly?: boolean };
type ListResult = Paginated<NotificationItem> & {
  unreadCount: number;
};

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<ListResult, ListParams | void>({
      query: (params) => ({ url: "/notifications", params: params ?? {} }),

      transformResponse: (res: NotificationItem[], meta) => {
        const m = getPaginationMeta<{
          pagination: ListResult["pagination"];
          unreadCount: number;
        }>(meta);
        return {
          items: res,
          unreadCount: m.unreadCount,
          pagination: m.pagination,
        };
      },
      providesTags: [{ type: "Notification", id: "LIST" }],
    }),

    markNotificationRead: builder.mutation<unknown, number>({
      query: (id) => ({ url: `/notifications/${id}/read`, method: "PATCH" }),
      invalidatesTags: [{ type: "Notification", id: "LIST" }],
    }),

    markAllNotificationsRead: builder.mutation<unknown, void>({
      query: () => ({ url: `/notifications/read-all`, method: "PATCH" }),
      invalidatesTags: [{ type: "Notification", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} = notificationApi;
