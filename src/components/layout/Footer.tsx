"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Footer({ locale }: { locale: string }) {
  const shopLinks = [
    { href: `/${locale}/collection`, label: "Collection" },
    { href: `/${locale}/products/nuit-calm`, label: "NuitCalm" },
    { href: `/${locale}/products/energie-vit`, label: "ÉnergieVit" },
    { href: `/${locale}/products/confort-digest`, label: "ConfortDigest" },
  ];

  const legalLinks = [
    { href: `/${locale}/legal/livraison`, label: "Livraison" },
    { href: `/${locale}/legal/retours`, label: "Retours" },
    { href: `/${locale}/legal/confidentialite`, label: "Confidentialité" },
    { href: `/${locale}/legal/conditions`, label: "Conditions" },
    { href: `/${locale}/legal/mentions-legales`, label: "Mentions légales" },
  ];

  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-[#1A1A1A] text-white mt-20">
      <div className="max-w-[1200px] mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: "#C4652E" }}
            >
              SY
            </div>
            <div>
              <div className="font-bold tracking-widest text-sm uppercase" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
                SUNU YARAMA
              </div>
              <div className="text-gray-400 text-[11px] lowercase">our body</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Le premier rituel gummy honnête pour le Sénégal. Trois problèmes. Trois solutions. Une confiance.
          </p>
        </div>

        <div className="border-t border-gray-800 md:border-t-0 md:pt-0">
          <button 
            className="w-full flex items-center justify-between py-4 md:py-0 md:mb-4 md:pointer-events-none group"
            onClick={() => toggleSection('boutique')}
            aria-expanded={openSection === 'boutique'}
          >
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#E8B84A]">Boutique</h3>
            <ChevronDown size={16} className={cn("text-gray-400 md:hidden transition-transform", openSection === 'boutique' && "rotate-180")} />
          </button>
          <ul className={cn(
            "space-y-3 pb-4 md:pb-0 overflow-hidden transition-all duration-300 md:!h-auto md:!opacity-100",
            openSection === 'boutique' ? "h-auto opacity-100" : "h-0 opacity-0 md:opacity-100"
          )}>
            {shopLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-800 md:border-t-0 md:pt-0">
          <button 
            className="w-full flex items-center justify-between py-4 md:py-0 md:mb-4 md:pointer-events-none group"
            onClick={() => toggleSection('legal')}
            aria-expanded={openSection === 'legal'}
          >
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#E8B84A]">Légal</h3>
            <ChevronDown size={16} className={cn("text-gray-400 md:hidden transition-transform", openSection === 'legal' && "rotate-180")} />
          </button>
          <ul className={cn(
            "space-y-3 pb-4 md:pb-0 overflow-hidden transition-all duration-300 md:!h-auto md:!opacity-100",
            openSection === 'legal' ? "h-auto opacity-100" : "h-0 opacity-0 md:opacity-100"
          )}>
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-800 md:border-t-0 md:pt-0">
          <button 
            className="w-full flex items-center justify-between py-4 md:py-0 md:mb-4 md:pointer-events-none group"
            onClick={() => toggleSection('confiance')}
            aria-expanded={openSection === 'confiance'}
          >
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#E8B84A]">Confiance</h3>
            <ChevronDown size={16} className={cn("text-gray-400 md:hidden transition-transform", openSection === 'confiance' && "rotate-180")} />
          </button>
          <ul className={cn(
            "space-y-3 pb-4 md:pb-0 overflow-hidden transition-all duration-300 md:!h-auto md:!opacity-100 text-sm text-gray-400",
            openSection === 'confiance' ? "h-auto opacity-100" : "h-0 opacity-0 md:opacity-100"
          )}>
            <li>✓ Paiement à la livraison</li>
            <li>✓ Certifié GMP</li>
            <li>✓ Livraison Dakar 48h</li>
            <li className="mt-4 pt-4 border-t border-gray-800 md:border-t-0 md:pt-0 md:mt-3">
              <a href="mailto:contact@sunuyaram.shop" className="hover:text-white transition-colors">
                contact@sunuyaram.shop
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-[1200px] mx-auto px-4 py-4 text-center text-gray-500 text-xs">
          © 2026 SUNU YARAMA · sunuyaram.shop
        </div>
      </div>
    </footer>
  );
}
