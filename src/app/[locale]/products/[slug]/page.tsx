import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Star, ChevronDown, ExternalLink } from "lucide-react";
import { PRODUCTS, getProduct, VALID_SLUGS } from "@/lib/products";
import { formatFCFA } from "@/lib/pricing";
import OfferSelector from "@/components/product/OfferSelector";
import ProductCard from "@/components/product/ProductCard";
import TrustBar from "@/components/cro/TrustBar";
import StickyCTA from "@/components/product/StickyCTA";

export function generateStaticParams() {
  const locales = ["fr", "wo"];
  return locales.flatMap((locale) => VALID_SLUGS.map((slug) => ({ locale, slug })));
}

export default async function PDPPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const t = await getTranslations({ locale, namespace: "product" });
  const tp = await getTranslations({ locale, namespace: `products_data.${slug}` as "products_data.nuit-calm" });

  const crossSells = PRODUCTS.filter((p) => p.slug !== slug);

  const ingredients = JSON.parse(JSON.stringify(tp.raw("ingredients"))) as Array<{ name: string; dose: string; benefit: string }>;
  const faqItems = JSON.parse(JSON.stringify(tp.raw("faq"))) as Array<{ q: string; a: string }>;

  return (
    <div>
      <TrustBar />

      {/* Hero section */}
      <section className="py-12 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Gallery */}
            <div className="space-y-4">
              <div
                className="w-full aspect-square rounded-3xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})` }}
              >
                <div className="text-center text-white">
                  <div
                    className="text-7xl font-bold mb-4"
                    style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                  >
                    {product.name.slice(0, 1)}
                  </div>
                  <div className="text-2xl font-semibold">{product.name}</div>
                  <div className="text-sm opacity-80 mt-2">{tp("wo_subtitle")}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Ingrédients", items: ingredients.map((i) => i.name) },
                  { label: "Mode d'emploi", items: ["1 gummy / jour", "Cure 30 jours", "Résultats durables"] },
                  { label: "Certification", items: ["GMP Certifié", "Études PubMed", "Zéro fillers"] },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-2xl flex flex-col items-center justify-center text-white text-center p-3 gap-2"
                    style={{ background: `linear-gradient(135deg, ${product.gradientFrom}cc, ${product.gradientTo}cc)` }}
                  >
                    <span className="text-xs font-bold uppercase tracking-wide border-b border-white/30 pb-1 w-full">{card.label}</span>
                    <ul className="text-[10px] leading-relaxed opacity-90 space-y-0.5">
                      {card.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div id="product-info" className="space-y-6">
              <div>
                <p className="text-[#C4652E] font-medium text-sm uppercase tracking-widest mb-2">
                  {tp("wo_subtitle")}
                </p>
                <h1
                  className="text-4xl md:text-5xl font-bold mb-3"
                  style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                >
                  {product.name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-[#E8B84A] fill-[#E8B84A]" />
                    ))}
                  </div>
                  <span className="text-sm text-[#6B6B6B]">4.9 · 47 {t("reviews")}</span>
                </div>
              </div>

              <blockquote className="border-l-4 border-[#C4652E] pl-4">
                <p
                  className="text-xl italic text-[#1A1A1A]"
                  style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                >
                  &ldquo;{tp("headline")}&rdquo;
                </p>
              </blockquote>

              <div id="offer-section">
                <OfferSelector product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className="h-64 md:h-80 rounded-3xl"
              style={{ background: `linear-gradient(135deg, ${product.gradientFrom}20, ${product.gradientTo}20)` }}
            />
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
                Vous reconnaissez-vous ?
              </h2>
              <ul className="space-y-4">
                {[tp("pain_1"), tp("pain_2"), tp("pain_3")].map((pain, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#C1121F]/10 text-[#C1121F] flex-shrink-0 flex items-center justify-center text-sm font-bold mt-0.5">
                      ✗
                    </span>
                    <span className="text-[#1A1A1A]">{pain}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 px-4 bg-[#FFFBF7]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
                {tp("solution_title")}
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">{tp("solution_desc")}</p>
              <div className="flex items-center gap-3 text-sm text-[#6B6B6B]">
                <span>✓ {t("trust_cod")}</span>
                <span>·</span>
                <span>✓ {t("trust_gmp")}</span>
              </div>
            </div>
            <div
              className="h-64 md:h-80 rounded-3xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})` }}
            >
              <div className="text-white text-center">
                <div className="text-5xl font-bold mb-2" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
                  ✓
                </div>
                <div className="text-lg">{tp("solution_title")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-10"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {t("ingredients_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ingredients.map((ing) => (
              <div key={ing.name} className="bg-[#FFFBF7] rounded-2xl p-6 text-center shadow-sm">
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: product.gradientFrom + "20" }}
                >
                  <span className="text-xl">🌿</span>
                </div>
                <h3 className="font-bold text-sm mb-1">{ing.name}</h3>
                <p className="text-[#C4652E] font-semibold text-xs mb-2">{ing.dose}</p>
                <p className="text-[#6B6B6B] text-xs">{ing.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="py-16 px-4 bg-[#1B4332] text-white">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            {t("how_to_use")}
          </h2>
          <p className="text-green-200 text-lg">{t("how_to_use_desc")}</p>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 px-4 bg-[#FFFBF7]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className="h-64 rounded-3xl flex items-center justify-center"
              style={{ backgroundColor: "#E8E0D8" }}
            >
              <span className="text-[#6B6B6B]">Illustration comparaison</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
                Pourquoi pas des pilules ?
              </h2>
              <div className="space-y-3">
                {[
                  { icon: "✗", text: "Pilules oubliées au fond du sac", color: "#C1121F" },
                  { icon: "✗", text: "Crèmes Facebook sans études", color: "#C1121F" },
                  { icon: "✓", text: "Gummy SUNU YARAMA — rituel agréable", color: "#2D6A4F" },
                  { icon: "✓", text: "Ingrédients vérifiables + études PubMed", color: "#2D6A4F" },
                  { icon: "✓", text: "COD — aucun risque financier", color: "#2D6A4F" },
                ].map(({ icon, text, color }) => (
                  <div key={text} className="flex items-center gap-3">
                    <span style={{ color }} className="font-bold text-lg w-6">{icon}</span>
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-10"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {t("testimonials_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { name: "Fatou D.", city: "Dakar", text: "Résultats visibles dès la première semaine. Je recommande !" },
              { name: "Mariama S.", city: "Plateau", text: "COD = zéro risque. La qualité m'a surprise." },
            ].map(({ name, city, text }) => (
              <div key={name} className="bg-[#FFFBF7] rounded-2xl p-6 shadow-sm">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#E8B84A] fill-[#E8B84A]" />
                  ))}
                </div>
                <p className="text-sm text-[#1A1A1A] mb-3">&ldquo;{text}&rdquo;</p>
                <div className="text-xs text-[#6B6B6B]">{name} · {city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-[#FFFBF7]">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-10"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {t("faq_title")}
          </h2>
          <div className="space-y-3">
            {faqItems.map(({ q, a }) => (
              <details key={q} className="bg-white rounded-2xl border border-[#E8E0D8]">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-sm flex items-center justify-between list-none">
                  {q}
                  <ChevronDown size={16} className="flex-shrink-0 text-[#6B6B6B]" />
                </summary>
                <div className="px-6 pb-4 text-sm text-[#6B6B6B]">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-sells */}
      <section id="cross-sells" className="py-16 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              Complétez votre rituel
            </h2>
            <p className="text-[#6B6B6B] max-w-xl mx-auto text-lg leading-relaxed">
              Pour une harmonie totale du corps, associez {product.name} avec nos autres gummies ciblés. 
              {crossSells.length === 2 ? ` Profitez des bienfaits de ${crossSells[0].name} et ${crossSells[1].name} pour un équilibre parfait au quotidien.` : ""}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {crossSells.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} hideOffer />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA (Desktop + Mobile) */}
      <StickyCTA product={product} />
      <div className="h-24 md:h-28" />
    </div>
  );
}
