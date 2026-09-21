"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => reg)
        .catch((err) => console.error("Sw registration failed : ", err));
    }
  }, []);

  return null;
}
