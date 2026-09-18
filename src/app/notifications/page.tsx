"use client";

import { useRouter } from "next/navigation";
import {
  NotificationItem,
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/redux/notification/notificationApi";

export default function NotificationsPage() {
  const router = useRouter();
  const { data, isLoading } = useGetNotificationsQuery();
  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead] = useMarkAllNotificationsReadMutation();

  const handleClick = async (n: NotificationItem) => {
    if (!n.isRead) await markRead(n.id);
    router.push(n.plot ? `/plot/${n.plot.code}` : "/");
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Notifications</h1>
        {(data?.unreadCount ?? 0) > 0 && (
          <button onClick={() => markAllRead()} className="text-sm text-muted">
            Mark all as read
          </button>
        )}
      </div>

      {!isLoading && data?.items.length === 0 && (
        <p className="mt-8 text-muted">No notifications yet.</p>
      )}

      <ul className="mt-6 divide-y divide-line">
        {data?.items.map((n) => (
          <li
            key={n.id}
            onClick={() => handleClick(n)}
            className={`cursor-pointer py-4 ${n.isRead ? "opacity-60" : ""}`}
          >
            <p className="font-medium">{n.title}</p>
            <p className="text-sm text-muted">{n.message}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
