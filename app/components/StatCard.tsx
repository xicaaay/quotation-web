import type { LucideIcon } from "lucide-react";
export function StatCard({ label, value, helper, icon: Icon }: { label:string; value:number|string; helper?:string; icon:LucideIcon }) {return <div className="stat-card"><div className="stat-icon"><Icon size={21}/></div><div><span>{label}</span><strong>{value}</strong>{helper && <small>{helper}</small>}</div></div>}
