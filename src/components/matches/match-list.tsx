"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Clock, MapPin, MoreHorizontal, Edit, Trash2, UserCheck, Eye, Loader2 } from "lucide-react"
import { useMatches } from "@/hooks/use-matches"
import { Match } from "@/services"

const statusColors = {
  programado: "default",
  en_curso: "secondary",
  finalizado: "outline",
  cancelado: "destructive",
} as const

const statusLabels = {
  programado: "Programado",
  en_curso: "En Curso",
  finalizado: "Finalizado",
  cancelado: "Cancelado",
}

interface MatchListProps {
  filters: any
  onEdit: (match: Match) => void
  onDelete: (matchId: number) => void
  onAssign: (matchId: number) => void
  onRefresh?: () => void
}

export function MatchList({ filters, onEdit, onDelete, onAssign, onRefresh }: MatchListProps) {
  const { fetchMatches, loading, error } = useMatches()
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    loadMatches()
  }, [])

  const loadMatches = async () => {
    try {
      const data = await fetchMatches()
      setMatches(data)
    } catch (err) {
      console.error("Error loading matches:", err)
    }
  }

  const handleDelete = async (matchId: number) => {
    onDelete(matchId)
    // Refresh the list after deletion
    await loadMatches()
    onRefresh?.()
  }

  const filteredMatches = matches.filter((match) => {
    if (filters.search && !`${match.home_team} ${match.away_team}`.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    if (filters.category && match.category !== filters.category) return false
    if (filters.status && match.status !== filters.status) return false
    if (filters.competition && match.competition !== filters.competition) return false
    return true
  })

  if (loading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Loader2 className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-spin" />
          <p className="text-muted-foreground">Cargando partidos...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Calendar className="h-12 w-12 mx-auto text-destructive mb-4" />
          <h3 className="text-lg font-medium mb-2 text-destructive">Error al cargar partidos</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={loadMatches} variant="outline">
            Reintentar
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {filteredMatches.map((match) => (
        <Card key={match.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold">
                    {match.home_team} vs {match.away_team}
                  </h3>
                  <Badge variant={statusColors[match.status as keyof typeof statusColors]}>
                    {statusLabels[match.status as keyof typeof statusLabels]}
                  </Badge>
                  {match.competition && <Badge variant="outline">{match.competition.toUpperCase()}</Badge>}
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(match.date).toLocaleDateString("es-ES")}
                  </div>
                  {match.time && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {match.time}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {match.location}
                  </div>
                </div>

                {match.referee_id && (
                  <div className="flex items-center gap-1 text-sm">
                    <UserCheck className="h-4 w-4 text-chart-3" />
                    <span className="text-muted-foreground">Árbitro asignado ID:</span>
                    <span className="font-medium">{match.referee_id}</span>
                  </div>
                )}

                {match.notes && (
                  <div className="text-sm text-muted-foreground">
                    Notas: <span className="font-medium text-foreground">{match.notes}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {match.status === "programado" && !match.referee_id && (
                  <Button size="sm" onClick={() => onAssign(match.id)}>
                    <UserCheck className="h-4 w-4 mr-1" />
                    Asignar
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {}}>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(match)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAssign(match.id)}>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Asignar árbitro
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(match.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredMatches.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No se encontraron partidos</h3>
            <p className="text-muted-foreground">No hay partidos que coincidan con los filtros seleccionados.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
