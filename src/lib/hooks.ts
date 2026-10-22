"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const readTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

export function useTheme(): Theme {
  return useSyncExternalStore(subscribeTheme, readTheme, () => "light");
}

function subscribeMinute(callback: () => void) {
  const id = window.setInterval(callback, 15_000);
  return () => window.clearInterval(id);
}

/** Current wall-clock time in a time zone, e.g. "14:32". Empty during SSR. */
export function useLocalTime(timeZone: string) {
  return useSyncExternalStore(
    subscribeMinute,
    () =>
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone }).format(new Date()),
    () => "",
  );
}
