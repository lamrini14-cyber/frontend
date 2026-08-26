import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "wo", "en"],
  defaultLocale: "fr",
});

export const localeLabels: Record<string, string> = {
  fr: "FR",
  wo: "WO",
  en: "EN",
};
