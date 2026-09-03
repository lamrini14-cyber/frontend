import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["wo", "fr", "en"],
  defaultLocale: "fr",
});

export const localeLabels: Record<string, string> = {
  fr: "FR",
  wo: "WO",
  en: "EN",
};
