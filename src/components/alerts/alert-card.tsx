"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Users, Calendar, MapPin, CheckCircle, X, Eye } from "lucide-react"

interface AlertCardProps {
  alert: {
    id: number
    type: string
    title: string
    description: string
    severity: "high" | "medium" | "low"
    createdAt: string
    relatedData?: any
    status: "active" | "resolved" | "dismissed"
  }
  onResolve: (alertId: number) => void
  onDismiss: (alertId: number) => void
  onViewDetails: (alert: any) => void
}

const severityColors = {
  high: "destructive",
  medium: "secondary",
  low: "outline",
} as const

const severityLabels = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
}

const typeIcons = {
  conflict: AlertTriangle,
  unassigned: Users,
  availability: Calendar,
  schedule: Clock,
  venue: MapPin,
} as const

export function AlertCard({ alert, onResolve, onDismiss, onViewDetails }: AlertCardProps) {
  const IconComponent = typeIcons[alert.type as keyof typeof typeIcons] || AlertTriangle

  return (
    <Card className={`${alert.severity === "high" ? "border-destructive" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div
              className={`p-2 rounded-lg ${
                alert.severity === "high"
                  ? "bg-destructive/10"
                  : alert.severity === "medium"
                    ? "bg-secondary/10"
                    : "bg-muted"
              }`}
            >
              <IconComponent
                className={`h-4 w-4 ${
                  alert.severity === "high"
                    ? "text-destructive"
                    : alert.severity === "medium"
                      ? "text-secondary-foreground"
                      : "text-muted-foreground"
                }`}
              />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{alert.title}</h3>
                <Badge variant={severityColors[alert.severity]}>{severityLabels[alert.severity]}</Badge>
              </div>

              <p className="text-sm text-muted-foreground">{alert.description}</p>

              {alert.relatedData && (
                <div className="text-xs text-muted-foreground space-y-1">
                  {alert.relatedData.match && (
                    <div className="flex items-center gap-4">
                      <span>Partido: {alert.relatedData.match}</span>
                      {alert.relatedData.time && <span>Hora: {alert.relatedData.time}</span>}
                      {alert.relatedData.venue && <span>Lugar: {alert.relatedData.venue}</span>}
                    </div>
                  )}
                  {alert.relatedData.referee && <div>Árbitro: {alert.relatedData.referee}</div>}
                </div>
              )}

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {new Date(alert.createdAt).toLocaleString("es-ES")}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button size="sm" variant="outline" onClick={() => onViewDetails(alert)}>
              <Eye className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => onResolve(alert.id)}>
              <CheckCircle className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => onDismiss(alert.id)}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
