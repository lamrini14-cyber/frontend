"use client";

import { useTranslations } from "next-intl";
import { X, Trash2, Plus } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import { formatFCFA, TIER_PRICES, savedAmount } from "@/lib/pricing";
import { PRODUCTS, getUpsellProduct } from "@/lib/products";
import CheckoutModal from "@/components/checkout/CheckoutModal";
import { useState, useEffect } from "react";

export default function CartDrawer({ locale }: { locale: string }) {
  const t = useTranslations("cart");
  const { items, isDrawerOpen, closeDrawer, removeItem, addItem, uniqueCount, tierTotal, uniqueSlugs } = useCartStore();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use 0/empty values during SSR/hydration to match server render perfectly
  const count = mounted ? uniqueCount() : 0;
  const total = mounted ? tierTotal() : 0;
  const slugs = mounted ? uniqueSlugs() : [];
  const saved = mounted ? savedAmount(count) : 0;
  // Make sure crossSells is empty during SSR to avoid DOM mismatch
  const crossSells = mounted ? PRODUCTS.filter((p) => !slugs.includes(p.slug)) : [];
  const drawerHint =
    count === 1
      ? t("tier_hint_1_to_2")
      : count === 2
      ? t("tier_hint_2_to_3")
      : null;

  if (!isDrawerOpen || !mounted) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <aside className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-[#FFFBF7] z-50 flex flex-col shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E0D8]">
          <h2 className="font-bold text-lg" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            {t("title")}
          </h2>
          <button onClick={closeDrawer} className="p-2 rounded-lg hover:bg-[#E8E0D8] transition-colors" aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-[#6B6B6B] text-center py-8">{t("empty")}</p>
          ) : (
            <>
              {items.map((item) => {
                const product = PRODUCTS.find((p) => p.slug === item.slug);
                return (
                  <div key={item.slug} className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm">
                    <div
                      className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-xs font-bold text-center"
                      style={{ background: `linear-gradient(135deg, ${product?.gradientFrom ?? "#C4652E"}, ${product?.gradientTo ?? "#1B4332"})` }}
                    >
                      {item.name.slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{item.name}</div>
                      <div className="text-[#6B6B6B] text-xs">540 FCFA / pièce</div>
                    </div>
                    <button
                      onClick={() => removeItem(item.slug)}
                      className="p-2 rounded-lg hover:bg-red-50 text-[#6B6B6B] hover:text-[#C1121F] transition-colors"
                      aria-label={`Retirer ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}

              {drawerHint && (
                <div className="bg-[#E8B84A]/10 border border-[#E8B84A]/30 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] text-center font-medium">
                  💡 {drawerHint}
                </div>
              )}

              {saved > 0 && (
                <div className="text-center text-sm text-[#2D6A4F] font-medium">
                  {t("saved")} {formatFCFA(saved)}
                </div>
              )}

              {crossSells.length > 0 && count < 3 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-[#6B6B6B] uppercase tracking-wide mb-3">
                    {t("cross_sells_title")}
                  </h3>
                  <div className="space-y-3">
                    {crossSells.map((p) => (
                      <div key={p.slug} className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm">
                        <div
                          className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}
                        >
                          {p.name.slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">{p.name}</div>
                          <div className="text-[#6B6B6B] text-xs">{p.woSubtitle}</div>
                        </div>
                        <button
                          onClick={() => addItem(p)}
                          className="flex items-center gap-1 bg-[#C4652E] text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-[#a3521f] transition-colors min-h-[36px]"
                        >
                          <Plus size={14} />
                          {t("add_cross_sell")}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="mt-4 space-y-2 text-xs text-[#6B6B6B] text-center">
            <div>✓ {t("trust_cod")}</div>
            <div>✓ {t("trust_delivery")}</div>
            <div>⚡ {t("trust_stock")}</div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-[#E8E0D8] bg-[#FFFBF7]">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-lg">{t("total")}</span>
            <span className="font-bold text-2xl text-[#C4652E]">{formatFCFA(total)}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={() => {
              if (items.length > 0) setCheckoutOpen(true);
            }}
            className="w-full bg-[#C4652E] text-white font-bold py-4 rounded-xl text-base hover:bg-[#a3521f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[56px]"
          >
            {t("checkout_cta")}
          </button>
        </div>
      </aside>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={() => {
          setCheckoutOpen(false);
          closeDrawer();
        }}
        locale={locale}
      />

      <style jsx global>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 300ms ease-out;
        }
      `}</style>
    </>
  );
}
