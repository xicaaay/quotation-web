export function formatMoney(value: number, currency = "USD") {
  try { return new Intl.NumberFormat("es-GT", { style: "currency", currency, maximumFractionDigits: 2 }).format(value); }
  catch { return `${currency} ${Number(value).toFixed(2)}`; }
}
export function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-GT", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
