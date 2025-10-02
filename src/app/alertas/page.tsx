"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCard } from "@/components/alerts/alert-card"
import { ConflictDetector } from "@/components/alerts/conflict-detector"
import { AlertFilters } from "@/components/alerts/alert-filters"
import { AlertTriangle, Shield, Activity } from "lucide-react"

const mockAlerts = [
  {
    id: 1,
    type: "conflict",
    title: "Conflicto de Horario",
    description: "Carlos Pérez asignado a 2 partidos simultáneos",
    severity: "high" as const,
    createdAt: "2024-01-15T10:00:00Z",
    status: "active" as const,
    relatedData: {
      referee: "Carlos Pérez García",
      match: "Real Madrid vs Barcelona",
      time: "15:00",
      venue: "Santiago Bernabéu",
    },
  },
  {
    id: 2,
    type: "unassigned",
    title: "Partido Sin Árbitro",
    description: "Atlético vs Valencia necesita asignación urgente",
    severity: "medium" as const,
    createdAt: "2024-01-15T09:30:00Z",
    status: "active" as const,
    relatedData: {
      match: "Atlético vs Valencia",
      time: "17:30",
      venue: "Wanda Metropolitano",
    },
  },
  {
    id: 3,
    type: "availability",
    title: "Árbitro No Disponible",
    description: "Ana Martín canceló disponibilidad para mañana",
    severity: "low" as const,
    createdAt: "2024-01-14T16:45:00Z",
    status: "active" as const,
    relatedData: {
      referee: "Ana Martín Ruiz",
    },
  },
  {
    id: 4,
    type: "schedule",
    title: "Cambio de Horario",
    description: "Partido adelantado 30 minutos por televisión",
    severity: "medium" as const,
    createdAt: "2024-01-14T14:20:00Z",
    status: "resolved" as const,
    relatedData: {
      match: "Sevilla vs Betis",
      time: "19:30 → 19:00",
    },
  },
]

export default function AlertasPage() {
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    severity: "",
    status: "",
    dateRange: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleClearFilters = () => {
    setFilters({
      search: "",
      type: "",
      severity: "",
      status: "",
      dateRange: "",
    })
  }

  const handleResolveAlert = (alertId: number) => {
    console.log("Resolving alert:", alertId)
    // Here you would update the alert status
  }

  const handleDismissAlert = (alertId: number) => {
    console.log("Dismissing alert:", alertId)
    // Here you would update the alert status
  }

  const handleViewDetails = (alert: any) => {
    console.log("Viewing alert details:", alert)
    // Here you would open a detailed view modal
  }

  const filteredAlerts = mockAlerts.filter((alert) => {
    if (
      filters.search &&
      !alert.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !alert.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }
    if (filters.type && filters.type !== "all" && alert.type !== filters.type) return false
    if (filters.severity && filters.severity !== "all" && alert.severity !== filters.severity) return false
    if (filters.status && filters.status !== "all" && alert.status !== filters.status) return false
    return true
  })

  const activeAlerts = filteredAlerts.filter((alert) => alert.status === "active")
  const highPriorityAlerts = activeAlerts.filter((alert) => alert.severity === "high")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <AlertTriangle className="h-8 w-8" />
                Sistema de Alertas
              </h1>
              <p className="text-muted-foreground">Monitorea conflictos y problemas en las asignaciones</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <span>{highPriorityAlerts.length} alertas críticas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span>{activeAlerts.length} alertas activas</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="alerts" className="space-y-6">
            <TabsList>
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Alertas ({activeAlerts.length})
              </TabsTrigger>
              <TabsTrigger value="conflicts" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Detector de Conflictos
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Monitoreo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="alerts" className="space-y-6">
              <AlertFilters filters={filters} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />

              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    onResolve={handleResolveAlert}
                    onDismiss={handleDismissAlert}
                    onViewDetails={handleViewDetails}
                  />
                ))}

                {filteredAlerts.length === 0 && (
                  <div className="text-center py-12">
                    <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No hay alertas</h3>
                    <p className="text-muted-foreground">
                      No se encontraron alertas que coincidan con los filtros seleccionados.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="conflicts">
              <ConflictDetector />
            </TabsContent>

            <TabsContent value="monitoring">
              <div className="text-center py-12">
                <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Panel de Monitoreo</h3>
                <p className="text-muted-foreground">Funcionalidad de monitoreo en tiempo real próximamente.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
