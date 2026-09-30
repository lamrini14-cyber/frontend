export const TIER_PRICES: Record<number, number> = {
  1: 23000,
  2: 43000,
  3: 56800,
};

export const UNIT_DISPLAY_FCFA = 23000;
export const UPSELL_PRICE = 23000;

export function computeTierTotal(totalItems: number): number {
  if (totalItems === 0) return 0;
  const bundlesOf3 = Math.floor(totalItems / 3);
  const remainder = totalItems % 3;
  
  const bundlePrice = bundlesOf3 * (TIER_PRICES[3] ?? 0);
  const remainderPrice = remainder > 0 ? (TIER_PRICES[remainder] ?? 0) : 0;
  
  return bundlePrice + remainderPrice;
}

export function computeTotal(slugs: string[], upsellAccepted: boolean): number {
  const totalItems = slugs.length;
  const base = computeTierTotal(totalItems);
  return base + (upsellAccepted ? UPSELL_PRICE : 0);
}

export function formatFCFA(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

export function savedAmount(totalItems: number): number {
  if (totalItems <= 1) return 0;
  return UNIT_DISPLAY_FCFA * totalItems - computeTierTotal(totalItems);
}
