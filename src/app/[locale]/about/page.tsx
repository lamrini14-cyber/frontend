import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Shield, FlaskConical, Eye, Heart } from "lucide-react";
import TrustBar from "@/components/cro/TrustBar";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div>
      <TrustBar />

      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <p className="text-[#0D6E6E] text-xs font-semibold tracking-widest uppercase mb-4">Notre engagement</p>
            <h1
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              La pharmacie naturelle<br />du Sénégal.
            </h1>
            <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
              Des formulations cliniques, des dosages transparents, une qualité pharmaceutique — accessible à tous.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: FlaskConical, title: "Science d\u2019abord", desc: "Chaque ingrédient est sélectionné sur la base d\u2019études cliniques publiées. Pas de tendances, pas de marketing — la science." },
              { icon: Shield, title: "Qualité GMP", desc: "Production certifiée GMP (Good Manufacturing Practice). Certificat d\u2019analyse disponible pour chaque lot." },
              { icon: Eye, title: "Transparence totale", desc: "Doses exactes affichées, pas de « mélanges propriétaires ». Vous savez ce que vous prenez et pourquoi." },
              { icon: Heart, title: "Fait pour le Sénégal", desc: "Formulé pour nos modes de vie — alimentation locale, climat, rythme urbain dakarois. Pas un copier-coller occidental." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-[#E8E0D8] shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#0D6E6E]/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#0D6E6E]" />
                </div>
                <h3 className="font-bold text-base mb-2">{title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div
              className="h-72 rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0D6E6E, #0A5656)" }}
            >
              <div className="text-center text-white">
                <div className="text-6xl font-bold text-[#D4A843]" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>SY</div>
                <div className="text-sm mt-2 opacity-70 tracking-widest uppercase">Est. 2026</div>
              </div>
            </div>
            <div>
              <p className="text-[#0D6E6E] text-xs font-semibold tracking-widest uppercase mb-3">Notre histoire</p>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
              >
                Pourquoi SUNU YARAMA existe
              </h2>
              <p className="text-[#6B7280] leading-relaxed text-lg">
                Le Sénégal méritait une marque de compléments alimentaires avec des standards pharmaceutiques — pas une crème miracle, pas un produit importé sans transparence. SUNU YARAMA, c&apos;est la rigueur d&apos;un laboratoire avec la proximité de votre pharmacien de quartier.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <p className="text-[#0D6E6E] text-xs font-semibold tracking-widest uppercase mb-3">Notre mission</p>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
              >
                Trois protocoles. Zéro compromis.
              </h2>
              <p className="text-[#6B7280] leading-relaxed text-lg">
                Sommeil, énergie, digestion — trois problèmes quotidiens que les Sénégalais urbains connaissent bien. Nos formulations ciblent chacun avec des actifs dosés cliniquement : KSM-66® pour le sommeil, D3+B12 pour l&apos;énergie, probiotiques pour la digestion.
              </p>
            </div>
            <div
              className="h-72 rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #B8562A, #D4A843)" }}
            >
              <div className="text-center text-white">
                <div className="text-5xl font-bold mb-2">3</div>
                <div className="text-sm opacity-80">Protocoles cliniques</div>
                <div className="text-xs mt-3 opacity-60 border-t border-white/20 pt-3 mx-8">
                  NuitCalm · ÉnergieVit · ConfortDigest
                </div>
              </div>
            </div>
          </div>

          {/* Quality */}
          <div className="bg-[#0D6E6E] text-white rounded-3xl p-12 text-center mb-20">
            <p className="text-[#D4A843] text-xs font-semibold tracking-widest uppercase mb-4">Standards pharmaceutiques</p>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              La qualité que votre corps mérite
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Production GMP certifiée, ingrédients traçables, certificats d&apos;analyse par lot, dosages conformes aux études cliniques. Pas de fillers, pas de sous-dosage.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                "GMP Certifié",
                "COA par lot",
                "Ingrédients traçables",
                "Dosages cliniques",
                "Zéro fillers",
              ].map((badge) => (
                <span
                  key={badge}
                  className="bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2"
                >
                  <Shield size={14} className="text-[#D4A843]" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href={`/${locale}/collection`}
              className="inline-block bg-[#B8562A] text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-[#9a4722] transition-colors shadow-lg"
            >
              Découvrir nos protocoles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
