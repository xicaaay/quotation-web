"use client";
import { Menu, Plus } from "lucide-react";
import Link from "next/link";
export function Header({ onMenu }: { onMenu: () => void }) {
 return <header className="topbar"><button className="icon-button menu-button" onClick={onMenu}><Menu size={22}/></button><div><span className="topbar-eyebrow">Administrador</span><strong>Catálogo de cotizaciones</strong></div><Link href="/productos/nuevo" className="button primary compact"><Plus size={17}/> Nuevo producto</Link></header>;
}
