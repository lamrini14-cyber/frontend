"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useCartStore } from "@/lib/cart-store";
import { routing, localeLabels } from "@/i18n/routing";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { uniqueCount, openDrawer } = useCartStore();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const count = mounted ? uniqueCount() : 0;

  function switchLocalePath(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/") || `/${newLocale}`;
  }

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

        <div className="flex items-center gap-2">
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-[#E8E0D8] transition-colors text-sm font-medium text-[#1A1A1A]"
              aria-label="Change language"
            >
              <Globe size={16} />
              <span className="uppercase">{localeLabels[locale] ?? locale}</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-[#E8E0D8] rounded-lg shadow-lg overflow-hidden z-50 min-w-[100px]">
                {routing.locales.map((loc) => (
                  <Link
                    key={loc}
                    href={switchLocalePath(loc)}
                    onClick={() => setLangOpen(false)}
                    className={`block px-4 py-2 text-sm hover:bg-[#F5EDE4] transition-colors ${
                      loc === locale ? "font-bold text-[#C4652E]" : "text-[#1A1A1A]"
                    }`}
                  >
                    {localeLabels[loc]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={openDrawer}
            className="relative p-2 rounded-lg hover:bg-[#E8E0D8] transition-colors"
            aria-label={`Cart (${count})`}
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
