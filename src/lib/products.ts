export interface Ingredient {
  name: string;
  dose: string;
  benefit: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Product {
  slug: "nuit-calm" | "energie-vit" | "confort-digest";
  sku: string;
  name: string;
  nameFr: string;
  woSubtitle: string;
  headline: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "nuit-calm",
    sku: "SY-NC-001",
    name: "NuitCalm",
    nameFr: "NuitCalm — Sommeil & Sérénité",
    woSubtitle: "Sopi — ngëm ci guddi gi",
    headline: "Quand ta tête refuse de s'arrêter.",
    color: "#1B4332",
    gradientFrom: "#1B4332",
    gradientTo: "#2D6A4F",
  },
  {
    slug: "energie-vit",
    sku: "SY-EV-002",
    name: "ÉnergieVit",
    nameFr: "ÉnergieVit — Énergie & Vitalité",
    woSubtitle: "Kalaite — yaram bu fees",
    headline: "Fatigué(e) même avec le soleil.",
    color: "#C4652E",
    gradientFrom: "#C4652E",
    gradientTo: "#E8B84A",
  },
  {
    slug: "confort-digest",
    sku: "SY-CD-003",
    name: "ConfortDigest",
    nameFr: "ConfortDigest — Confort Digestif",
    woSubtitle: "Gox — goxu bu yomb",
    headline: "Ventre lourd après le thiéb.",
    color: "#7B4D2E",
    gradientFrom: "#7B4D2E",
    gradientTo: "#C4652E",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const VALID_SLUGS = PRODUCTS.map((p) => p.slug);

export const UPSELL_PRIORITY: Record<string, string> = {
  "nuit-calm": "energie-vit",
  "energie-vit": "nuit-calm",
  "confort-digest": "nuit-calm",
};

export function getUpsellProduct(cartSlugs: string[]): Product | undefined {
  if (cartSlugs.length === 0) return undefined;
  const inCart = new Set(cartSlugs);

  for (const slug of cartSlugs) {
    const suggested = UPSELL_PRIORITY[slug];
    if (suggested && !inCart.has(suggested)) {
      return getProduct(suggested);
    }
  }

  return PRODUCTS.find((p) => !inCart.has(p.slug));
}
