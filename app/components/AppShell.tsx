"use client";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="app-shell"><Sidebar open={open} onClose={() => setOpen(false)} /><div className="app-main"><Header onMenu={() => setOpen(true)} /><main className="page-container">{children}</main></div></div>;
}
