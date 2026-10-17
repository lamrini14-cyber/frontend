"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShoppingBag, TrendingUp, Eye, BarChart3, Users, Shield,
  LogOut, Package, DollarSign, ArrowUpRight, ArrowDownRight, RefreshCw,
} from "lucide-react";
import { fetchDashboard, isAuthenticated, clearToken } from "@/lib/admin-api";

const PRODUCT_NAMES: Record<string, string> = {
  "nuit-calm": "NuitCalm",
  "energie-vit": "ÉnergieVit",
  "confort-digest": "ConfortDigest",
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400",
  confirmed: "bg-yellow-500/20 text-yellow-400",
  shipped: "bg-purple-500/20 text-purple-400",
  delivered: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
  returned: "bg-gray-500/20 text-gray-400",
};

function formatFCFA(n: number): string {
  return n.toLocaleString("fr-FR") + " FCFA";
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const locale = typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "fr";

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push(`/${locale}/admin`);
      return;
    }
    loadData();
  }, [days]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const d = await fetchDashboard(days);
      setData(d);
    } catch (e: any) {
      setError(e.message);
      if (e.message === "Session expired") router.push(`/${locale}/admin`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearToken();
    router.push(`/${locale}/admin`);
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#0A1A1A] flex items-center justify-center">
        <RefreshCw size={24} className="text-[#0D6E6E] animate-spin" />
      </div>
    );
  }

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
              className="text-sm text-[#D4A843] font-medium flex items-center gap-1.5"
            >
              <BarChart3 size={14} /> Dashboard
            </Link>
            <Link
              href={`/${locale}/admin/orders`}
              className="text-sm text-gray-400 hover:text-white font-medium flex items-center gap-1.5"
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
        {/* Period selector */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              Tableau de bord
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {data?.period_start} → {data?.period_end}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[7, 14, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  days === d ? "bg-[#0D6E6E] text-white" : "bg-[#1A1A1A] text-gray-400 hover:text-white"
                }`}
              >
                {d}j
              </button>
            ))}
            <button onClick={loadData} className="p-1.5 rounded-lg bg-[#1A1A1A] text-gray-400 hover:text-white ml-2">
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {data && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Commandes", value: data.total_orders, icon: ShoppingBag, color: "#0D6E6E" },
                { label: "Revenu", value: formatFCFA(data.total_revenue_fcfa), icon: DollarSign, color: "#D4A843" },
                { label: "AOV", value: formatFCFA(data.avg_order_value), icon: TrendingUp, color: "#B8562A" },
                { label: "Taux conversion", value: `${data.conversion_rate}%`, icon: BarChart3, color: "#2D6A4F" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-[#111] border border-gray-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">{label}</span>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + "20" }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{value}</div>
                </div>
              ))}
            </div>

            {/* Row: Views + Geo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">
                <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4 flex items-center gap-2">
                  <Eye size={14} /> Visites valides (Sénégal)
                </h3>
                <div className="text-3xl font-bold text-[#0D6E6E]">{data.valid_page_views.toLocaleString()}</div>
                <p className="text-gray-500 text-xs mt-1">IP Sénégal, non-VPN uniquement</p>
              </div>

              <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">
                <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4 flex items-center gap-2">
                  <Shield size={14} /> Sécurité
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Commandes SN</span>
                    <span className="text-green-400 font-medium">{data.senegal_orders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Hors Sénégal</span>
                    <span className="text-yellow-400 font-medium">{data.non_senegal_attempts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">VPN bloqués</span>
                    <span className="text-red-400 font-medium">{data.vpn_blocked}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">
                <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4 flex items-center gap-2">
                  <Users size={14} /> Statuts
                </h3>
                <div className="space-y-2">
                  {Object.entries(data.orders_by_status).map(([s, count]) => (
                    <div key={s} className="flex items-center justify-between">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[s] || "bg-gray-700 text-gray-300"}`}>
                        {s}
                      </span>
                      <span className="text-white font-medium text-sm">{count as number}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row: Products + Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">
                <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4">Top Produits</h3>
                <div className="space-y-3">
                  {data.top_products.map((p: any) => (
                    <div key={p.slug} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#0D6E6E]/20 flex items-center justify-center text-[#0D6E6E] text-xs font-bold">
                          {(PRODUCT_NAMES[p.slug] || p.slug).slice(0, 2)}
                        </div>
                        <span className="text-sm font-medium">{PRODUCT_NAMES[p.slug] || p.slug}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{p.quantity} vendus</div>
                        <div className="text-xs text-gray-500">{p.orders} commandes</div>
                      </div>
                    </div>
                  ))}
                  {data.top_products.length === 0 && <p className="text-gray-500 text-sm">Aucune donnée</p>}
                </div>
              </div>

              <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">
                <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4">Répartition par tier</h3>
                <div className="space-y-3">
                  {[
                    { tier: "1", label: "1 boîte · Découverte", color: "#6B7280" },
                    { tier: "2", label: "2 boîtes · Recommandé", color: "#0D6E6E" },
                    { tier: "3", label: "3 boîtes · Protocole complet", color: "#D4A843" },
                  ].map(({ tier, label, color }) => {
                    const count = data.orders_by_tier[tier] || 0;
                    const pct = data.total_orders > 0 ? Math.round((count / data.total_orders) * 100) : 0;
                    return (
                      <div key={tier}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-400">{label}</span>
                          <span className="text-sm font-bold">{count} ({pct}%)</span>
                        </div>
                        <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Orders by day chart (simple bar) */}
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-5 mb-8">
              <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4">Commandes par jour</h3>
              {data.orders_by_day.length > 0 ? (
                <div className="flex items-end gap-1 h-32">
                  {data.orders_by_day.map((d: any) => {
                    const max = Math.max(...data.orders_by_day.map((x: any) => x.orders), 1);
                    const h = (d.orders / max) * 100;
                    return (
                      <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                        <div
                          className="w-full bg-[#0D6E6E] rounded-t hover:bg-[#D4A843] transition-colors min-h-[2px]"
                          style={{ height: `${Math.max(h, 2)}%` }}
                        />
                        <span className="text-[8px] text-gray-600 rotate-[-45deg] origin-top-left whitespace-nowrap">
                          {d.date.slice(5)}
                        </span>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-0.5 rounded hidden group-hover:block whitespace-nowrap shadow">
                          {d.date}: {d.orders} commandes
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Aucune commande sur cette période</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
