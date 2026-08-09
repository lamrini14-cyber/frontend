"use client";

import { useCartStore } from "@/lib/cart-store";
import { PRODUCTS } from "@/lib/products";
import { v4 as uuidv4 } from "uuid";
import { trackAddToCart } from "@/lib/tracking/web-events";
import { TIER_PRICES } from "@/lib/pricing";

export default function RitualButton({ locale, label }: { locale: string; label: string }) {
  const { addItem, openDrawer } = useCartStore();

  const handleRitual = () => {
    PRODUCTS.forEach((p) => addItem(p, 1));
    trackAddToCart(PRODUCTS.map((p) => p.slug), TIER_PRICES[3], uuidv4());
    openDrawer();
  };

  return (
    <button
      onClick={handleRitual}
      className="bg-[#C4652E] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#a3521f] transition-colors min-h-[48px]"
    >
      {label}
    </button>
  );
}
