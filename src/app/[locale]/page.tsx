import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Star, Zap, Moon, Leaf, ChevronDown, Shield, FlaskConical, Truck } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { formatFCFA } from "@/lib/pricing";
import ProductCard from "@/components/product/ProductCard";
import TrustBar from "@/components/cro/TrustBar";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const faqs = [
    {
      q: "Est-ce que les gummies remplacent les médicaments ?",
      a: "Non. Les gummies SUNU YARAMA sont des compléments alimentaires formulés avec des ingrédients dosés cliniquement. Ils ne remplacent pas un traitement médical prescrit."
    },
    {
      q: "Quelle est la qualité des ingrédients ?",
      a: "Tous nos actifs sont certifiés GMP (Good Manufacturing Practice), avec certificat d'analyse (COA) disponible. Chaque dose est conforme aux études cliniques publiées."
    },
    {
      q: "Comment est livré ma commande ?",
      a: "Livraison COD (paiement à la réception) à Dakar en 24–48h. Nous vous appelons sous 2h pour confirmer votre adresse."
    },
    {
      q: "Puis-je commander plusieurs produits ?",
      a: "Oui. Commandez 2 produits pour 43 000 FCFA ou le protocole complet (3 produits) pour 56 800 FCFA."
    },
    {
      q: "Y a-t-il des effets secondaires ?",
      a: "Nos ingrédients sont sélectionnés pour leur profil de sécurité clinique. En cas de traitement médical, consultez votre médecin ou pharmacien avant utilisation."
    },
    {
      q: "Que se passe-t-il si je ne suis pas satisfait ?",
      a: "Garantie 7 jours si le produit n'est pas ouvert. Contactez-nous à contact@sunuyaram.shop."
    },
  ];

  return (
    <div>
      <TrustBar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0D6E6E] to-[#0A5656] text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Shield size={14} className="text-[#D4A843]" />
              <span className="text-[#D4A843] font-medium text-xs tracking-widest uppercase">
                Certifié GMP · Dosages cliniques
              </span>
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              {t("hero_headline")}
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto md:mx-0">
              {t("hero_subhead")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href={`/${locale}/collection`}
                className="bg-[#B8562A] text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#9a4722] transition-colors min-h-[56px] flex items-center justify-center shadow-lg"
              >
                {t("hero_cta")}
              </Link>
              <div className="flex items-center justify-center gap-3 text-sm text-white/70">
                <span className="flex items-center gap-1"><Shield size={14} /> GMP</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Truck size={14} /> COD 48h</span>
                <span>·</span>
                <span>★ 4.9/5</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-[#D4A843]/15 shadow-[0_0_60px_rgba(212,168,67,0.3)]" />
              <div className="absolute inset-4 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <div className="text-center text-white">
                  <div
                    className="text-7xl md:text-8xl font-bold text-[#D4A843]"
                    style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
                  >
                    SY
                  </div>
                  <div className="text-base mt-2 opacity-80 tracking-widest uppercase text-xs">Sunu Yarama</div>
                  <div className="text-sm mt-3 opacity-60 border-t border-white/20 pt-3 mx-8">
                    La pharmacie naturelle<br />du Sénégal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Badges */}
      <section className="bg-[#F9F6F1] border-b border-[#E8E0D8] py-6 px-4">
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center gap-8 text-sm text-[#6B7280]">
          {[
            { icon: FlaskConical, text: "Dosages cliniques publiés" },
            { icon: Shield, text: "Certifié GMP international" },
            { icon: Star, text: "COA — Certificat d'analyse" },
            { icon: Truck, text: "COD — Paiement à la livraison" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon size={16} className="text-[#0D6E6E]" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Problems */}
      <section className="py-20 px-4 bg-[#F9F6F1]">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {t("problems_title")}
          </h2>
          <p className="text-[#6B7280] text-center mb-12 max-w-xl mx-auto">
            Trois symptômes fréquents au Sénégal. Trois protocoles naturels validés par la science.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Moon, color: "#1B4332", text: "Esprit agité le soir, impossible de dormir ?", product: "nuit-calm", label: "NuitCalm", active: "Ashwagandha KSM-66® · Mélatonine" },
              { icon: Zap, color: "#C4652E", text: "Fatigué(e) dès le matin malgré une nuit complète ?", product: "energie-vit", label: "ÉnergieVit", active: "Vitamine D3 · B12 · Ginseng" },
              { icon: Leaf, color: "#7B4D2E", text: "Ventre lourd et inconfortable après les repas ?", product: "confort-digest", label: "ConfortDigest", active: "Probiotiques · Gingembre" },
            ].map(({ icon: Icon, color, text, product, label, active }) => (
              <Link
                key={product}
                href={`/${locale}/products/${product}`}
                className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#E8E0D8]"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: color + "12" }}
                >
                  <Icon size={24} style={{ color }} />
                </div>
                <p className="text-[#1A1A1A] text-base mb-2 leading-relaxed text-center">{text}</p>
                <p className="text-[#6B7280] text-xs text-center mb-4">{active}</p>
                <div className="text-center">
                  <span
                    className="inline-block font-bold text-sm px-4 py-2 rounded-full text-white"
                    style={{ backgroundColor: color }}
                  >
                    → {label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Banner */}
      <section className="bg-[#0D6E6E] text-white py-16 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[#D4A843] text-xs font-semibold tracking-widest uppercase mb-4">Protocole recommandé</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            {t("offer_banner_title")}
          </h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[
              { count: 1, price: 23000, label: "1 produit", badge: "" },
              { count: 2, price: 43000, label: "2 produits", badge: "Recommandé" },
              { count: 3, price: 56800, label: "Protocole complet", badge: "Meilleur résultat" },
            ].map(({ count, price, label, badge }) => (
              <div key={count} className={`rounded-2xl p-4 text-center transition-colors ${badge === "Meilleur résultat" ? "bg-white/20 border border-[#D4A843]/50" : "bg-white/10 hover:bg-white/15"}`}>
                {badge && <div className="text-[#D4A843] text-[10px] font-bold uppercase mb-1">{badge}</div>}
                <div className="text-2xl font-bold text-[#D4A843]">{formatFCFA(price)}</div>
                <div className="text-sm text-white/70 mt-1">{label}</div>
              </div>
            ))}
          </div>
          <Link
            href={`/${locale}/collection`}
            className="inline-block mt-8 bg-[#B8562A] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#9a4722] transition-colors shadow-lg"
          >
            {t("final_cta")}
          </Link>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 px-4 bg-[#F9F6F1]">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[#0D6E6E] text-xs font-semibold tracking-widest uppercase text-center mb-3">Nos formulations</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            Trois protocoles. Trois résultats.
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
              { step: "01", title: t("how_1"), icon: "🧪" },
              { step: "02", title: t("how_2"), icon: "📦" },
              { step: "03", title: t("how_3"), icon: "✓" },
            ].map(({ step, title, icon }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#0D6E6E]/10 flex items-center justify-center mx-auto mb-4 text-2xl">{icon}</div>
                <div className="text-[#0D6E6E] font-bold text-sm mb-2">Étape {step}</div>
                <div className="font-semibold text-base">{title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-[#F9F6F1]">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {t("testimonials_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Fatou D.", city: "Dakar-Plateau", product: "NuitCalm", text: "Enfin des nuits sans réveil à 3h du matin. Mon pharmacien m'aurait prescrit un somnifère — ici c'est naturel et ça marche." },
              { name: "Moussa K.", city: "Parcelles Assainies", product: "ÉnergieVit", text: "Je conduis 10h par jour. Depuis ÉnergieVit, plus de coup de fatigue à 15h. C'est devenu mon complément quotidien." },
              { name: "Aissatou B.", city: "Sandaga", product: "ConfortDigest", text: "Après le thiéb du midi, plus de ballonnements. J'aurais aimé trouver ça en pharmacie — c'est la même qualité." },
            ].map(({ name, city, product, text }) => (
              <div key={name} className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E0D8]">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#D4A843] fill-[#D4A843]" />
                  ))}
                </div>
                <p className="text-[#1A1A1A] text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0D6E6E]/15 flex items-center justify-center text-[#0D6E6E] font-bold text-sm">
                    {name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{name}</div>
                    <div className="text-xs text-[#6B7280]">{city} · {product}</div>
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
                className="bg-[#F9F6F1] rounded-2xl border border-[#E8E0D8] group"
              >
                <summary className="px-6 py-4 cursor-pointer font-semibold text-sm flex items-center justify-between list-none">
                  {q}
                  <ChevronDown size={16} className="flex-shrink-0 text-[#6B7280] group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-sm text-[#6B7280] leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-[#0D6E6E] text-white text-center">
        <div className="max-w-[600px] mx-auto">
          <p className="text-[#D4A843] text-xs font-semibold tracking-widest uppercase mb-4">Votre santé, notre engagement</p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            Votre protocole vous attend.
          </h2>
          <p className="text-white/70 mb-8">
            3 formulations cliniques. Dosages transparents. Paiement uniquement à la livraison.
          </p>
          <Link
            href={`/${locale}/collection`}
            className="inline-block bg-[#B8562A] text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#9a4722] transition-colors shadow-lg"
          >
            {t("final_cta")}
          </Link>
        </div>
      </section>
    </div>
  );
}
