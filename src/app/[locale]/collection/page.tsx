import { getTranslations } from "next-intl/server";
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

      <section className="py-16 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              {t("title")}
            </h1>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">
              Trois problèmes quotidiens. Trois solutions scientifiques. Un rituel honnête.
            </p>
          </div>

          {/* Ritual CTA banner */}
          <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white rounded-3xl p-8 mb-10 text-center">
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              Rituel complet — les 3 gummies
            </h2>
            <p className="text-green-200 mb-4 text-sm">NuitCalm + ÉnergieVit + ConfortDigest</p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-green-400 line-through text-sm">3 × 23 000 FCFA</span>
              <span className="text-3xl font-bold text-[#E8B84A]">56 800 FCFA</span>
              <span className="bg-[#E8B84A] text-[#1A1A1A] text-xs font-bold px-2 py-1 rounded-full">
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

          <div className="mt-16 bg-white rounded-3xl p-8">
            <h2
              className="text-2xl font-bold text-center mb-8"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              Pourquoi SUNU YARAMA ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { icon: "🧪", title: "Ingrédients prouvés", desc: "KSM-66®, Mélatonine, Probiotiques — doses efficaces avec études PubMed." },
                { icon: "📦", title: "COD Dakar 48h", desc: "Payez uniquement à la réception. Livraison rapide sans risque." },
                { icon: "🇸🇳", title: "Fait pour le Sénégal", desc: "Conçu pour nos modes de vie — thiéb, soleil Dakar, rythme urbain." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="p-4">
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-[#6B6B6B] text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
