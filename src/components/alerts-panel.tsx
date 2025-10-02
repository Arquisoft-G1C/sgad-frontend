import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "conflict",
    title: "Conflicto de Horario",
    description: "Carlos Pérez asignado a 2 partidos simultáneos",
    time: "15:00 - 17:00",
    severity: "high",
  },
  {
    id: 2,
    type: "unassigned",
    title: "Partido Sin Árbitro",
    description: "Atlético vs Valencia necesita asignación",
    time: "17:30",
    severity: "medium",
  },
  {
    id: 3,
    type: "availability",
    title: "Árbitro No Disponible",
    description: "Ana Martín canceló disponibilidad para mañana",
    time: "Todo el día",
    severity: "low",
  },
]

const severityColors = {
  high: "destructive",
  medium: "secondary",
  low: "outline",
} as const

export function AlertsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-chart-4" />
          Alertas Activas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start justify-between p-3 rounded-lg border border-border">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{alert.title}</p>
                  <Badge variant={severityColors[alert.severity]}>
                    {alert.severity === "high" ? "Alta" : alert.severity === "medium" ? "Media" : "Baja"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {alert.time}
                </div>
              </div>
              <Button size="sm" variant="outline">
                Resolver
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
