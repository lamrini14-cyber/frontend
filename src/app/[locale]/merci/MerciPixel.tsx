"use client";

import { useEffect } from "react";
import { trackPageView } from "@/lib/tracking/web-events";

export default function MerciPixel({ orderNumber }: { orderNumber: string }) {
  useEffect(() => {
    trackPageView();
  }, [orderNumber]);

  return null;
}
