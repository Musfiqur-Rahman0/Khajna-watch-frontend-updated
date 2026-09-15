// export { cn } from "cn"
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBdt(amount: number | string): string {
  const numericAmount = typeof amount === "number" ? amount : Number(amount);
  if (!Number.isFinite(numericAmount)) return "৳0";
  return `৳${numericAmount.toLocaleString("en-BD")}`;
}

export function formatArea(n: number | string, lang: "bn" | "en"): string {
  const numeric = typeof n === "number" ? n : Number(n);
  if (!Number.isFinite(numeric)) {
    return lang === "bn" ? `${String(n)} শতক` : `${String(n)} decimal`;
  }

  const value = Number.isInteger(numeric)
    ? String(numeric)
    : numeric.toFixed(2).replace(/\.00$/, "");

  return lang === "bn" ? `${value} শতক` : `${value} decimal`;
}

export function formatShare(ana: number | string, lang: "bn" | "en"): string {
  const numeric = typeof ana === "number" ? ana : Number(ana);
  if (!Number.isFinite(numeric)) {
    return lang === "bn" ? `${String(ana)} আনা` : `${String(ana)} ana`;
  }

  const value = Number.isInteger(numeric)
    ? String(numeric)
    : numeric.toFixed(1);
  return lang === "bn" ? `${value} আনা` : `${value} ana`;
}

export function formatRelative(iso: string, lang: "bn" | "en"): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const days = Math.max(0, Math.floor((now - then) / 86400000));
  if (days === 0) return lang === "bn" ? "আজ" : "Today";
  if (days === 1) return lang === "bn" ? "গতকাল" : "Yesterday";
  if (days < 30) return lang === "bn" ? `${days} দিন আগে` : `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12)
    return lang === "bn" ? `${months} মাস আগে` : `${months}mo ago`;
  const years = Math.floor(months / 12);
  return lang === "bn" ? `${years} বছর আগে` : `${years}y ago`;
}
