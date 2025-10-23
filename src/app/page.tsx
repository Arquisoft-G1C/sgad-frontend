import { Suspense } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardStats } from "@/components/server/dashboard-stats"
import { RecentMatches } from "@/components/server/recent-matches"
import { AlertsPanelServer } from "@/components/server/alerts-panel-server"
import { Card, CardContent } from "@/components/ui/card"

function StatsLoading() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                    <CardContent className="p-6">
                        <div className="animate-pulse space-y-3">
                            <div className="h-4 bg-muted rounded w-24"></div>
                            <div className="h-8 bg-muted rounded w-16"></div>
                            <div className="h-3 bg-muted rounded w-32"></div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

function MatchesLoading() {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-32"></div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 bg-muted rounded"></div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default async function DashboardPage() {
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

                    <div className="space-y-6">
                        <Suspense fallback={<StatsLoading />}>
                            <DashboardStats />
                        </Suspense>
                        <div className="grid gap-6 md:grid-cols-2">
                            <Suspense fallback={<MatchesLoading />}>
                                <RecentMatches />
                            </Suspense>
                            <Suspense fallback={<MatchesLoading />}>
                                <AlertsPanelServer />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}