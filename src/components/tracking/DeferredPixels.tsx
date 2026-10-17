"use client";

import { useEffect } from "react";

export default function DeferredPixels() {
  useEffect(() => {
    const load = async () => {
      const [{ loadAllPixels }, { trackServerPageView }] = await Promise.all([
        import("@/lib/tracking/load-pixels"),
        import("@/lib/tracking/web-events"),
      ]);
      await loadAllPixels();
      trackServerPageView();
    };

    if ("requestIdleCallback" in window) {
      (window as Window & typeof globalThis & { requestIdleCallback: (cb: () => void, opts: object) => void })
        .requestIdleCallback(load, { timeout: 2000 });
    } else {
      setTimeout(load, 2000);
    }
  }, []);

  return null;
}
