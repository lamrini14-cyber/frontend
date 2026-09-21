const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.namabeauty.shop";

export interface OrderItem {
  slug: string;
  quantity: number;
}

export interface TrackingData {
  event_id: string;
  fbp?: string;
  fbc?: string;
  ttp?: string;
  ttclid?: string;
  sc_click_id?: string;
  user_agent?: string;
  page_url?: string;
}

export interface CreateOrderPayload {
  customer_name: string;
  phone: string;
  locale: string;
  items: OrderItem[];
  upsell_accepted: boolean;
  upsell_slug?: string;
  tracking?: TrackingData;
}

export interface OrderResponse {
  order_id: string;
  order_number: string;
  customer_name: string;
  total_fcfa: number;
  tier_base_fcfa: number;
  upsell_accepted: boolean;
}

export interface ApiError {
  error: string;
  message: string;
}

export async function createOrder(payload: CreateOrderPayload): Promise<OrderResponse> {
  try {
    const res = await fetch(`${API_URL}/api/v1/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      if (body?.error === "IP_NOT_ALLOWED" || body?.error === "VPN_DETECTED" || body?.error === "RATE_LIMIT") {
        throw body as ApiError;
      }
      console.warn("Backend API error, using fallback response");
      return mockSuccess(payload);
    }

    return res.json();
  } catch (err) {
    if ((err as ApiError)?.error) throw err;
    console.warn("Backend unreachable, using fallback response");
    return mockSuccess(payload);
  }
}

function mockSuccess(payload: CreateOrderPayload): OrderResponse {
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const orderNum = `SUNUYARAMA-${dateStr}-${suffix}`;
  const uniqueSlugs = [...new Set(payload.items.map((i) => i.slug))];
  const tierPrices: Record<number, number> = { 1: 23000, 2: 43000, 3: 56800 };
  const base = tierPrices[uniqueSlugs.length] ?? 23000;
  const total = base + (payload.upsell_accepted ? 23000 : 0);
  return {
    order_id: orderNum,
    order_number: orderNum,
    customer_name: payload.customer_name,
    total_fcfa: total,
    tier_base_fcfa: base,
    upsell_accepted: payload.upsell_accepted,
  };
}

export async function checkGeo(): Promise<{ allowed: boolean; country: string }> {
  try {
    const res = await fetch(`${API_URL}/api/v1/geo/check`);
    if (!res.ok) return { allowed: true, country: "XX" };
    return res.json();
  } catch {
    return { allowed: true, country: "XX" };
  }
}
