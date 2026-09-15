"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/redux/auth";
import type { ApiError } from "@/redux/api/baseApi";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { isLoading: loading }] = useRegisterMutation();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.warning("Please complete all fields.");
      return;
    }

    if (password.length < 8) {
      toast.warning("Password must be at least 8 characters.");
      return;
    }

    try {
      await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      }).unwrap();

      toast.success("Registration successful");
      router.push("/login");
    } catch (error) {
      const message = (error as ApiError)?.message ?? "Registration failed";
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
            Create account
          </h1>
          <p className="mt-2 text-sm text-muted">
            Join the community report network.
          </p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              Full name
            </label>
            <Input
              id="name"
              autoComplete="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              required
            />
          </div>

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
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              autoComplete="new-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            className="font-semibold text-forest hover:underline"
            href="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
