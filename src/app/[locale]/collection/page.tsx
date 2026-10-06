import { getTranslations } from "next-intl/server";
import { Shield, FlaskConical, Truck } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import TrustBar from "@/components/cro/TrustBar";
import RitualButton from "./RitualButton";

export default async function CollectionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "collection" });

  return (
    <div>
      <TrustBar />

      <section className="py-16 px-4 bg-[#F9F6F1]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#0D6E6E] text-xs font-semibold tracking-widest uppercase mb-3">Nos protocoles</p>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              {t("title")}
            </h1>
            <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
              Trois protocoles cliniques. Dosages transparents. Qualité pharmaceutique.
            </p>
          </div>

          {/* Ritual CTA banner */}
          <div className="bg-gradient-to-r from-[#0D6E6E] to-[#0A5656] text-white rounded-3xl p-8 mb-10 text-center">
            <p className="text-[#D4A843] text-xs font-semibold tracking-widest uppercase mb-2">Protocole complet recommandé</p>
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              Rituel complet — les 3 protocoles
            </h2>
            <p className="text-white/60 mb-4 text-sm">NuitCalm + ÉnergieVit + ConfortDigest</p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-white/40 line-through text-sm">3 × 23 000 FCFA</span>
              <span className="text-3xl font-bold text-[#D4A843]">56 800 FCFA</span>
              <span className="bg-[#D4A843] text-[#0A1A1A] text-xs font-bold px-2 py-1 rounded-full">
                -12 200 FCFA
              </span>
            </div>
            <RitualButton locale={locale} label={t("ritual_cta")} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} locale={locale} />
            ))}
          </div>

          <div className="mt-16 bg-white rounded-3xl p-8 border border-[#E8E0D8]">
            <h2
              className="text-2xl font-bold text-center mb-8"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              Pourquoi SUNU YARAMA ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { icon: FlaskConical, title: "Formulations cliniques", desc: "KSM-66®, Mélatonine, Probiotiques — actifs dosés selon les études publiées." },
                { icon: Truck, title: "COD Dakar 24–48h", desc: "Payez uniquement à la réception. Livraison rapide, zéro risque." },
                { icon: Shield, title: "Standards pharmaceutiques", desc: "GMP certifié, COA disponible. La même exigence que votre pharmacie." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0D6E6E]/10 flex items-center justify-center mx-auto mb-3">
                    <Icon size={22} className="text-[#0D6E6E]" />
                  </div>
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-[#6B7280] text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
