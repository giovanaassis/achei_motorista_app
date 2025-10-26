export function formatPhone(phone: string | number): string {
  if (!phone) return "";
  const digits = phone.toString().replace(/\D/g, "");

  const ddd = digits.slice(0, 2);
  const firstPart = digits.slice(2, 7);
  const lastPart = digits.slice(7, 11);
  return `(${ddd}) ${firstPart}-${lastPart}`;
}
