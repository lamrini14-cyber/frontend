"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, ShieldCheck, Phone } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useCartStore } from "@/lib/cart-store";
import { formatFCFA } from "@/lib/pricing";
import { PRODUCTS, getUpsellProduct } from "@/lib/products";
import { validateSenegalPhone, normalizePhone } from "@/lib/phone";
import { createOrder } from "@/lib/api";
import { getCookie, trackInitiateCheckout, trackPurchase } from "@/lib/tracking/web-events";
import UpsellModal from "./UpsellModal";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  locale: string;
}

const schema = z.object({
  name: z.string().min(2, "error_name"),
  phone: z.string().refine(validateSenegalPhone, "error_phone"),
  terms: z.boolean().refine((v) => v === true, "error_terms"),
  honeypot: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CheckoutModal({ open, onClose, onSuccess, locale }: Props) {
  const t = useTranslations("checkout");
  const router = useRouter();
  const { items, uniqueSlugs, tierTotal, clearCart } = useCartStore();
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [pendingFormData, setPendingFormData] = useState<FormValues | null>(null);
  const [eventId] = useState(() => uuidv4());

  const slugs = uniqueSlugs();
  const count = slugs.length;
  const total = tierTotal();
  const upsellProduct = getUpsellProduct(slugs);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (!open) return null;

  const doSubmit = async (data: FormValues, upsellAccepted: boolean, upsellSlug?: string) => {
    setLoading(true);
    setApiError(null);

    const phone = normalizePhone(data.phone);
    const trackingSlugs = upsellAccepted && upsellSlug ? [...slugs, upsellSlug] : slugs;
    const finalTotal = tierTotal() + (upsellAccepted ? 23000 : 0);

    try {
      const orderItems = items.map((i) => ({ slug: i.slug, quantity: i.quantity }));

      const result = await createOrder({
        customer_name: data.name,
        phone,
        locale,
        items: orderItems,
        upsell_accepted: upsellAccepted,
        upsell_slug: upsellAccepted ? upsellSlug : undefined,
        tracking: {
          event_id: eventId,
          fbp: getCookie("_fbp"),
          fbc: getCookie("_fbc"),
          ttp: getCookie("_ttp"),
          user_agent: navigator.userAgent,
          page_url: window.location.href,
        },
      });

      // Special handling if maxmind blocks the geo or VPN check via mocked api
      if (result.order_id === "error") {
        throw { error: result.order_number }; // Passing error code in order_number field for mocked API failures
      }

      trackPurchase(trackingSlugs, finalTotal, eventId, result.order_number);
      clearCart();
      onSuccess();
      router.push(`/${locale}/merci?order=${result.order_number}&total=${result.total_fcfa}`);
    } catch (err: unknown) {
      const e = err as { status?: number; error?: string; message?: string };
      const code = e?.error ?? "SERVER_ERROR";
      const msgKey =
        code === "IP_NOT_ALLOWED" ? "error_geo" :
        code === "VPN_DETECTED" ? "error_vpn" :
        code === "RATE_LIMIT" ? "error_rate" : "error_server";
      setApiError(t(msgKey as "error_geo"));
    } finally {
      setLoading(false);
    }
  };

  const onFormSubmit = (data: FormValues) => {
    trackInitiateCheckout(total, eventId);
    if (count < 3 && upsellProduct) {
      setPendingFormData(data);
      setUpsellOpen(true);
    } else {
      doSubmit(data, false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
        <div
          className="bg-[#FFFBF7] w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#E8E0D8]">
            <h2 className="font-bold text-lg" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              {t("title")}
            </h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#E8E0D8] transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="px-5 py-4 space-y-5">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-sm mb-3 text-[#6B6B6B] uppercase tracking-wide">{t("order_summary")}</h3>
              {items.map((item) => (
                <div key={item.slug} className="flex justify-between text-sm py-1">
                  <span>{item.name}</span>
                  <span className="text-[#6B6B6B]">{formatFCFA(23000)}</span>
                </div>
              ))}
              <div className="border-t border-[#E8E0D8] mt-2 pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-[#C4652E]">{formatFCFA(total)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#6B6B6B] bg-[#E8B84A]/10 rounded-xl px-4 py-3">
              <ShieldCheck size={16} className="text-[#E8B84A] flex-shrink-0" />
              <span>{t("reservation")}</span>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
              <input type="text" className="hidden" tabIndex={-1} {...register("honeypot")} />

              <div>
                <label className="block text-sm font-medium mb-1">{t("name_label")}</label>
                <input
                  type="text"
                  placeholder={t("name_placeholder")}
                  className="w-full border border-[#E8E0D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4652E] focus:border-transparent"
                  {...register("name")}
                />
                {errors.name && <p className="text-[#C1121F] text-xs mt-1">{t("error_name")}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t("phone_label")}</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
                  <input
                    type="tel"
                    placeholder={t("phone_placeholder")}
                    className="w-full border border-[#E8E0D8] rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4652E] focus:border-transparent"
                    {...register("phone")}
                  />
                </div>
                <p className="text-[#6B6B6B] text-xs mt-1">{t("phone_helper")}</p>
                {errors.phone && <p className="text-[#C1121F] text-xs mt-1">{t("error_phone")}</p>}
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-0.5 w-4 h-4 accent-[#C4652E]"
                  {...register("terms")}
                />
                <label htmlFor="terms" className="text-sm text-[#1A1A1A] cursor-pointer">
                  {t("terms_label")}
                </label>
              </div>
              {errors.terms && <p className="text-[#C1121F] text-xs">{t("error_terms")}</p>}

              {apiError && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-[#C1121F]">
                  {apiError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C4652E] text-white font-bold py-4 rounded-xl text-base hover:bg-[#a3521f] disabled:opacity-60 transition-colors min-h-[56px]"
              >
                {loading ? "Traitement…" : t("submit_cta")}
              </button>

              <p className="text-center text-xs text-[#6B6B6B] flex items-center justify-center gap-1">
                <Phone size={12} />
                {t("fine_print")}
              </p>
            </form>
          </div>
        </div>
      </div>

      {upsellProduct && pendingFormData && (
        <UpsellModal
          open={upsellOpen}
          product={upsellProduct}
          onAccept={() => {
            setUpsellOpen(false);
            doSubmit(pendingFormData, true, upsellProduct.slug);
          }}
          onDecline={() => {
            setUpsellOpen(false);
            doSubmit(pendingFormData, false);
          }}
        />
      )}
    </>
  );
}
