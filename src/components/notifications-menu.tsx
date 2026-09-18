"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMyWatchlistQuery } from "@/redux/watchlist/watchlistApi";
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  type NotificationItem,
} from "@/redux/notification/notificationApi";

export function NotificationsMenu() {
  const router = useRouter();
  // limit: 5 keeps the dropdown short; unreadCount still reflects the true total.
  const { data } = useGetNotificationsQuery(
    { limit: 5 },
    { pollingInterval: 30000 },
  );
  const { data: watchlist } = useGetMyWatchlistQuery();
  const [markRead] = useMarkNotificationReadMutation();

  const unreadCount = data?.unreadCount ?? 0;

  const handleClick = async (n: NotificationItem) => {
    if (!n.isRead) await markRead(n.id);
    router.push(n.plot ? `/plot/${n.plot.code}` : "/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative border-2  border-gray-300 rounded-full"
            aria-label="Open notifications"
          />
        }
      >
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -right-1 -top-1 h-4 min-w-4 justify-center rounded-full px-1 text-[10px]">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-primary flex items-center justify-between">
            <span>Watchlist</span>
            <span className="text-xs text-muted">
              {watchlist?.length ?? 0} plot{watchlist?.length === 1 ? "" : "s"}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuItem
            render={<Link href="/watch" />}
            className="cursor-pointer"
          >
            View watchlist
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-primary font-bold  flex items-center justify-between">
            <span>Guide</span>
          </DropdownMenuLabel>
          <DropdownMenuItem
            render={<Link href="/guide" />}
            className="cursor-pointer"
          >
            View guide
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-primary font-bold">
            Notifications
          </DropdownMenuLabel>
          {data?.items.length === 0 && (
            <p className="px-2 py-3 text-sm text-muted">
              No notifications yet.
            </p>
          )}
          {data?.items.map((n) => (
            <DropdownMenuItem
              key={n.id}
              onClick={() => handleClick(n)}
              className={n.isRead ? "opacity-60" : ""}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{n.title}</span>
                <span className="line-clamp-1 text-xs text-muted">
                  {n.message}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          render={<Link href="/notifications" />}
          className="cursor-pointer"
        >
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
