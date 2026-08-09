"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { uniqueCount, openDrawer } = useCartStore();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const count = mounted ? uniqueCount() : 0;

  const navLinks = [
    { href: `/${locale}/collection`, label: t("collection") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFBF7] border-b border-[#E8E0D8] shadow-sm">
      <div className="md:hidden bg-[#1B4332] text-white text-xs text-center py-1.5 tracking-wide">
        COD · Livraison 48h Dakar · ★ 4.9/5
      </div>

      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between relative">
        <Link href={`/${locale}`} className="flex items-center gap-3 relative z-10" aria-label="SUNU YARAMA — Accueil">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#38b000]/20 animate-pulse shadow-[0_0_20px_rgba(56,176,0,0.5)]" />
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 relative z-10"
              style={{ backgroundColor: "#C4652E", fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              SY
            </div>
          </div>
          <div className="leading-tight">
            <div
              className="text-[#1A1A1A] font-bold tracking-widest text-sm uppercase"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              SUNU YARAMA
            </div>
            <div className="text-[#6B6B6B] text-[11px] lowercase tracking-normal">our body</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#1A1A1A] text-sm font-medium hover:text-[#C4652E] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openDrawer}
            className="relative p-2 rounded-lg hover:bg-[#E8E0D8] transition-colors"
            aria-label={`Panier (${count} articles)`}
          >
            <ShoppingBag size={22} className="text-[#1A1A1A]" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C4652E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#E8E0D8] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-[#FFFBF7] border-t border-[#E8E0D8] px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#1A1A1A] text-base font-medium hover:text-[#C4652E]"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
