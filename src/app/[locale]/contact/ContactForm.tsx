"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✓</div>
        <p className="text-[#2D6A4F] font-semibold">{t("form_success")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">{t("form_name")}</label>
        <input
          type="text"
          required
          className="w-full border border-[#E8E0D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4652E]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{t("form_phone")}</label>
        <input
          type="tel"
          className="w-full border border-[#E8E0D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4652E]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{t("form_message")}</label>
        <textarea
          required
          rows={5}
          className="w-full border border-[#E8E0D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4652E] resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#C4652E] text-white font-bold py-3 rounded-xl hover:bg-[#a3521f] transition-colors min-h-[48px]"
      >
        {t("form_submit")}
      </button>
    </form>
  );
}
