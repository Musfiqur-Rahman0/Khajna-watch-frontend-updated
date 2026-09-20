"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

import { authApi } from "@/redux/auth/authApi";
import { setLang } from "@/redux/lang/langSlice";
import { store } from "@/redux/store";
const LANG_KEY = "khajna-watch:lang:v2";

function Persistence() {
  const didHydrate = useRef(false);

  // Restore watchlist/lang from localStorage once, then keep them synced.
  useEffect(() => {
    if (didHydrate.current) return;
    didHydrate.current = true;

    try {

      const rawLang = window.localStorage.getItem(LANG_KEY);
      if (rawLang === "bn" || rawLang === "en") {
        store.dispatch(setLang(rawLang));
      }
    } catch {
      // ignore malformed storage
    }

    let prevLang = store.getState().lang.lang;
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const currentLang = state.lang.lang;
      if (prevLang !== currentLang) {
        prevLang = currentLang;
        try {
          window.localStorage.setItem(LANG_KEY, currentLang);
        } catch {
          // ignore storage errors (private mode, quota, etc.)
        }
      }
    });

    return unsubscribe;
  }, []);

  // Restore the session (if any) once per app load. Plot/report data is no
  // longer bootstrapped here — each page fetches what it needs via RTK
  // Query hooks (useGetPlotsQuery/useGetReportsQuery), which cache and dedupe
  // across components on their own.
  useEffect(() => {
    const promise = store.dispatch(authApi.endpoints.refreshSession.initiate());
    return () => promise.unsubscribe();
  }, []);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Persistence />
      {children}
      <Toaster position="bottom-center" richColors />
    </Provider>
  );
}
