import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SUNU YARAMA — our body",
  description: "Le premier rituel gummy honnête pour le Sénégal. NuitCalm · ÉnergieVit · ConfortDigest. Paiement à la livraison.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Return just the children here, since [locale]/layout.tsx is the real layout
  return children;
}
