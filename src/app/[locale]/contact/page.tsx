import { getTranslations } from "next-intl/server";
import TrustBar from "@/components/cro/TrustBar";
import ContactForm from "./ContactForm";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <div>
      <TrustBar />

      <section className="py-20 px-4">
        <div className="max-w-[800px] mx-auto">
          <h1
            className="text-4xl md:text-5xl font-bold text-center mb-12"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {t("title")}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: "📍", label: t("address") },
              { icon: "✉️", label: t("email"), href: `mailto:${t("email")}` },
              { icon: "🕐", label: t("hours") },
            ].map(({ icon, label, href }) => (
              <div key={label} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">{icon}</div>
                {href ? (
                  <a href={href} className="text-[#C4652E] hover:underline text-sm">
                    {label}
                  </a>
                ) : (
                  <p className="text-sm text-[#6B6B6B]">{label}</p>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>
    </div>
  );
}
