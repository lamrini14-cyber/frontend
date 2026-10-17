"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BarChart3, Package, LogOut, Search, ChevronLeft, ChevronRight,
  RefreshCw, X, Phone, User, Calendar, MapPin, Shield, AlertTriangle,
} from "lucide-react";
import { fetchOrders, fetchOrder, updateOrderStatus, isAuthenticated, clearToken } from "@/lib/admin-api";

const PRODUCT_NAMES: Record<string, string> = {
  "nuit-calm": "NuitCalm",
  "energie-vit": "ÉnergieVit",
  "confort-digest": "ConfortDigest",
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  confirmed: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  returned: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

const STATUS_OPTIONS = ["new", "confirmed", "shipped", "delivered", "cancelled", "returned"];

function formatFCFA(n: number): string {
  return n.toLocaleString("fr-FR") + " FCFA";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default function OrdersPage() {
  const router = useRouter();
  const locale = typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "fr";

  const [orders, setOrders] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push(`/${locale}/admin`);
      return;
    }
    loadOrders();
  }, [page, statusFilter]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders({
        page,
        page_size: 20,
        status: statusFilter || undefined,
        search: search || undefined,
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
      });
      setOrders(data.orders);
      setTotal(data.total);
      setTotalPages(data.total_pages);
    } catch (e: any) {
      if (e.message === "Session expired") router.push(`/${locale}/admin`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadOrders();
  };

  const openDetail = async (orderId: string) => {
    setDetailLoading(true);
    try {
      const data = await fetchOrder(orderId);
      setSelectedOrder(data);
    } catch {
      // ignore
    } finally {
      setDetailLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      loadOrders();
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    clearToken();
    router.push(`/${locale}/admin`);
  };

  return (
    <div className="min-h-screen bg-[#0A1A1A] text-white">
      {/* Header */}
      <header className="bg-[#111] border-b border-gray-800 px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[#0D6E6E] flex items-center justify-center text-sm font-bold text-[#D4A843]">
              SY
            </div>
            <div>
              <h1 className="font-bold text-sm">SUNU YARAMA</h1>
              <p className="text-gray-500 text-xs">Dashboard Admin</p>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <Link
              href={`/${locale}/admin/dashboard`}
              className="text-sm text-gray-400 hover:text-white font-medium flex items-center gap-1.5"
            >
              <BarChart3 size={14} /> Dashboard
            </Link>
            <Link
              href={`/${locale}/admin/orders`}
              className="text-sm text-[#D4A843] font-medium flex items-center gap-1.5"
            >
              <Package size={14} /> Commandes
            </Link>
            <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 transition-colors">
              <LogOut size={16} />
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              Commandes
            </h2>
            <p className="text-gray-500 text-sm mt-1">{total} commandes au total</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-4 mb-6">
          <form onSubmit={handleSearch} className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[200px]">
              <label className="text-gray-500 text-[10px] uppercase tracking-wide block mb-1">Recherche</label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Nom, téléphone, N° commande..."
                  className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:border-[#0D6E6E] outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-500 text-[10px] uppercase tracking-wide block mb-1">Statut</label>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#0D6E6E] outline-none"
              >
                <option value="">Tous</option>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-500 text-[10px] uppercase tracking-wide block mb-1">Du</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#0D6E6E] outline-none"
              />
            </div>
            <div>
              <label className="text-gray-500 text-[10px] uppercase tracking-wide block mb-1">Au</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#0D6E6E] outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-[#0D6E6E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0A5656]"
            >
              Filtrer
            </button>
          </form>
        </div>

        {/* Orders table */}
        <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-4 py-3 text-gray-500 text-xs font-medium uppercase">Commande</th>
                  <th className="text-left px-4 py-3 text-gray-500 text-xs font-medium uppercase">Client</th>
                  <th className="text-left px-4 py-3 text-gray-500 text-xs font-medium uppercase">Produits</th>
                  <th className="text-left px-4 py-3 text-gray-500 text-xs font-medium uppercase">Total</th>
                  <th className="text-left px-4 py-3 text-gray-500 text-xs font-medium uppercase">Statut</th>
                  <th className="text-left px-4 py-3 text-gray-500 text-xs font-medium uppercase">Pays</th>
                  <th className="text-left px-4 py-3 text-gray-500 text-xs font-medium uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-b border-gray-800/50 hover:bg-white/5 cursor-pointer transition-colors"
                    onClick={() => openDetail(o.id)}
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-[#D4A843]">{o.order_number}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-sm">{o.customer_name}</div>
                      <div className="text-gray-500 text-xs">{o.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {o.items.map((item: any, i: number) => (
                          <span key={i} className="text-[10px] bg-[#0D6E6E]/20 text-[#0D6E6E] px-1.5 py-0.5 rounded">
                            {PRODUCT_NAMES[item.slug] || item.slug} ×{item.quantity}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-sm">{formatFCFA(o.total_fcfa)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${STATUS_COLORS[o.status] || "bg-gray-700 text-gray-300"}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-xs">{o.ip_country || "—"}</span>
                        {o.is_vpn && <AlertTriangle size={12} className="text-red-400" />}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">{formatDate(o.created_at)}</td>
                  </tr>
                ))}
                {orders.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-500">Aucune commande trouvée</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800">
              <span className="text-gray-500 text-xs">Page {page} / {totalPages}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded bg-[#1A1A1A] text-gray-400 hover:text-white disabled:opacity-30"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="p-1.5 rounded bg-[#1A1A1A] text-gray-400 hover:text-white disabled:opacity-30"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Order Detail Drawer */}
      {selectedOrder && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setSelectedOrder(null)} />
          <aside className="fixed right-0 top-0 h-full w-full max-w-[500px] bg-[#111] z-50 overflow-y-auto border-l border-gray-800 shadow-2xl">
            <div className="sticky top-0 bg-[#111] border-b border-gray-800 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="font-bold text-lg">Détail commande</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 rounded-lg hover:bg-gray-800 text-gray-400">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order ID + Status */}
              <div className="bg-[#0D6E6E]/10 border border-[#0D6E6E]/20 rounded-xl p-4">
                <div className="font-mono text-[#D4A843] text-sm font-bold mb-2">{selectedOrder.order_number}</div>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                    className="bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-[#0D6E6E] outline-none"
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span className="text-gray-500 text-xs">{formatDate(selectedOrder.created_at)}</span>
                </div>
              </div>

              {/* Customer */}
              <div>
                <h4 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-3">Client</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <User size={14} className="text-gray-500" />
                    <span className="text-sm font-medium">{selectedOrder.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={14} className="text-gray-500" />
                    <a href={`tel:${selectedOrder.phone}`} className="text-sm text-[#0D6E6E] hover:underline">
                      {selectedOrder.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-gray-500" />
                    <span className="text-sm">{selectedOrder.ip_country || "—"}</span>
                    {selectedOrder.is_vpn && (
                      <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <AlertTriangle size={10} /> VPN
                      </span>
                    )}
                    {selectedOrder.is_whitelisted && (
                      <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Shield size={10} /> Whitelist
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-3">Produits</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between bg-[#1A1A1A] rounded-xl p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#0D6E6E]/20 flex items-center justify-center text-[#0D6E6E] text-xs font-bold">
                          {(PRODUCT_NAMES[item.slug] || item.slug).slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{PRODUCT_NAMES[item.slug] || item.slug}</div>
                          <div className="text-[10px] text-gray-500">
                            {item.line_type === "upsell" ? "Upsell" : "Standard"} · ×{item.quantity}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-bold">{formatFCFA(item.unit_price_fcfa * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-[#1A1A1A] rounded-xl p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tier ({selectedOrder.tier_count} boîte{selectedOrder.tier_count > 1 ? "s" : ""})</span>
                    <span>{formatFCFA(selectedOrder.tier_base_fcfa)}</span>
                  </div>
                  {selectedOrder.upsell_accepted && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Upsell ({selectedOrder.upsell_sku})</span>
                      <span>{formatFCFA(selectedOrder.upsell_price_fcfa || 0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-[#D4A843] text-lg">{formatFCFA(selectedOrder.total_fcfa)}</span>
                  </div>
                </div>
              </div>

              {/* IP info */}
              <div>
                <h4 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-3">Informations IP</h4>
                <div className="bg-[#1A1A1A] rounded-xl p-3 text-xs font-mono text-gray-400 space-y-1">
                  <div>IP: {selectedOrder.ip_address || "—"}</div>
                  <div>Pays: {selectedOrder.ip_country || "—"}</div>
                  <div>Paiement: {selectedOrder.payment_method}</div>
                  <div>Locale: {selectedOrder.locale}</div>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
