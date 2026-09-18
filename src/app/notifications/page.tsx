"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronRight,
  Clock,
  FileText,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  Megaphone,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn, formatRelative } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import {
  NotificationItem,
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/redux/notification/notificationApi";

type Tab = "all" | "unread";

const TYPE_ICON: Record<string, { icon: typeof FileText; className: string }> =
  {
    new_report: { icon: FileText, className: "bg-forest/10 text-forest" },
    report_under_consideration: {
      icon: Clock,
      className: "bg-amber-500/10 text-amber-600",
    },
    report_confirmed: {
      icon: CheckCircle2,
      className: "bg-forest/10 text-forest",
    },
    risk_increased: { icon: TrendingUp, className: "bg-seal/10 text-seal" },
    plot_warning_added: {
      icon: ShieldAlert,
      className: "bg-seal/10 text-seal",
    },
    system: { icon: Megaphone, className: "bg-paper-2 text-muted" },
  };

export default function NotificationsPage() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("all");

  const { data, isLoading } = useGetNotificationsQuery();
  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead] = useMarkAllNotificationsReadMutation();

  const items = data?.items ?? [];
  const unreadCount = data?.unreadCount ?? 0;

  const visible = useMemo(
    () => (tab === "unread" ? items.filter((n) => !n.isRead) : items),
    [items, tab],
  );

  const handleClick = async (n: NotificationItem) => {
    if (!n.isRead) await markRead(n.id);
    router.push(n.plot ? `/plot/${n.plot.code}` : "/");
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-4 max-w-[40rem]">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl">
              {t.notifTitle}
            </h1>
            <p className="mt-1 text-muted">{t.notifLead}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="inline-flex items-center gap-1 rounded-full bg-paper-2/60 p-1">
            {(["all", "unread"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors",
                  tab === key
                    ? "bg-paper text-ink shadow-sm"
                    : "text-muted hover:text-ink",
                )}
              >
                {key === "all" ? t.notifTabAll : t.notifTabUnread}
                <span
                  className={cn(
                    "flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px]",
                    tab === key
                      ? "bg-paper-2 text-ink"
                      : "bg-paper-2/70 text-muted",
                  )}
                >
                  {key === "all" ? items.length : unreadCount}
                </span>
              </button>
            ))}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={() => markAllRead()}
              className="text-sm font-medium text-muted hover:text-ink"
            >
              {t.notifMarkAllRead}
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {!isLoading && visible.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <Bell className="size-8 text-muted" />
            <p className="text-muted">
              {tab === "unread" ? t.notifEmptyUnread : t.notifEmptyAll}
            </p>
          </div>
        )}

        {visible.map((n) => {
          const { icon: Icon, className } =
            TYPE_ICON[n.type] ?? TYPE_ICON.system;
          return (
            <Card
              key={n.id}
              onClick={() => handleClick(n)}
              className={cn(
                "flex cursor-pointer items-start gap-4 rounded-xl border-0 p-4 transition-colors hover:bg-paper-2",
                !n.isRead && "bg-paper-2/60",
              )}
            >
              <div
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full",
                  className,
                )}
              >
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {!n.isRead && (
                    <span className="size-2 shrink-0 rounded-full bg-forest" />
                  )}
                  <p className={cn("font-medium", n.isRead && "text-muted")}>
                    {n.title}
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted">{n.message}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-subtle">
                  <Clock className="size-3" />
                  {formatRelative(n.createdAt, lang)}
                </div>
              </div>
              <ChevronRight className="mt-1 size-4 shrink-0 text-muted" />
            </Card>
          );
        })}
      </div>
    </main>
  );
}
