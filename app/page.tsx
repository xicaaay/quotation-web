"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Boxes, Code2, Palette, Plus, Power, PowerOff } from "lucide-react";
import { PageHeader } from "./components/PageHeader";
import { StatCard } from "./components/StatCard";
import { LoadingState } from "./components/LoadingState";
import { productsApi } from "./lib/api";
import type { Product, ProductSummary } from "./types/product";
import { formatMoney } from "./lib/format";
import { AREA_LABELS } from "./lib/constants";
import { StatusBadge } from "./components/StatusBadge";
import { alerts } from "./lib/alerts";
export default function Dashboard(){const [summary,setSummary]=useState<ProductSummary>({});const[latest,setLatest]=useState<Product[]>([]);const[loading,setLoading]=useState(true);
 const load=useCallback(async()=>{try{setLoading(true);const[s,l]=await Promise.all([productsApi.summary(),productsApi.list(new URLSearchParams({page:"1",limit:"5",sortBy:"updatedAt",sortOrder:"desc"}))]);setSummary(s||{});setLatest(l.data)}catch(e){alerts.error("No se pudo cargar el resumen",e instanceof Error?e.message:undefined)}finally{setLoading(false)}},[]);useEffect(()=>{load()},[load]);
 const val=(...keys:string[])=>Number(keys.map(k=>summary[k]).find(v=>typeof v==="number")||0); const areaVal=(key:"design"|"development")=>Number(summary.byArea?.[key]||0);
 return <><PageHeader eyebrow="Vista general" title="Resumen del catálogo" description="Controla los productos y servicios disponibles para crear cotizaciones." actions={<Link href="/productos/nuevo" className="button primary"><Plus size={17}/>Crear producto</Link>}/>{loading?<LoadingState rows={7}/>:<><div className="stats-grid"><StatCard label="Productos totales" value={val("total","totalProducts")} icon={Boxes}/><StatCard label="Productos activos" value={val("active","activeProducts")} icon={Power}/><StatCard label="Productos inactivos" value={val("inactive","inactiveProducts")} icon={PowerOff}/><StatCard label="Diseño" value={areaVal("design")} icon={Palette}/><StatCard label="Desarrollo" value={areaVal("development")} icon={Code2}/></div><section className="card dashboard-section"><div className="card-header"><div><span className="eyebrow">Actividad reciente</span><h2>Últimos productos actualizados</h2></div><Link href="/productos" className="text-link">Ver todos <ArrowRight size={16}/></Link></div><div className="recent-list">{latest.map(p=><Link href={`/productos/${p.id}/editar`} className="recent-item" key={p.id}><div className="product-avatar large">{p.name.slice(0,2).toUpperCase()}</div><div className="recent-main"><strong>{p.name}</strong><span>{p.code} · {AREA_LABELS[p.area]}</span></div><strong>{formatMoney(p.basePrice,p.currency)}</strong><StatusBadge active={p.isActive}/><ArrowRight size={17}/></Link>)}</div></section></>}</>}
