"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, LayoutDashboard, ListOrdered, PackageSearch, Settings, X } from "lucide-react";

const items = [
  { href: "/", label: "Resumen", icon: LayoutDashboard, exact: true },
  { href: "/productos", label: "Productos", icon: Boxes },
  { href: "/orden", label: "Orden del catálogo", icon: ListOrdered },
  { href: "/catalogo", label: "Vista del catálogo", icon: PackageSearch },
  { href: "/configuracion", label: "Configuración", icon: Settings },
];
export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  return <><div className={`sidebar-backdrop ${open ? "show" : ""}`} onClick={onClose} /><aside className={`sidebar ${open ? "open" : ""}`}>
    <div className="brand"><div className="brand-mark">Q</div><div><strong>Quotation</strong><span>Panel administrativo</span></div><button className="icon-button close-sidebar" onClick={onClose}><X size={20}/></button></div>
    <nav className="sidebar-nav"><p className="nav-label">Administración</p>{items.map(({ href, label, icon: Icon, exact }) => {
      const active = exact ? pathname === href : pathname.startsWith(href);
      return <Link key={href} href={href} onClick={onClose} className={`nav-item ${active ? "active" : ""}`}><Icon size={19}/><span>{label}</span></Link>;
    })}</nav>
    <div className="sidebar-footer"><span className="status-dot"/> API sin autenticación <small>Entorno de pruebas</small></div>
  </aside></>;
}
