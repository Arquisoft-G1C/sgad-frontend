import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "@/styles/globals.css"

export const metadata: Metadata = {
    title: "SGAD - Sistema de Gestión de Árbitros y Designaciones",
    description: "Sistema de gestión para árbitros, partidos y designaciones",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body
                className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
                suppressHydrationWarning
            >
                {children}
            </body>
        </html>
    )
}