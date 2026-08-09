"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import type { Product } from "@/lib/products";
import { UPSELL_PRICE } from "@/lib/pricing";

const TIMER_SECONDS = 15;

interface Props {
  open: boolean;
  product: Product;
  onAccept: () => void;
  onDecline: () => void;
}

export default function UpsellModal({ open, product, onAccept, onDecline }: Props) {
  const t = useTranslations("upsell");
  const [seconds, setSeconds] = useState(TIMER_SECONDS);
  const declined = useRef(false);

  useEffect(() => {
    if (!open) {
      setSeconds(TIMER_SECONDS);
      declined.current = false;
      return;
    }

    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(interval);
          if (!declined.current) {
            declined.current = true;
            onDecline();
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open, onDecline]);

  if (!open) return null;

  const progress = (seconds / TIMER_SECONDS) * 100;
  const circumference = 2 * Math.PI * 20;
  const dash = (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 bg-black/70 z-[60] backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFBF7] rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-scale-in">
        <div
          className="h-2 transition-all duration-1000"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #C4652E, #E8B84A)",
          }}
        />

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg leading-tight" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              {t("title")}
            </h2>
            <div className="relative w-12 h-12 flex-shrink-0">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="#E8E0D8" strokeWidth="4" />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#C4652E"
                  strokeWidth="4"
                  strokeDasharray={`${dash} ${circumference}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[#C4652E]">
                {seconds}
              </span>
            </div>
          </div>

          <p className="text-sm text-[#6B6B6B]">{t("hook")}</p>

          <div
            className="rounded-2xl p-4 flex items-center gap-4"
            style={{ background: `linear-gradient(135deg, ${product.gradientFrom}15, ${product.gradientTo}15)` }}
          >
            <div
              className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-lg"
              style={{ background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})` }}
            >
              {product.name.slice(0, 2)}
            </div>
            <div>
              <div className="font-bold text-base">{product.name}</div>
              <div className="text-[#6B6B6B] text-xs">{product.woSubtitle}</div>
              <div className="text-[#C4652E] font-bold mt-1">{t("price")}</div>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <button
              onClick={onAccept}
              className="w-full bg-[#C4652E] text-white font-bold py-4 rounded-xl text-sm hover:bg-[#a3521f] transition-colors min-h-[52px]"
            >
              {t("accept_cta")}
            </button>
            <button
              onClick={() => {
                declined.current = true;
                onDecline();
              }}
              className="w-full text-[#6B6B6B] text-sm py-2 hover:text-[#1A1A1A] transition-colors"
            >
              {t("decline")}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 250ms ease-out;
        }
      `}</style>
    </div>
  );
}
