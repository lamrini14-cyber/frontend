import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Star, ChevronDown, Shield, Clock, Calendar, Pill, CheckCircle2, ArrowRight } from "lucide-react";
import { PRODUCTS, getProduct, VALID_SLUGS } from "@/lib/products";
import { formatFCFA } from "@/lib/pricing";
import OfferSelector from "@/components/product/OfferSelector";
import ProductCard from "@/components/product/ProductCard";
import TrustBar from "@/components/cro/TrustBar";
import StickyCTA from "@/components/product/StickyCTA";

export function generateStaticParams() {
  const locales = ["fr", "wo", "en"];
  return locales.flatMap((locale) => VALID_SLUGS.map((slug) => ({ locale, slug })));
}

const HOW_TO_USE: Record<string, { when: string; time: string; tip: string }> = {
  "nuit-calm": {
    when: "Le soir, 30 minutes avant le coucher",
    time: "Entre 21h et 22h pour un sommeil optimal",
    tip: "Éteignez les écrans et prenez votre gummy avec un verre d\u2019eau tiède. Laissez l\u2019Ashwagandha KSM-66® calmer votre cortisol naturellement.",
  },
  "energie-vit": {
    when: "Le matin, au petit-déjeuner",
    time: "Entre 7h et 9h pour une énergie toute la journée",
    tip: "Prenez votre gummy avec votre petit-déjeuner. La Vitamine D3 et B12 sont mieux absorbées avec un repas.",
  },
  "confort-digest": {
    when: "Après votre repas principal",
    time: "Après le déjeuner ou le dîner",
    tip: "Prenez votre gummy juste après le repas le plus riche de la journée. Le gingembre et les probiotiques agissent directement sur la digestion.",
  },
};

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
  const howTo = HOW_TO_USE[slug] ?? HOW_TO_USE["nuit-calm"];

  return (
    <div>
      <TrustBar />

      {/* Hero section */}
      <section className="py-12 px-4 bg-[#F9F6F1]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Gallery */}
            <div className="space-y-4">
              <div
                className="w-full aspect-square rounded-3xl flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})` }}
              >
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Shield size={10} /> GMP Certifié
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    60 gummies
                  </span>
                </div>
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
                  { label: "Actifs cliniques", items: ingredients.map((i) => `${i.name} ${i.dose}`) },
                  { label: "Posologie", items: ["2 gummies / jour", "Cure 30 jours", "60 gummies / boîte"] },
                  { label: "Qualité", items: ["GMP Certifié", "COA disponible", "Zéro fillers"] },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="rounded-2xl flex flex-col items-center justify-center text-white text-center p-3 gap-2 border border-white/10"
                    style={{ background: `linear-gradient(135deg, ${product.gradientFrom}dd, ${product.gradientTo}dd)` }}
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
                <p className="text-[#0D6E6E] font-medium text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Shield size={14} />
                  {tp("wo_subtitle")}
                </p>
                <h1
                  className="text-4xl md:text-5xl font-bold mb-3"
                  style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                >
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-[#D4A843] fill-[#D4A843]" />
                    ))}
                  </div>
                  <span className="text-sm text-[#6B7280]">4.9 · 47 {t("reviews")}</span>
                  <span className="text-xs bg-[#0D6E6E]/10 text-[#0D6E6E] font-semibold px-2 py-0.5 rounded-full">60 gummies · Cure 30 jours</span>
                </div>
              </div>

              <blockquote className="border-l-4 border-[#0D6E6E] pl-4">
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
              style={{ background: `linear-gradient(135deg, ${product.gradientFrom}15, ${product.gradientTo}15)` }}
            />
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
                Vous reconnaissez-vous ?
              </h2>
              <ul className="space-y-4">
                {[tp("pain_1"), tp("pain_2"), tp("pain_3")].map((pain, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-50 text-[#C1121F] flex-shrink-0 flex items-center justify-center text-sm font-bold mt-0.5">
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
      <section className="py-16 px-4 bg-[#F9F6F1]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#0D6E6E] text-xs font-semibold tracking-widest uppercase mb-3">Le protocole</p>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
                {tp("solution_title")}
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-6">{tp("solution_desc")}</p>
              <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                <span className="flex items-center gap-1"><Shield size={14} className="text-[#0D6E6E]" /> {t("trust_gmp")}</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-[#0D6E6E]" /> COA disponible</span>
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
          <p className="text-[#0D6E6E] text-xs font-semibold tracking-widest uppercase text-center mb-3">Actifs cliniques</p>
          <h2
            className="text-3xl font-bold text-center mb-10"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {t("ingredients_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ingredients.map((ing) => (
              <div key={ing.name} className="bg-[#F9F6F1] rounded-2xl p-6 text-center border border-[#E8E0D8]">
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: product.gradientFrom + "15" }}
                >
                  <Pill size={20} style={{ color: product.gradientFrom }} />
                </div>
                <h3 className="font-bold text-sm mb-1">{ing.name}</h3>
                <p className="text-[#0D6E6E] font-bold text-xs mb-2">{ing.dose}</p>
                <p className="text-[#6B7280] text-xs">{ing.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO USE — new section */}
      <section className="py-16 px-4 bg-[#0D6E6E] text-white">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[#D4A843] text-xs font-semibold tracking-widest uppercase text-center mb-3">Posologie</p>
          <h2 className="text-3xl font-bold text-center mb-4" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            Mode d&apos;emploi — {product.name}
          </h2>
          <p className="text-white/60 text-center mb-10 text-sm">
            60 gummies par boîte · 2 gummies par jour · Cure complète de 30 jours
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 rounded-full bg-[#D4A843]/20 flex items-center justify-center mx-auto mb-4">
                <Clock size={22} className="text-[#D4A843]" />
              </div>
              <h3 className="font-bold text-base mb-2">Quand prendre</h3>
              <p className="text-white/70 text-sm">{howTo.when}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 rounded-full bg-[#D4A843]/20 flex items-center justify-center mx-auto mb-4">
                <Pill size={22} className="text-[#D4A843]" />
              </div>
              <h3 className="font-bold text-base mb-2">Dosage</h3>
              <p className="text-white/70 text-sm">2 gummies par jour.<br />Ne pas dépasser la dose recommandée.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 rounded-full bg-[#D4A843]/20 flex items-center justify-center mx-auto mb-4">
                <Calendar size={22} className="text-[#D4A843]" />
              </div>
              <h3 className="font-bold text-base mb-2">Durée de cure</h3>
              <p className="text-white/70 text-sm">30 jours minimum pour des résultats durables. 1 boîte = 1 cure complète.</p>
            </div>
          </div>

          {/* Tip card */}
          <div className="bg-white/5 border border-[#D4A843]/30 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D4A843]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[#D4A843] text-lg">💡</span>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1 text-[#D4A843]">Conseil de votre pharmacien naturel</h4>
              <p className="text-white/70 text-sm leading-relaxed">{howTo.tip}</p>
            </div>
          </div>

          {/* Progress timeline */}
          <div className="mt-10">
            <h3 className="font-bold text-center mb-6">Résultats attendus</h3>
            <div className="flex flex-col md:flex-row items-stretch gap-4">
              {[
                { week: "Semaine 1", result: "Premiers effets ressentis", pct: "25%" },
                { week: "Semaine 2", result: "Amélioration notable", pct: "50%" },
                { week: "Semaine 3", result: "Résultats consolidés", pct: "75%" },
                { week: "Semaine 4", result: "Cure complète — résultats durables", pct: "100%" },
              ].map(({ week, result, pct }, i) => (
                <div key={week} className="flex-1 bg-white/5 rounded-xl p-4 border border-white/10 relative">
                  <div className="text-[#D4A843] text-[10px] font-bold uppercase tracking-wide mb-1">{week}</div>
                  <p className="text-white/80 text-xs">{result}</p>
                  <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#D4A843] rounded-full" style={{ width: pct }} />
                  </div>
                  {i < 3 && <ArrowRight size={14} className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-white/30" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 px-4 bg-[#F9F6F1]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className="h-64 rounded-3xl flex items-center justify-center border border-[#E8E0D8]"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="text-center px-8">
                <div className="text-4xl mb-2">💊 → 🍬</div>
                <p className="text-[#6B7280] text-sm">De la pilule oubliée au gummy quotidien</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
                Pourquoi pas des pilules ?
              </h2>
              <div className="space-y-3">
                {[
                  { icon: "✗", text: "Pilules oubliées au fond du sac", color: "#C1121F" },
                  { icon: "✗", text: "Crèmes Facebook sans études cliniques", color: "#C1121F" },
                  { icon: "✓", text: "2 gummies SUNU YARAMA — un rituel agréable", color: "#0D6E6E" },
                  { icon: "✓", text: "Actifs dosés cliniquement + COA disponible", color: "#0D6E6E" },
                  { icon: "✓", text: "60 gummies = 30 jours de cure complète", color: "#0D6E6E" },
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
              { name: "Fatou D.", city: "Dakar", text: "Résultats visibles dès la première semaine. Qualité pharmaceutique, je recommande !" },
              { name: "Mariama S.", city: "Plateau", text: "COD = zéro risque. J\u2019ai reçu mes 60 gummies en 48h. La qualité m\u2019a surprise." },
            ].map(({ name, city, text }) => (
              <div key={name} className="bg-[#F9F6F1] rounded-2xl p-6 border border-[#E8E0D8]">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#D4A843] fill-[#D4A843]" />
                  ))}
                </div>
                <p className="text-sm text-[#1A1A1A] mb-3">&ldquo;{text}&rdquo;</p>
                <div className="text-xs text-[#6B7280]">{name} · {city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-[#F9F6F1]">
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
                  <ChevronDown size={16} className="flex-shrink-0 text-[#6B7280]" />
                </summary>
                <div className="px-6 pb-4 text-sm text-[#6B7280]">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-sells */}
      <section id="cross-sells" className="py-16 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#0D6E6E] text-xs font-semibold tracking-widest uppercase mb-3">Protocole recommandé</p>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              Complétez votre protocole
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto text-lg leading-relaxed">
              Combinez {product.name} avec nos autres formulations pour un protocole complet.
              {crossSells.length === 2 ? ` ${crossSells[0].name} + ${crossSells[1].name} = résultats optimaux.` : ""}
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
