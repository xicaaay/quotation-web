import type { Product, ProductListResponse, ProductOptions, ProductPayload, ProductResponse, ProductSummary } from "../types/product";

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message: string, public status: number, public details?: unknown) { super(message); }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
    cache: "no-store",
  });
  if (response.status === 204) return undefined as T;
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const raw = payload?.message;
    const message = Array.isArray(raw) ? raw.join("\n") : raw || payload?.error || "Ocurrió un error al procesar la solicitud";
    throw new ApiError(message, response.status, payload);
  }
  return payload as T;
}

export const productsApi = {
  list(params: URLSearchParams) { return request<ProductListResponse>(`/products?${params.toString()}`); },
  get(id: string) { return request<ProductResponse>(`/products/${id}`); },
  summary() { return request<ProductSummary>("/products/summary"); },
  options() { return request<ProductOptions>("/products/options"); },
  catalog() { return request<Product[]>("/products/catalog"); },
  create(data: ProductPayload) { return request<ProductResponse>("/products", { method: "POST", body: JSON.stringify(data) }); },
  update(id: string, data: Partial<ProductPayload>) { return request<ProductResponse>(`/products/${id}`, { method: "PATCH", body: JSON.stringify(data) }); },
  status(id: string, isActive: boolean) { return request<ProductResponse>(`/products/${id}/status`, { method: "PATCH", body: JSON.stringify({ isActive }) }); },
  duplicate(id: string) { return request<ProductResponse>(`/products/${id}/duplicate`, { method: "POST" }); },
  remove(id: string) { return request<void>(`/products/${id}`, { method: "DELETE" }); },
  reorder(items: Array<{ id: string; displayOrder: number }>) { return request<{ message: string; updated: number }>("/products/reorder", { method: "PATCH", body: JSON.stringify({ items }) }); },
};
