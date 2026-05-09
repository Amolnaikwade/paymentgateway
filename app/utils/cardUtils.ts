// utils/cardUtils.ts

export type CardType = "visa" | "mastercard" | "amex" | "unknown";

/**
 * Detect card type from card number
 */
export const detectCardType = (cardNumber: string): CardType => {
  const cleaned = cardNumber.replace(/\s/g, "");

  if (/^4/.test(cleaned)) return "visa";

  if (/^5[1-5]/.test(cleaned)) return "mastercard";

  if (/^3[47]/.test(cleaned)) return "amex";

  return "unknown";
};