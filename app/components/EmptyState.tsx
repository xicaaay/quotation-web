import { PackageOpen } from "lucide-react";
export function EmptyState({ title="No hay productos", description="Crea el primer producto para comenzar a construir el catálogo.", action }: {title?:string;description?:string;action?:React.ReactNode}) {return <div className="empty-state"><div className="empty-icon"><PackageOpen size={28}/></div><h3>{title}</h3><p>{description}</p>{action}</div>}
