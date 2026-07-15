import type { BillingPeriod, DeliveryUnit, PricingType, ProductArea } from "../types/product";

export const AREA_LABELS: Record<ProductArea, string> = { DESIGN: "Diseño", DEVELOPMENT: "Desarrollo" };
export const PRICING_LABELS: Record<PricingType, string> = { PER_UNIT: "Por unidad", FIXED: "Precio fijo", RECURRING: "Recurrente" };
export const BILLING_LABELS: Record<BillingPeriod, string> = { ONE_TIME: "Pago único", MONTHLY: "Mensual", QUARTERLY: "Trimestral", YEARLY: "Anual" };
export const DELIVERY_LABELS: Record<DeliveryUnit, string> = { BUSINESS_DAYS: "Días hábiles", CALENDAR_DAYS: "Días calendario", WEEKS: "Semanas", MONTHS: "Meses" };
