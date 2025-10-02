"use client"

import { Sidebar } from "@/components/sidebar"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentMatches } from "@/components/recent-matches"
import { AlertsPanel } from "@/components/alerts-panel"

export default function DashboardPage() {
    return (
        <div className="flex h-screen bg-background">
            <Sidebar />

            <main className="flex-1 md:ml-64 overflow-auto">
                <div className="p-6 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Resumen general del sistema de gestión de árbitros
                        </p>
                    </div>

                    <DashboardStats />

                    <div className="grid gap-6 md:grid-cols-2">
                        <RecentMatches />
                        <AlertsPanel />
                    </div>
                </div>
            </main>
        </div>
    )
}