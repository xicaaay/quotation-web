"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import type { BillingPeriod, DeliveryUnit, PricingType, Product, ProductArea, ProductPayload } from "../types/product";
import { BILLING_LABELS, DELIVERY_LABELS, PRICING_LABELS, AREA_LABELS } from "../lib/constants";

const initial: ProductPayload = { code:"", name:"", description:"", area:"DESIGN", pricingType:"PER_UNIT", basePrice:0, currency:"USD", unitName:"servicio", billingPeriod:"ONE_TIME", estimatedDeliveryValue:null, estimatedDeliveryUnit:null, minimumQuantity:1, isActive:true, displayOrder:0 };
export function ProductForm({ product, submitting, onSubmit }: { product?:Product; submitting:boolean; onSubmit:(payload:ProductPayload)=>void }) {
 const [form,setForm]=useState<ProductPayload>(initial);
 useEffect(()=>{if(product)setForm({ ...product, description:product.description??"", estimatedDeliveryValue:product.estimatedDeliveryValue, estimatedDeliveryUnit:product.estimatedDeliveryUnit });},[product]);
 const set = <K extends keyof ProductPayload>(key:K,value:ProductPayload[K])=>setForm(v=>({...v,[key]:value}));
 const submit=(e:React.FormEvent)=>{e.preventDefault(); onSubmit({...form,code:form.code.trim().toUpperCase(),name:form.name.trim(),currency:(form.currency||"USD").trim().toUpperCase(),description:form.description?.trim()||null,estimatedDeliveryValue:form.estimatedDeliveryValue||null,estimatedDeliveryUnit:form.estimatedDeliveryValue?form.estimatedDeliveryUnit:null});};
 return <form onSubmit={submit} className="form-layout"><section className="card form-card"><div className="section-heading"><span>01</span><div><h2>Información general</h2><p>Datos que identificarán el producto dentro del catálogo.</p></div></div><div className="form-grid">
  <label><span>Código *</span><input value={form.code} onChange={e=>set("code",e.target.value)} maxLength={50} required placeholder="AI_VIDEO"/><small>Único, máximo 50 caracteres. Se guardará en mayúsculas.</small></label>
  <label><span>Nombre comercial *</span><input value={form.name} onChange={e=>set("name",e.target.value)} maxLength={150} required placeholder="Video generado con IA"/></label>
  <label className="full"><span>Descripción</span><textarea value={form.description??""} onChange={e=>set("description",e.target.value)} maxLength={5000} rows={5} placeholder="Describe el alcance general del servicio..."/><small>{(form.description?.length||0).toLocaleString()}/5,000</small></label>
  <label><span>Área *</span><select value={form.area} onChange={e=>set("area",e.target.value as ProductArea)}>{Object.entries(AREA_LABELS).map(([v,l])=><option value={v} key={v}>{l}</option>)}</select></label>
  <label><span>Orden de visualización</span><input type="number" min={0} value={form.displayOrder??0} onChange={e=>set("displayOrder",Number(e.target.value))}/></label>
 </div></section>
 <section className="card form-card"><div className="section-heading"><span>02</span><div><h2>Precio y facturación</h2><p>Configuración utilizada para cotizar el producto.</p></div></div><div className="form-grid">
  <label><span>Tipo de precio *</span><select value={form.pricingType} onChange={e=>set("pricingType",e.target.value as PricingType)}>{Object.entries(PRICING_LABELS).map(([v,l])=><option value={v} key={v}>{l}</option>)}</select></label>
  <label><span>Precio base *</span><div className="input-group"><span>{form.currency||"USD"}</span><input type="number" min={0} step="0.01" value={form.basePrice} onChange={e=>set("basePrice",Number(e.target.value))} required/></div></label>
  <label><span>Moneda *</span><input value={form.currency} maxLength={3} minLength={3} onChange={e=>set("currency",e.target.value)} required placeholder="USD"/></label>
  <label><span>Unidad cotizable *</span><input value={form.unitName} onChange={e=>set("unitName",e.target.value)} maxLength={60} required placeholder="video"/></label>
  <label><span>Periodicidad</span><select value={form.billingPeriod} onChange={e=>set("billingPeriod",e.target.value as BillingPeriod)}>{Object.entries(BILLING_LABELS).map(([v,l])=><option value={v} key={v}>{l}</option>)}</select></label>
  <label><span>Cantidad mínima</span><input type="number" min={1} value={form.minimumQuantity??1} onChange={e=>set("minimumQuantity",Number(e.target.value))}/></label>
 </div></section>
 <section className="card form-card"><div className="section-heading"><span>03</span><div><h2>Entrega y disponibilidad</h2><p>Tiempo estimado y estado del producto.</p></div></div><div className="form-grid">
  <label><span>Tiempo estimado</span><input type="number" min={1} value={form.estimatedDeliveryValue??""} onChange={e=>set("estimatedDeliveryValue",e.target.value?Number(e.target.value):null)} placeholder="2"/></label>
  <label><span>Unidad de entrega</span><select value={form.estimatedDeliveryUnit??""} onChange={e=>set("estimatedDeliveryUnit",(e.target.value||null) as DeliveryUnit|null)}><option value="">Sin definir</option>{Object.entries(DELIVERY_LABELS).map(([v,l])=><option value={v} key={v}>{l}</option>)}</select></label>
  <label className="toggle-field full"><div><span>Producto activo</span><small>Los productos activos aparecen en el catálogo disponible para cotizaciones.</small></div><input type="checkbox" checked={form.isActive??true} onChange={e=>set("isActive",e.target.checked)}/></label>
 </div></section>
 <div className="form-actions"><Link href="/productos" className="button secondary"><ArrowLeft size={17}/> Cancelar</Link><button className="button primary" disabled={submitting}><Save size={17}/>{submitting?"Guardando...":product?"Guardar cambios":"Crear producto"}</button></div>
 </form>;
}
