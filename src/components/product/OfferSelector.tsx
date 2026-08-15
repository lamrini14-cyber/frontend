"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { TIER_PRICES, formatFCFA, savedAmount, UNIT_DISPLAY_FCFA } from "@/lib/pricing";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";
import { v4 as uuidv4 } from "uuid";
import { trackAddToCart } from "@/lib/tracking/web-events";

interface Props {
  product: Product;
}

const OFFERS = [
  { count: 1, badge: "offer_1_badge", label: "offer_1_label" },
  { count: 2, badge: "offer_2_badge", label: "offer_2_label", popular: true },
  { count: 3, badge: "offer_3_badge", label: "offer_3_label" },
] as const;

export default function OfferSelector({ product }: Props) {
  const t = useTranslations("product");
  const tCart = useTranslations("cart");
  const [selected, setSelected] = useState(2);
  const [added, setAdded] = useState(false);
  const { addItem, openDrawer } = useCartStore();

  const handleAdd = () => {
    for (let i = 0; i < selected; i++) {
      addItem(product, 1);
    }
    const slugs = [product.slug];
    const eventId = uuidv4();
    trackAddToCart(slugs, TIER_PRICES[selected] ?? TIER_PRICES[1], eventId);
    setAdded(true);
    openDrawer();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {OFFERS.map((offer) => {
          const { count, badge, label } = offer;
          const popular = "popular" in offer && offer.popular;
          const price = TIER_PRICES[count];
          const saved = savedAmount(count);
          const isSelected = selected === count;

          return (
            <button
              key={count}
              onClick={() => setSelected(count)}
              className={cn(
                "relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all text-center",
                isSelected
                  ? "border-[#C4652E] bg-[#C4652E]/5 shadow-md"
                  : "border-[#E8E0D8] hover:border-[#C4652E]/50 bg-white"
              )}
            >
              {popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#2D6A4F] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap shadow-sm">
                  {t(badge)}
                </span>
              )}
              {!popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#F3F4F6] text-[#6B6B6B] text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap border border-[#E5E7EB]">
                  {t(badge)}
                </span>
              )}
              <span className="font-bold text-base mt-3">{t(label)}</span>
              <span className="font-bold text-[#C4652E] text-sm mt-1">{formatFCFA(price)}</span>
              {saved > 0 && (
                <span className="text-[10px] text-[#2D6A4F] mt-0.5">-{formatFCFA(saved)}</span>
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleAdd}
        className="w-full bg-[#C4652E] text-white font-bold py-4 rounded-xl text-base hover:bg-[#a3521f] transition-all min-h-[56px] active:scale-95"
      >
        {added ? tCart("added") : t("add_cta")}
      </button>

      <div className="flex justify-center gap-6 text-xs text-[#6B6B6B]">
        <span>✓ {t("trust_cod")}</span>
        <span>✓ {t("trust_gmp")}</span>
        <span>✓ {t("trust_delivery")}</span>
      </div>
    </div>
  );
}
