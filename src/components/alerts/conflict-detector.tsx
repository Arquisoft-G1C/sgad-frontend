"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Users, MapPin, Calendar } from "lucide-react"

const mockConflicts = [
  {
    id: 1,
    type: "schedule_overlap",
    severity: "high" as const,
    referee: "Carlos Pérez García",
    conflicts: [
      {
        match: "Real Madrid vs Barcelona",
        time: "15:00",
        venue: "Santiago Bernabéu",
        date: "2024-01-15",
      },
      {
        match: "Atlético vs Valencia",
        time: "15:30",
        venue: "Wanda Metropolitano",
        date: "2024-01-15",
      },
    ],
    description: "Árbitro asignado a partidos con horarios superpuestos",
  },
  {
    id: 2,
    type: "travel_distance",
    severity: "medium" as const,
    referee: "María González López",
    conflicts: [
      {
        match: "Sevilla vs Betis",
        time: "16:00",
        venue: "Ramón Sánchez-Pizjuán",
        date: "2024-01-15",
      },
      {
        match: "Athletic vs Real Sociedad",
        time: "18:00",
        venue: "San Mamés",
        date: "2024-01-15",
      },
    ],
    description: "Distancia excesiva entre estadios para el tiempo disponible",
  },
  {
    id: 3,
    type: "availability",
    severity: "low" as const,
    referee: "Ana Martín Ruiz",
    conflicts: [
      {
        match: "Valencia vs Villarreal",
        time: "20:00",
        venue: "Mestalla",
        date: "2024-01-16",
      },
    ],
    description: "Árbitro marcado como no disponible para esta fecha",
  },
]

const conflictTypeLabels = {
  schedule_overlap: "Conflicto de Horario",
  travel_distance: "Distancia Excesiva",
  availability: "No Disponible",
  category_mismatch: "Categoría Inadecuada",
}

const severityColors = {
  high: "destructive",
  medium: "secondary",
  low: "outline",
} as const

export function ConflictDetector() {
  const handleResolveConflict = (conflictId: number) => {
    console.log("Resolving conflict:", conflictId)
    // Here you would implement conflict resolution logic
  }

  const handleAutoResolve = () => {
    console.log("Auto-resolving conflicts")
    // Here you would implement automatic conflict resolution
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-chart-4" />
            Detector de Conflictos
          </CardTitle>
          <Button variant="outline" onClick={handleAutoResolve}>
            Resolver Automáticamente
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockConflicts.map((conflict) => (
            <div key={conflict.id} className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">
                    {conflictTypeLabels[conflict.type as keyof typeof conflictTypeLabels]}
                  </h4>
                  <Badge variant={severityColors[conflict.severity]}>
                    {conflict.severity === "high" ? "Alta" : conflict.severity === "medium" ? "Media" : "Baja"}
                  </Badge>
                </div>
                <Button size="sm" onClick={() => handleResolveConflict(conflict.id)}>
                  Resolver
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">{conflict.description}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Users className="h-4 w-4" />
                  Árbitro: {conflict.referee}
                </div>

                <div className="space-y-2">
                  {conflict.conflicts.map((match, index) => (
                    <div key={index} className="flex items-center gap-4 text-sm text-muted-foreground pl-5">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(match.date).toLocaleDateString("es-ES")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {match.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {match.venue}
                      </div>
                      <div className="font-medium text-foreground">{match.match}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {mockConflicts.length === 0 && (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No hay conflictos detectados</h3>
              <p className="text-muted-foreground">Todas las asignaciones están libres de conflictos.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
