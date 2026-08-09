"use client";

import { useEffect } from "react";

export default function DeferredPixels() {
  useEffect(() => {
    const load = () => import("@/lib/tracking/load-pixels").then((m) => m.loadAllPixels());

    if ("requestIdleCallback" in window) {
      (window as Window & typeof globalThis & { requestIdleCallback: (cb: () => void, opts: object) => void })
        .requestIdleCallback(load, { timeout: 2000 });
    } else {
      setTimeout(load, 2000);
    }
  }, []);

  return null;
}
