// utils/dateUtils.ts

/**
 * Check if expiry date is valid and not in the past
 */
export const isExpiryValid = (expiry: string): boolean => {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;

  const [monthStr, yearStr] = expiry.split("/");

  const month = parseInt(monthStr, 10);
  const year = parseInt("20" + yearStr, 10);

  // Invalid month
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // Expired logic
  if (year < currentYear) return false;

  if (year === currentYear && month < currentMonth) return false;

  return true;
};