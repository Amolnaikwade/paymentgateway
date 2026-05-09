import { CardType } from "../types/payment";

// Detect card type using starting digits

export const detectCardType = (num: string): CardType => {
  if (/^4/.test(num)) return "visa";
  if (/^5[1-5]/.test(num)) return "mastercard";
  if (/^3[47]/.test(num)) return "amex";
  return "unknown";
};