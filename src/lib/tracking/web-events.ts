"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.sunuyaram.shop";

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

function getSessionId(): string {
  const key = "sunuyarama_session_id";
  const existing = getCookie(key);
  if (existing) return existing;

  const value = crypto.randomUUID();
  document.cookie = `${key}=${value}; path=/; max-age=2592000; SameSite=Lax`;
  return value;
}

function getUrlParam(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  return new URLSearchParams(window.location.search).get(name) ?? undefined;
}

function sendServerEvent(eventType: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    event_type: eventType,
    session_id: getSessionId(),
    event_id: payload.event_id ?? crypto.randomUUID(),
    page_url: window.location.href,
    referer: document.referrer || undefined,
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
    ttp: getCookie("_ttp"),
    ttclid: getUrlParam("ttclid") ?? getCookie("ttclid"),
    sc_click_id: getUrlParam("ScCid") ?? getUrlParam("sc_click_id"),
    utm_source: getUrlParam("utm_source"),
    utm_medium: getUrlParam("utm_medium"),
    utm_campaign: getUrlParam("utm_campaign"),
    utm_content: getUrlParam("utm_content"),
    utm_term: getUrlParam("utm_term"),
    ...payload,
  });

  const endpoint = `${API_URL}/api/v1/tracking/events`;
  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
    return;
  }

  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}

export function trackPageView() {
  window.fbq?.("track", "PageView");
  window.ttq?.page();
  trackServerPageView();
}

export function trackServerPageView() {
  sendServerEvent("page_view");
}

export function trackViewContent(slug: string, eventId: string) {
  window.fbq?.("track", "ViewContent", { content_ids: [slug], content_type: "product" }, { eventID: eventId });
  window.ttq?.track("ViewContent", { content_id: slug, content_type: "product" }, { event_id: eventId });
  sendServerEvent("product_view", { event_id: eventId, product_slug: slug, product_slugs: [slug] });
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
  sendServerEvent("add_to_cart", { event_id: eventId, product_slugs: slugs, value_fcfa: value });
}

export function trackInitiateCheckout(value: number, eventId: string) {
  window.fbq?.("track", "InitiateCheckout", { value, currency: "XOF" }, { eventID: eventId });
  window.ttq?.track("InitiateCheckout", { value, currency: "XOF" }, { event_id: eventId });
  sendServerEvent("checkout_start", { event_id: eventId, value_fcfa: value });
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
  sendServerEvent("purchase", { event_id: eventId, product_slugs: slugs, value_fcfa: value, order_number: orderNumber });
}
