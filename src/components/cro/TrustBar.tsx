import { useTranslations } from "next-intl";
import { Shield } from "lucide-react";

export default function TrustBar() {
  const t = useTranslations("trust");

  return (
    <div className="bg-[#0D6E6E] text-white py-2 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-medium tracking-wide">
        <span className="flex items-center gap-1"><Shield size={12} className="text-[#D4A843]" /> GMP Certifié</span>
        <span className="text-[#D4A843]">·</span>
        <span>✓ {t("cod")}</span>
        <span className="text-[#D4A843]">·</span>
        <span>✓ {t("delivery")}</span>
        <span className="text-[#D4A843]">·</span>
        <span>{t("stars")}</span>
      </div>
    </div>
  );
}
