import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Star, Zap, Moon, Leaf, ChevronDown } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { formatFCFA } from "@/lib/pricing";
import ProductCard from "@/components/product/ProductCard";
import TrustBar from "@/components/cro/TrustBar";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tTrust = await getTranslations({ locale, namespace: "trust" });

  const faqs = [
    {
      q: "Est-ce que les gummies remplacent les médicaments ?",
      a: "Non. Les gummies SUNU YARAMA sont des compléments alimentaires. Ils contribuent au bien-être quotidien mais ne remplacent pas un traitement médical."
    },
    {
      q: "Comment est livré ma commande ?",
      a: "Livraison COD (paiement à la réception) à Dakar en 24–48h. Nous vous appelons sous 2h pour confirmer votre adresse."
    },
    {
      q: "Puis-je commander plusieurs produits ?",
      a: "Oui ! Commandez 2 produits pour 950 FCFA ou les 3 pour 1 400 FCFA. Notre rituel complet offre les meilleurs résultats."
    },
    {
      q: "Y a-t-il des effets secondaires ?",
      a: "Nos ingrédients sont sélectionnés pour leur sécurité. En cas de traitement médical, consultez votre médecin avant utilisation."
    },
    {
      q: "Que se passe-t-il si je ne suis pas satisfait ?",
      a: "Garantie 7 jours si le produit n'est pas ouvert. Contactez-nous à contact@sunuyaram.shop."
    },
    {
      q: "Les produits sont-ils disponibles hors Dakar ?",
      a: "Actuellement, livraison disponible à Dakar. Expansion vers d'autres régions prévue prochainement."
    },
  ];

  return (
    <div>
      <TrustBar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <p className="text-[#E8B84A] font-medium text-sm tracking-widest uppercase mb-4">
              Sunu yaram mooy sa kalaite.
            </p>
            <h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              {t("hero_headline")}
            </h1>
            <p className="text-lg text-green-100 mb-8 max-w-lg mx-auto md:mx-0">
              {t("hero_subhead")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href={`/${locale}/collection`}
                className="bg-[#C4652E] text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#a3521f] transition-colors min-h-[56px] flex items-center justify-center"
              >
                {t("hero_cta")}
              </Link>
              <div className="flex items-center justify-center gap-2 text-sm text-green-200">
                <span>✓ COD</span>
                <span>·</span>
                <span>✓ 48h Dakar</span>
                <span>·</span>
                <span>✓ 4.9★</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-[#38b000]/20 animate-pulse shadow-[0_0_60px_rgba(56,176,0,0.5)]" />
              <div className="absolute inset-4 rounded-full bg-[#38b000]/10 flex items-center justify-center backdrop-blur-sm border border-[#38b000]/30 shadow-[0_0_40px_rgba(56,176,0,0.4)]">
                <div className="text-center text-white">
                  <div
                    className="text-8xl font-bold text-[#E8B84A]"
                    style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                  >
                    SY
                  </div>
                  <div className="text-lg mt-2 opacity-80">our body</div>
                  <div className="text-sm mt-2 opacity-60">3 gummies · 3 problèmes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Problems */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {t("problems_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Moon, color: "#1B4332", text: "Esprit agité le soir, impossible de dormir ?", product: "nuit-calm", label: "NuitCalm" },
              { icon: Zap, color: "#C4652E", text: "Fatigué(e) dès le matin malgré une nuit complète ?", product: "energie-vit", label: "ÉnergieVit" },
              { icon: Leaf, color: "#7B4D2E", text: "Ventre lourd et inconfortable après les repas ?", product: "confort-digest", label: "ConfortDigest" },
            ].map(({ icon: Icon, color, text, product, label }) => (
              <Link
                key={product}
                href={`/${locale}/products/${product}`}
                className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: color + "15" }}
                >
                  <Icon size={28} style={{ color }} />
                </div>
                <p className="text-[#1A1A1A] text-base mb-3 leading-relaxed">{text}</p>
                <span
                  className="inline-block font-bold text-sm px-4 py-2 rounded-full text-white"
                  style={{ backgroundColor: color }}
                >
                  → {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Banner */}
      <section className="bg-[#1B4332] text-white py-16 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            {t("offer_banner_title")}
          </h2>
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {[
              { count: 1, price: 540, label: "1 pièce", badge: "" },
              { count: 2, price: 950, label: "2 pièces", badge: "⭐ Populaire" },
              { count: 3, price: 1400, label: "3 pièces", badge: "Rituel" },
            ].map(({ count, price, label, badge }) => (
              <div key={count} className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-colors">
                {badge && <div className="text-[#E8B84A] text-[10px] font-bold uppercase mb-1">{badge}</div>}
                <div className="text-2xl font-bold text-[#E8B84A]">{formatFCFA(price)}</div>
                <div className="text-sm text-green-200 mt-1">{label}</div>
              </div>
            ))}
          </div>
          <Link
            href={`/${locale}/collection`}
            className="inline-block mt-8 bg-[#C4652E] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#a3521f] transition-colors"
          >
            {t("final_cta")}
          </Link>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 px-4 bg-[#FFFBF7]">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            Nos trois gummies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {t("how_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: "01", title: t("how_1"), icon: "🍬" },
              { step: "02", title: t("how_2"), icon: "📦" },
              { step: "03", title: t("how_3"), icon: "✨" },
            ].map(({ step, title, icon }) => (
              <div key={step} className="text-center">
                <div className="text-4xl mb-4">{icon}</div>
                <div className="text-[#C4652E] font-bold text-sm mb-2">{step}</div>
                <div className="font-semibold text-base">{title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-[#FFFBF7]">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {t("testimonials_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Fatou D.", city: "Dakar-Plateau", product: "NuitCalm", text: "Enfin des nuits sans réveil à 3h du matin. J'arrive au bureau concentrée." },
              { name: "Moussa K.", city: "Parcelles Assainies", product: "ÉnergieVit", text: "Plus d'énergie pour mes 10h de conduite. Les gummies sont devenus mon rituel du matin." },
              { name: "Aissatou B.", city: "Sandaga", product: "ConfortDigest", text: "Après le thiéb du midi, plus de lourdeur. Mes clientes remarquent même que j'ai l'air plus légère !" },
            ].map(({ name, city, product, text }) => (
              <div key={name} className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#E8B84A] fill-[#E8B84A]" />
                  ))}
                </div>
                <p className="text-[#1A1A1A] text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C4652E]/20 flex items-center justify-center text-[#C4652E] font-bold text-sm">
                    {name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{name}</div>
                    <div className="text-xs text-[#6B6B6B]">{city} · {product}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {t("faq_title")}
          </h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="bg-[#FFFBF7] rounded-2xl border border-[#E8E0D8] group"
              >
                <summary className="px-6 py-4 cursor-pointer font-semibold text-sm flex items-center justify-between list-none">
                  {q}
                  <ChevronDown size={16} className="flex-shrink-0 text-[#6B6B6B] group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-sm text-[#6B6B6B] leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-[#C4652E] text-white text-center">
        <div className="max-w-[600px] mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            Votre rituel vous attend.
          </h2>
          <p className="text-orange-100 mb-8">
            3 gummies. 3 problèmes résolus. Paiement uniquement à la livraison.
          </p>
          <Link
            href={`/${locale}/collection`}
            className="inline-block bg-white text-[#C4652E] font-bold px-8 py-4 rounded-xl text-lg hover:bg-orange-50 transition-colors"
          >
            {t("final_cta")}
          </Link>
        </div>
      </section>
    </div>
  );
}
