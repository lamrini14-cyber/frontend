"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { Product } from "@/lib/products";
import { formatFCFA, TIER_PRICES } from "@/lib/pricing";

interface Props {
  product: Product;
}

export default function StickyCTA({ product }: Props) {
  const t = useTranslations("product");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the product info section
      const productInfo = document.getElementById("product-info");
      if (productInfo) {
        const rect = productInfo.getBoundingClientRect();
        // Show sticky CTA when the bottom of the product info section scrolls out of view
        setIsVisible(rect.bottom < 0);
      } else {
        // Fallback: show after 600px scroll
        setIsVisible(window.scrollY > 600);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check immediately
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToOffer = () => {
    const productInfo = document.getElementById("product-info");
    if (productInfo) {
      // Scroll to product info section
      productInfo.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FFFBF7] border-t border-[#E8E0D8] p-3 md:p-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-40 animate-slide-up">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
        <div className="hidden md:flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold"
            style={{ background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`, fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {product.name.slice(0, 1)}
          </div>
          <div>
            <div className="font-bold text-lg" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>{product.name}</div>
            <div className="text-sm text-[#6B6B6B]">À partir de {formatFCFA(TIER_PRICES[1])}</div>
          </div>
        </div>
        
        <button
          onClick={scrollToOffer}
          className="w-full md:w-auto md:px-12 bg-[#C4652E] text-white font-bold py-3 md:py-4 rounded-xl text-sm md:text-base hover:bg-[#a3521f] transition-all shadow-lg"
        >
          Voir les offres
        </button>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 300ms ease-out forwards;
        }
      `}</style>
    </div>
  );
}
