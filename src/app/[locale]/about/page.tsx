import { getTranslations } from "next-intl/server";
import Link from "next/link";
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
            <h1
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              {t("hero")}
            </h1>
          </div>

          {/* Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div
              className="h-72 rounded-3xl"
              style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)" }}
            />
            <div>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
              >
                {t("story_title")}
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed text-lg">{t("story")}</p>
            </div>
          </div>

          {/* Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
              >
                {t("mission_title")}
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed text-lg">{t("mission")}</p>
            </div>
            <div
              className="h-72 rounded-3xl"
              style={{ background: "linear-gradient(135deg, #C4652E, #E8B84A)" }}
            />
          </div>

          {/* Quality */}
          <div className="bg-[#1B4332] text-white rounded-3xl p-12 text-center mb-20">
            <h2
              className="text-3xl font-bold mb-6"
              style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
            >
              {t("quality_title")}
            </h2>
            <p className="text-green-200 text-lg max-w-2xl mx-auto">{t("quality")}</p>

            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {["✓ GMP Certifié", "✓ Ingrédients traçables", "✓ COA disponible", "✓ Doses efficaces"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href={`/${locale}/collection`}
              className="inline-block bg-[#C4652E] text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-[#a3521f] transition-colors"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
