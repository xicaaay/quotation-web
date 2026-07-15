export type ProductArea = "DESIGN" | "DEVELOPMENT";
export type PricingType = "PER_UNIT" | "FIXED" | "RECURRING";
export type BillingPeriod = "ONE_TIME" | "MONTHLY" | "QUARTERLY" | "YEARLY";
export type DeliveryUnit = "BUSINESS_DAYS" | "CALENDAR_DAYS" | "WEEKS" | "MONTHS";

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string | null;
  area: ProductArea;
  pricingType: PricingType;
  basePrice: number;
  currency: string;
  unitName: string;
  billingPeriod: BillingPeriod;
  estimatedDeliveryValue: number | null;
  estimatedDeliveryUnit: DeliveryUnit | null;
  minimumQuantity: number;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductPayload {
  code: string;
  name: string;
  description?: string | null;
  area: ProductArea;
  pricingType: PricingType;
  basePrice: number;
  currency?: string;
  unitName?: string;
  billingPeriod?: BillingPeriod;
  estimatedDeliveryValue?: number | null;
  estimatedDeliveryUnit?: DeliveryUnit | null;
  minimumQuantity?: number;
  isActive?: boolean;
  displayOrder?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ProductListResponse { data: Product[]; pagination: PaginationMeta }
export type ProductResponse = Product

export interface ProductSummary {
  total?: number;
  active?: number;
  inactive?: number;
  design?: number;
  development?: number;
  totalProducts?: number;
  activeProducts?: number;
  inactiveProducts?: number;
  designProducts?: number;
  developmentProducts?: number;
  byArea?: { design?: number; development?: number };
  byPricingType?: { perUnit?: number; fixed?: number; recurring?: number };
  prices?: { minimum?: number | null; maximum?: number | null; average?: number | null; currency?: string };
  [key: string]: unknown;
}

export interface ProductOptions {
  areas?: Array<string | { value: string; label: string }>;
  pricingTypes?: Array<string | { value: string; label: string }>;
  billingPeriods?: Array<string | { value: string; label: string }>;
  deliveryUnits?: Array<string | { value: string; label: string }>;
  [key: string]: unknown;
}
