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
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  uniqueSlugs: () => string[];
  tierTotal: () => number;
  totalWithUpsell: (upsellAccepted: boolean) => number;
  uniqueCount: () => number;
  totalCount: () => number;
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
            return {
              items: state.items.map((i) =>
                i.slug === product.slug ? { ...i, quantity: Math.min(10, i.quantity + quantity) } : i
              ),
              isDrawerOpen: true,
            };
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

      updateQuantity: (slug, quantity) => {
        set((state) => ({
          items: state.items.map((i) => (i.slug === slug ? { ...i, quantity } : i)),
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

      totalCount: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.quantity, 0);
      },

      tierTotal: () => {
        const count = get().totalCount();
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
