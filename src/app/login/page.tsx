"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/auth";
import type { ApiError } from "@/redux/api/baseApi";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading: loading }] = useLoginMutation();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.warning("Please enter your email and password.");
      return;
    }

    try {
      await login({
        email: email.trim().toLowerCase(),
        password,
      }).unwrap();

      toast.success("Login successful");
      router.push("/");
    } catch (error) {
      const message = (error as ApiError)?.message ?? "Login failed";
      toast.error(message);
    }
  }

  return (
    <main className="min-h-[calc(100vh-8rem)] bg-paper px-4 py-12 text-ink">
      <div className="mx-auto max-w-md rounded-2xl border border-line bg-surface p-8 shadow-sm">
        <div className="mb-8 text-center">
          <span className="inline-flex rounded-full bg-forest-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-forest">
            Khajna Watch
          </span>
          <h1 className="mt-4 font-display text-4xl leading-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted">
            Login to continue tracking land reports.
          </p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              autoComplete="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <Link
                className="text-xs font-medium text-forest hover:underline"
                href="#"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted">
          New here?{" "}
          <Link
            className="font-semibold text-forest hover:underline"
            href="/register"
          >
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}
