import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";

const LEGAL_SLUGS = ["livraison", "retours", "confidentialite", "conditions", "mentions-legales"] as const;
type LegalSlug = (typeof LEGAL_SLUGS)[number];

export function generateStaticParams() {
  const locales = ["fr", "wo"];
  return locales.flatMap((locale) => LEGAL_SLUGS.map((slug) => ({ locale, slug })));
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!LEGAL_SLUGS.includes(slug as LegalSlug)) notFound();

  const t = await getTranslations({ locale, namespace: `legal.${slug}` as "legal.livraison" });

  return (
    <div className="py-16 px-4">
      <div className="max-w-[800px] mx-auto">
        <Link
          href={`/${locale}`}
          className="text-[#C4652E] text-sm hover:underline mb-6 inline-block"
        >
          ← Accueil
        </Link>
        <h1
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
        >
          {t("title")}
        </h1>
        <div className="bg-white rounded-3xl p-8 shadow-sm prose prose-sm max-w-none">
          <p className="text-[#6B6B6B] leading-relaxed text-base">{t("content")}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {LEGAL_SLUGS.filter((s) => s !== slug).map((s) => (
            <Link
              key={s}
              href={`/${locale}/legal/${s}`}
              className="text-xs text-[#6B6B6B] hover:text-[#C4652E] border border-[#E8E0D8] rounded-lg px-3 py-2 transition-colors"
            >
              {s.replace(/-/g, " ")}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
