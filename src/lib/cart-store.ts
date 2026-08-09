"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TIER_PRICES, computeTierTotal, UPSELL_PRICE } from "./pricing";
import type { Product } from "./products";

export interface CartItem {
  slug: string;
  name: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  uniqueSlugs: () => string[];
  tierTotal: () => number;
  totalWithUpsell: (upsellAccepted: boolean) => number;
  uniqueCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.slug === product.slug);
          if (existing) {
            return state;
          }
          return {
            items: [...state.items, { slug: product.slug, name: product.name, quantity }],
            isDrawerOpen: true,
          };
        });
      },

      removeItem: (slug) => {
        set((state) => ({
          items: state.items.filter((i) => i.slug !== slug),
        }));
      },

      clearCart: () => set({ items: [] }),

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      uniqueSlugs: () => {
        const { items } = get();
        return [...new Set(items.map((i) => i.slug))];
      },

      uniqueCount: () => {
        const { items } = get();
        return new Set(items.map((i) => i.slug)).size;
      },

      tierTotal: () => {
        const count = get().uniqueCount();
        return computeTierTotal(count);
      },

      totalWithUpsell: (upsellAccepted: boolean) => {
        const base = get().tierTotal();
        return base + (upsellAccepted ? UPSELL_PRICE : 0);
      },
    }),
    {
      name: "sunuyaram-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
