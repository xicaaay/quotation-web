export function StatusBadge({ active }: { active:boolean }) {return <span className={`badge ${active ? "success" : "neutral"}`}><span/>{active ? "Activo" : "Inactivo"}</span>}
