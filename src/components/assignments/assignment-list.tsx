"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Clock, MapPin, User, MoreHorizontal, Edit, Trash2, CheckCircle, X } from "lucide-react"

const mockAssignments = [
  {
    id: 1,
    match: {
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      date: "2024-01-15",
      time: "15:00",
      venue: "Santiago Bernabéu",
    },
    referee: {
      id: 1,
      firstName: "Carlos",
      lastName: "Pérez García",
    },
    type: "main",
    status: "confirmed",
    assignedAt: "2024-01-10T10:00:00Z",
    notes: "Partido de alta importancia",
  },
  {
    id: 2,
    match: {
      homeTeam: "Atlético Madrid",
      awayTeam: "Valencia",
      date: "2024-01-15",
      time: "17:30",
      venue: "Wanda Metropolitano",
    },
    referee: null,
    type: "main",
    status: "pending",
    assignedAt: null,
    notes: "",
  },
  {
    id: 3,
    match: {
      homeTeam: "Sevilla",
      awayTeam: "Real Betis",
      date: "2024-01-16",
      time: "20:00",
      venue: "Ramón Sánchez-Pizjuán",
    },
    referee: {
      id: 2,
      firstName: "María",
      lastName: "González López",
    },
    type: "main",
    status: "confirmed",
    assignedAt: "2024-01-11T14:30:00Z",
    notes: "Derbi andaluz",
  },
]

const statusColors = {
  confirmed: "default",
  pending: "destructive",
  cancelled: "secondary",
} as const

const statusLabels = {
  confirmed: "Confirmado",
  pending: "Pendiente",
  cancelled: "Cancelado",
}

const typeLabels = {
  main: "Principal",
  assistant1: "Asistente 1",
  assistant2: "Asistente 2",
  fourth: "Cuarto",
}

interface AssignmentListProps {
  onEdit: (assignment: any) => void
  onDelete: (assignmentId: number) => void
  onAssign: (assignment: any) => void
}

export function AssignmentList({ onEdit, onDelete, onAssign }: AssignmentListProps) {
  const [assignments] = useState(mockAssignments)

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const handleConfirm = (assignmentId: number) => {
    console.log("Confirming assignment:", assignmentId)
    // Here you would update the assignment status
  }

  const handleCancel = (assignmentId: number) => {
    console.log("Cancelling assignment:", assignmentId)
    // Here you would update the assignment status
  }

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <Card key={assignment.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">
                    {assignment.match.homeTeam} vs {assignment.match.awayTeam}
                  </h3>
                  <Badge variant={statusColors[assignment.status as keyof typeof statusColors]}>
                    {statusLabels[assignment.status as keyof typeof statusLabels]}
                  </Badge>
                  <Badge variant="outline">{typeLabels[assignment.type as keyof typeof typeLabels]}</Badge>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(assignment.match.date).toLocaleDateString("es-ES")}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {assignment.match.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {assignment.match.venue}
                  </div>
                </div>

                {assignment.referee ? (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {getInitials(assignment.referee.firstName, assignment.referee.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1 text-sm">
                        <User className="h-4 w-4 text-chart-3" />
                        <span className="font-medium">
                          {assignment.referee.firstName} {assignment.referee.lastName}
                        </span>
                      </div>
                      {assignment.assignedAt && (
                        <div className="text-xs text-muted-foreground">
                          Asignado el {new Date(assignment.assignedAt).toLocaleDateString("es-ES")}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-destructive font-medium">Sin árbitro asignado</div>
                    <Button size="sm" onClick={() => onAssign(assignment)}>
                      Asignar Árbitro
                    </Button>
                  </div>
                )}

                {assignment.notes && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Notas:</span> {assignment.notes}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {assignment.status === "pending" && assignment.referee && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleConfirm(assignment.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirmar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleCancel(assignment.id)}>
                      <X className="h-4 w-4 mr-1" />
                      Cancelar
                    </Button>
                  </>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(assignment)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(assignment.id)} className="text-destructive">
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
    </div>
  )
}
