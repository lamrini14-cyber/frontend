"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatFCFA } from "@/lib/pricing";
import { useCartStore } from "@/lib/cart-store";
import { v4 as uuidv4 } from "uuid";
import { trackAddToCart } from "@/lib/tracking/web-events";
import { TIER_PRICES } from "@/lib/pricing";

interface Props {
  product: Product;
  locale: string;
  hideOffer?: boolean;
}

export default function ProductCard({ product, locale, hideOffer = false }: Props) {
  const t = useTranslations("product");
  const { addItem } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    const eventId = uuidv4();
    trackAddToCart([product.slug], TIER_PRICES[1], eventId);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
      <Link href={`/${locale}/products/${product.slug}`} className="block flex-shrink-0">
        <div
          className="h-52 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})` }}
        >
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              {product.name.slice(0, 1)}
            </div>
            <div className="text-lg font-semibold">{product.name}</div>
          </div>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="text-[#E8B84A] fill-[#E8B84A]" />
          ))}
          <span className="text-xs text-[#6B6B6B] ml-1">4.9 · 47 {t("reviews")}</span>
        </div>

        <Link href={`/${locale}/products/${product.slug}`}>
          <h3 className="font-bold text-lg mb-1 hover:text-[#C4652E] transition-colors" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            {product.name}
          </h3>
        </Link>

        <p className="text-[#6B6B6B] text-sm mb-3 italic">{product.woSubtitle}</p>
        <p className="text-sm text-[#1A1A1A] flex-1 mb-4">{product.headline}</p>

        {!hideOffer && (
          <div className="flex items-center gap-2 mb-4 mt-auto pt-4">
            <span className="text-[#C4652E] font-bold text-lg">{formatFCFA(540)}</span>
            <span className="text-[#6B6B6B] text-xs">/ pièce</span>
            <span className="bg-[#E8B84A] text-[#1A1A1A] text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto">
              ⭐ Populaire
            </span>
          </div>
        )}

        <button
          onClick={handleQuickAdd}
          className="w-full bg-[#C4652E] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#a3521f] transition-colors min-h-[48px] mt-auto"
        >
          {t("add_cta")}
        </button>
      </div>
    </div>
  );
}
