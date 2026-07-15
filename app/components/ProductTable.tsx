"use client";
import Link from "next/link";
import { Copy, Edit3, MoreHorizontal, Power, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "../types/product";
import { AREA_LABELS, PRICING_LABELS } from "../lib/constants";
import { formatMoney } from "../lib/format";
import { StatusBadge } from "./StatusBadge";
export function ProductTable({ products, onStatus, onDuplicate, onDelete }: {products:Product[];onStatus:(p:Product)=>void;onDuplicate:(p:Product)=>void;onDelete:(p:Product)=>void}) {
 const [menu,setMenu]=useState<string|null>(null); const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{const close=(e:MouseEvent)=>{if(!ref.current?.contains(e.target as Node))setMenu(null)};document.addEventListener("mousedown",close);return()=>document.removeEventListener("mousedown",close)},[]);
 return <div className="table-wrap" ref={ref}><table><thead><tr><th>Producto</th><th>Área</th><th>Precio</th><th>Modalidad</th><th>Estado</th><th>Orden</th><th/></tr></thead><tbody>{products.map(p=><tr key={p.id}><td><div className="product-cell"><div className="product-avatar">{p.name.slice(0,2).toUpperCase()}</div><div><Link href={`/productos/${p.id}/editar`}>{p.name}</Link><span>{p.code}</span></div></div></td><td><span className={`area-pill ${p.area.toLowerCase()}`}>{AREA_LABELS[p.area]}</span></td><td><strong>{formatMoney(p.basePrice,p.currency)}</strong><small className="table-helper">por {p.unitName}</small></td><td>{PRICING_LABELS[p.pricingType]}</td><td><StatusBadge active={p.isActive}/></td><td>#{p.displayOrder}</td><td className="action-cell"><button className="icon-button" onClick={()=>setMenu(menu===p.id?null:p.id)}><MoreHorizontal size={19}/></button>{menu===p.id&&<div className="row-menu"><Link href={`/productos/${p.id}/editar`}><Edit3 size={16}/>Editar</Link><button onClick={()=>{setMenu(null);onDuplicate(p)}}><Copy size={16}/>Duplicar</button><button onClick={()=>{setMenu(null);onStatus(p)}}><Power size={16}/>{p.isActive?"Desactivar":"Activar"}</button><button className="danger" onClick={()=>{setMenu(null);onDelete(p)}}><Trash2 size={16}/>Eliminar</button></div>}</td></tr>)}</tbody></table></div>;
}
