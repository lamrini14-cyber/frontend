const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.sunuyaram.shop";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("sy_admin_token");
}

export function setToken(token: string) {
  localStorage.setItem("sy_admin_token", token);
}

export function clearToken() {
  localStorage.removeItem("sy_admin_token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

async function authFetch(path: string, opts: RequestInit = {}) {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");
  const res = await fetch(`${API_URL}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...opts.headers,
    },
  });
  if (res.status === 401) {
    clearToken();
    throw new Error("Session expired");
  }
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/api/v1/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  const data = await res.json();
  setToken(data.token);
  return data;
}

export async function fetchDashboard(days: number = 30) {
  return authFetch(`/api/v1/admin/dashboard?days=${days}`);
}

export async function fetchOrders(params: {
  page?: number;
  page_size?: number;
  status?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.page_size) qs.set("page_size", String(params.page_size));
  if (params.status) qs.set("status", params.status);
  if (params.search) qs.set("search", params.search);
  if (params.date_from) qs.set("date_from", params.date_from);
  if (params.date_to) qs.set("date_to", params.date_to);
  return authFetch(`/api/v1/admin/orders?${qs.toString()}`);
}

export async function fetchOrder(orderId: string) {
  return authFetch(`/api/v1/admin/orders/${orderId}`);
}

export async function updateOrderStatus(orderId: string, status: string) {
  return authFetch(`/api/v1/admin/orders/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
