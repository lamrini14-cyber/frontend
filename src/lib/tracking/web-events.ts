"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (...args: unknown[]) => void; page: () => void };
    snaptr?: (...args: unknown[]) => void;
  }
}

export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2];
}

export function trackPageView() {
  window.fbq?.("track", "PageView");
  window.ttq?.page();
}

export function trackViewContent(slug: string, eventId: string) {
  window.fbq?.("track", "ViewContent", { content_ids: [slug], content_type: "product" }, { eventID: eventId });
  window.ttq?.track("ViewContent", { content_id: slug, content_type: "product" }, { event_id: eventId });
}

export function trackAddToCart(slugs: string[], value: number, eventId: string) {
  window.fbq?.(
    "track",
    "AddToCart",
    { content_ids: slugs, content_type: "product", value, currency: "XOF" },
    { eventID: eventId }
  );
  window.ttq?.track(
    "AddToCart",
    { content_ids: slugs, content_type: "product", value, currency: "XOF" },
    { event_id: eventId }
  );
}

export function trackInitiateCheckout(value: number, eventId: string) {
  window.fbq?.("track", "InitiateCheckout", { value, currency: "XOF" }, { eventID: eventId });
  window.ttq?.track("InitiateCheckout", { value, currency: "XOF" }, { event_id: eventId });
}

export function trackPurchase(slugs: string[], value: number, eventId: string, orderNumber: string) {
  window.fbq?.(
    "track",
    "Purchase",
    { value, currency: "XOF", content_ids: slugs, content_type: "product", num_items: slugs.length },
    { eventID: eventId }
  );
  window.ttq?.track(
    "CompletePayment",
    { value, currency: "XOF", content_id: slugs[0] ?? "", content_type: "product" },
    { event_id: eventId }
  );
  window.snaptr?.("track", "PURCHASE", {
    price: value,
    currency: "XOF",
    transaction_id: orderNumber,
    item_ids: slugs,
  });
}
