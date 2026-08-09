import { getTranslations } from "next-intl/server";
import { Star, Phone, Package, CreditCard } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { formatFCFA } from "@/lib/pricing";
import ProductCard from "@/components/product/ProductCard";
import MerciPixel from "./MerciPixel";

export default async function MerciPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ order?: string; total?: string }>;
}) {
  const { locale } = await params;
  const { order, total } = await searchParams;
  const t = await getTranslations({ locale, namespace: "merci" });

  const orderNumber = order ?? "SY-XXXXXXXX";
  const totalFcfa = parseInt(total ?? "0", 10);

  return (
    <div className="py-12 px-4">
      <div className="max-w-[800px] mx-auto space-y-8">

        {/* Confirmation */}
        <div className="bg-[#1B4332] text-white rounded-3xl p-8 text-center">
          <div className="text-5xl mb-4">✓</div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {t("title")}
          </h1>
          <p className="text-green-200">
            {t("order_id")} <span className="font-bold text-white">{orderNumber}</span>
          </p>
          {totalFcfa > 0 && (
            <p className="text-green-200 mt-2">
              {t("total_paid")}: <span className="font-bold text-[#E8B84A] text-xl">{formatFCFA(totalFcfa)}</span>
            </p>
          )}
        </div>

        {/* Steps */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {t("steps_title")}
          </h2>
          <div className="space-y-4">
            {[
              { icon: Phone, step: t("step_1") },
              { icon: Package, step: t("step_2") },
              { icon: CreditCard, step: t("step_3") },
            ].map(({ icon: Icon, step }, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#C4652E]/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[#C4652E]" />
                </div>
                <div>
                  <span className="text-[#6B6B6B] text-xs uppercase font-bold mr-2">Étape {i + 1}</span>
                  <span className="text-sm">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: t("stats_delivery"), label: "Livraison" },
            { value: t("stats_stars"), label: "Satisfaction" },
            { value: t("stats_city"), label: "Zone" },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <div className="font-bold text-[#C4652E] text-lg">{value}</div>
              <div className="text-xs text-[#6B6B6B]">{label}</div>
            </div>
          ))}
        </div>

        {/* Cross-sells */}
        <div>
          <h2
            className="text-2xl font-bold text-center mb-6"
            style={{ fontFamily: "DM Serif Display, Georgia, serif" }}
          >
            {t("cross_sells_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} />
            ))}
          </div>
        </div>
      </div>

      <MerciPixel orderNumber={orderNumber} />
    </div>
  );
}
