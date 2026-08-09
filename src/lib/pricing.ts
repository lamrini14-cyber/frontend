export const TIER_PRICES: Record<number, number> = {
  1: 540,
  2: 950,
  3: 1400,
};

export const UNIT_DISPLAY_FCFA = 540;
export const UPSELL_PRICE = 540;

export function computeTierTotal(uniqueSkuCount: number): number {
  return TIER_PRICES[uniqueSkuCount] ?? 0;
}

export function computeTotal(slugs: string[], upsellAccepted: boolean): number {
  const unique = new Set(slugs);
  const base = computeTierTotal(unique.size);
  return base + (upsellAccepted ? UPSELL_PRICE : 0);
}

export function formatFCFA(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

export function savedAmount(count: number): number {
  if (count <= 1) return 0;
  return UNIT_DISPLAY_FCFA * count - TIER_PRICES[count];
}
