export function parsePrice(price: string | number): number {
  if (typeof price === "number") return price;
  return Number(price.replace(/[₹,]/g, ""));
}
