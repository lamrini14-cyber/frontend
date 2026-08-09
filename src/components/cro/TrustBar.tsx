import { useTranslations } from "next-intl";

export default function TrustBar() {
  const t = useTranslations("trust");

  return (
    <div className="bg-[#1B4332] text-white py-2 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-medium tracking-wide">
        <span>✓ {t("cod")}</span>
        <span className="text-[#E8B84A]">·</span>
        <span>✓ {t("delivery")}</span>
        <span className="text-[#E8B84A]">·</span>
        <span>{t("stars")}</span>
      </div>
    </div>
  );
}
