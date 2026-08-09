export const SENEGAL_PHONE_RE = /^0(7[05678]|33)\d{7}$/;

export function validateSenegalPhone(phone: string): boolean {
  return SENEGAL_PHONE_RE.test(phone.trim());
}

export function normalizePhone(phone: string): string {
  return phone.trim().replace(/[\s-]/g, "");
}
