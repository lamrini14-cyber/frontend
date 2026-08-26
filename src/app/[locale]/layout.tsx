import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import DeferredPixels from "@/components/tracking/DeferredPixels";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SUNU YARAMA — our body",
  description: "Gummies COD Sénégal — NuitCalm · ÉnergieVit · ConfortDigest. Livraison 48h Dakar.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "wo" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
      <body className="font-sans bg-[#FFFBF7] text-[#1A1A1A]">
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
          <CartDrawer locale={locale} />
          <DeferredPixels />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
