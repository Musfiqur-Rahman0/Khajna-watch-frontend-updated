import { getAnonId } from "@/lib/utils";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:5000/api/v1";

export type ApiSuccessPayload<T> = {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
};

export type ApiErrorPayload = {
  success: false;
  message?: string;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

/** Normalized shape every RTK Query hook in this app throws/returns on error. */
export type ApiError = {
  message: string;
  code?: string;
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
  credentials: "include",
  prepareHeaders: (headers) => {
    // Server-side identity is the session cookie (already sent via
    // credentials: "include"). This header is the fallback identity for
    // logged-out visitors, so the backend can still tell "this plot's
    // watcher" apart from every other anonymous browser.
    if (typeof window !== "undefined") {
      headers.set("x-anon-id", getAnonId());
    }
    return headers;
  },
});

/**
 * Wraps fetchBaseQuery so every endpoint gets the unwrapped `data` straight
 * from the backend's `{ success, data }` envelope, and every error comes back
 * as a plain `{ message, code }` object — this is what `mutation(...).unwrap()`
 * throws, so components can do `catch (err) { toast.error(err.message) }`
 * without re-deriving it from a raw fetch Response each time.
 */
const unwrappingBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  ApiError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const payload = result.error.data as ApiErrorPayload | undefined;
    return {
      error: {
        message:
          payload?.error?.message ?? payload?.message ?? "Request failed",
        code: payload?.error?.code,
      },
    };
  }

  const payload = result.data as
    | ApiSuccessPayload<unknown>
    | ApiErrorPayload
    | null;

  if (!payload || payload.success !== true) {
    const message =
      payload && "error" in payload
        ? payload.error.message
        : payload && "message" in payload
          ? payload.message
          : "Request failed";
    return { error: { message } };
  }

  return { data: payload.data, meta: payload.meta };
};

/**
 * The single RTK Query instance for the app. Every domain (plot, report,
 * auth, ...) injects its own endpoints into this via `baseApi.injectEndpoints`
 * instead of creating a separate `createApi` — that keeps one cache, one
 * middleware, and one set of tag types, while still letting each domain's
 * endpoints/types live in their own file.
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: unwrappingBaseQuery,
  tagTypes: ["Plot", "Report", "Auth", "Watchlist", "Notification"],
  endpoints: () => ({}),
});
