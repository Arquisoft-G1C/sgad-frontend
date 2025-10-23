"use client"

import { DashboardStats } from "@/components/dashboard-stats"
import { RecentMatches } from "@/components/recent-matches"
import { AlertsPanel } from "@/components/alerts-panel"

export function DashboardClient() {
    return (
        <div className="space-y-6">
            <DashboardStats />
            <div className="grid gap-6 md:grid-cols-2">
                <RecentMatches />
                <AlertsPanel />
            </div>
        </div>
    )
}
