import { Sidebar } from "@/components/sidebar"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentMatches } from "@/components/recent-matches"
import { AlertsPanel } from "@/components/alerts-panel"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Resumen de la actividad del sistema de árbitros</p>
            </div>
            <div className="text-sm text-muted-foreground">
              Última actualización: {new Date().toLocaleString("es-ES")}
            </div>
          </div>

          {/* Stats */}
          <DashboardStats />

          {/* Main Content */}
          <div className="grid gap-6 lg:grid-cols-2">
            <RecentMatches />
            <AlertsPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
