const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.sunuyaram.shop";

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
  const res = await fetch(`${API_URL}/api/v1/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: "UNKNOWN", message: "Erreur inconnue." }));
    throw body as ApiError;
  }

  return res.json();
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
