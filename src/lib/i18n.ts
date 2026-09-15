"use client";

import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setLang, toggleLang } from "@/redux/lang/langSlice";
import { copy, localize, type Lang } from "@/lib/copy";

export function useI18n() {
  const lang = useAppSelector((s) => s.lang.lang);
  const dispatch = useAppDispatch();

  const t = useMemo(() => localize(copy, lang), [lang]);

  const setLangDirect = useCallback(
    (next: Lang) => {
      dispatch(setLang(next));
    },
    [dispatch],
  );

  const toggle = useCallback(() => {
    dispatch(toggleLang());
  }, [dispatch]);

  return { lang, setLang: setLangDirect, toggleLang: toggle, t };
}
