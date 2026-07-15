import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "./components/AppShell";
export const metadata: Metadata = { title: "Quotation Admin", description: "Panel administrativo del catálogo de cotizaciones" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body><AppShell>{children}</AppShell></body></html>;
}
