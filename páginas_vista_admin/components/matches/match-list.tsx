"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Clock, MapPin, MoreHorizontal, Edit, Trash2, UserCheck, Eye } from "lucide-react"

const mockMatches = [
  {
    id: 1,
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    date: "2024-01-15",
    time: "15:00",
    venue: "Santiago Bernabéu",
    category: "primera",
    competition: "liga",
    status: "assigned",
    referee: "Carlos Pérez",
    fee: 150,
  },
  {
    id: 2,
    homeTeam: "Atlético Madrid",
    awayTeam: "Valencia",
    date: "2024-01-15",
    time: "17:30",
    venue: "Wanda Metropolitano",
    category: "primera",
    competition: "liga",
    status: "unassigned",
    referee: null,
    fee: 150,
  },
  {
    id: 3,
    homeTeam: "Sevilla",
    awayTeam: "Real Betis",
    date: "2024-01-15",
    time: "20:00",
    venue: "Ramón Sánchez-Pizjuán",
    category: "primera",
    competition: "copa",
    status: "assigned",
    referee: "María González",
    fee: 180,
  },
  {
    id: 4,
    homeTeam: "Athletic Bilbao",
    awayTeam: "Real Sociedad",
    date: "2024-01-16",
    time: "21:45",
    venue: "San Mamés",
    category: "primera",
    competition: "liga",
    status: "unassigned",
    referee: null,
    fee: 150,
  },
]

const statusColors = {
  assigned: "default",
  unassigned: "destructive",
  completed: "secondary",
  cancelled: "outline",
} as const

const statusLabels = {
  assigned: "Asignado",
  unassigned: "Sin asignar",
  completed: "Completado",
  cancelled: "Cancelado",
}

interface MatchListProps {
  filters: any
  onEdit: (match: any) => void
  onDelete: (matchId: number) => void
  onAssign: (matchId: number) => void
}

export function MatchList({ filters, onEdit, onDelete, onAssign }: MatchListProps) {
  const [matches] = useState(mockMatches)

  const filteredMatches = matches.filter((match) => {
    if (filters.search && !`${match.homeTeam} ${match.awayTeam}`.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    if (filters.category && match.category !== filters.category) return false
    if (filters.status && match.status !== filters.status) return false
    if (filters.competition && match.competition !== filters.competition) return false
    return true
  })

  return (
    <div className="space-y-4">
      {filteredMatches.map((match) => (
        <Card key={match.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold">
                    {match.homeTeam} vs {match.awayTeam}
                  </h3>
                  <Badge variant={statusColors[match.status as keyof typeof statusColors]}>
                    {statusLabels[match.status as keyof typeof statusLabels]}
                  </Badge>
                  <Badge variant="outline">{match.competition.toUpperCase()}</Badge>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(match.date).toLocaleDateString("es-ES")}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {match.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {match.venue}
                  </div>
                </div>

                {match.referee && (
                  <div className="flex items-center gap-1 text-sm">
                    <UserCheck className="h-4 w-4 text-chart-3" />
                    <span className="text-muted-foreground">Árbitro:</span>
                    <span className="font-medium">{match.referee}</span>
                  </div>
                )}

                <div className="text-sm text-muted-foreground">
                  Tarifa: <span className="font-medium text-foreground">{match.fee}€</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {match.status === "unassigned" && (
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
                    <DropdownMenuItem onClick={() => onDelete(match.id)} className="text-destructive">
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
