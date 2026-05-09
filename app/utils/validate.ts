import { CardType } from "../types/payment";

// Validate each field independently

export const validateCardNumber = (num: string) =>
  num.replace(/\s/g, "").length === 16;

export const validateCVV = (cvv: string, type: CardType) =>
  type === "amex" ? cvv.length === 4 : cvv.length === 3;

export const validateExpiry = (expiry: string) => {
  const [mm, yy] = expiry.split("/").map(Number);
  if (!mm || !yy) return false;

  const now = new Date();
  const year = 2000 + yy;

  return mm >= 1 && mm <= 12 && new Date(year, mm) > now;
};