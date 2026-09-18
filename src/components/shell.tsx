"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { PlotMark } from "@/components/mark";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useAppSelector } from "@/redux/store";
import { useLogoutMutation, type AuthSessionUser } from "@/redux/auth";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogOut, UserRound } from "lucide-react";
import { NotificationsMenu } from "./notifications-menu";

export function Shell({ children }: { children: React.ReactNode }) {
  const { lang, toggleLang, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppSelector((s) => s.auth.user);
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();

  async function handleLogout() {
    await logout();
    toast.success("Logged out");
    router.push("/");
  }

  const links = [
    {
      to: "/",
      label: t.nav.search,
      match: (p: string) => p === "/" || p.startsWith("/plot"),
    },
    {
      to: "/reports",
      label: t.nav.reports,
      match: (p: string) => p.startsWith("/reports"),
    },
  ] as const;

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="no-print sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
          <Link href="/" className="flex min-w-0 items-center gap-2 text-ink">
            <PlotMark className="size-8 text-forest" />
            <span className="truncate font-display text-lg leading-none sm:text-xl">
              {t.appName}
            </span>
          </Link>
          <nav className="ml-auto hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                href={l.to}
                className={cn(
                  "inline-flex h-11 items-center rounded-md px-3 text-sm font-medium transition-colors duration-150",
                  l.match(pathname)
                    ? "bg-paper-2 text-ink"
                    : "text-muted hover:text-ink",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Button
            variant="outline"
            size="sm"
            className="ml-1"
            onClick={toggleLang}
            aria-label={lang === "bn" ? "Switch to English" : "বাংলায় যান"}
          >
            {t.langToggle}
          </Button>

          {user ? (
            <NavUser
              user={user}
              onLogout={handleLogout}
              loggingOut={loggingOut}
            />
          ) : (
            <Link
              href="/login"
              className="ml-auto flex h-9 items-center rounded-md px-3 text-sm font-medium text-muted hover:bg-paper-2 hover:text-ink sm:ml-1"
            >
              Login
            </Link>
          )}

          <NotificationsMenu />
        </div>
        <nav className="flex border-t border-line sm:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              className={cn(
                "flex h-12 flex-1 items-center justify-center text-sm font-medium",
                l.match(pathname) ? "text-forest" : "text-muted",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="no-print border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted">
          {t.disclaimer}
        </p>
      </footer>
    </div>
  );
}

type UserData = {
  name: AuthSessionUser["name"];
  email: AuthSessionUser["email"];
};

const NavUser = ({
  user,
  onLogout,
  loggingOut,
}: {
  user: UserData;
  onLogout: () => void;
  loggingOut: boolean;
}) => {
  const initials = user.name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  console.log("initals user", initials, user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            size="icon-lg"
            variant="ghost"
            className="ml-auto rounded-full  data-popup-open:text-ink sm:ml-1 bg-transparent"
            aria-label="Open user menu"
          />
        }
      >
        <Avatar
          className="size-8
      "
        >
          <AvatarFallback
            aria-label={`User avatar for text-green-700 ${user.name}`}
          >
            <UserRound className="size-5 text-green-700 font-bold" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="size-8 rounded-lg overflow-hidden">
                <AvatarFallback className="rounded-lg  text-green-700 font-bold text-xl overflow-hidden aspect-square">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-primary uppercase">
                  {user.name}
                </span>
                <span className="truncate text-xs text-subtle">
                  {user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={onLogout}
          disabled={loggingOut}
        >
          <LogOut className="mr-2 size-4 cursor-pointer" />
          {loggingOut ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
