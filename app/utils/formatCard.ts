// Auto format card number (4242 4242 4242 4242)

export const formatCardNumber = (value: string) => {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
};