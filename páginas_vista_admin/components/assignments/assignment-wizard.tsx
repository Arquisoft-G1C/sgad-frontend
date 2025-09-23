"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, MapPin, Star, AlertTriangle, CheckCircle } from "lucide-react"

interface AssignmentWizardProps {
  match?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

const mockReferees = [
  {
    id: 1,
    firstName: "Carlos",
    lastName: "Pérez García",
    category: "nacional",
    experience: 15,
    rating: 4.8,
    availability: { saturday: true },
    specializations: ["Fútbol 11"],
    conflicts: [],
  },
  {
    id: 2,
    firstName: "María",
    lastName: "González López",
    category: "regional",
    experience: 8,
    rating: 4.6,
    availability: { saturday: true },
    specializations: ["Fútbol 11"],
    conflicts: ["Partido simultáneo en Barcelona"],
  },
  {
    id: 3,
    firstName: "Ana",
    lastName: "Martín Ruiz",
    category: "provincial",
    experience: 5,
    rating: 4.2,
    availability: { saturday: false },
    specializations: ["Fútbol Sala"],
    conflicts: ["No disponible este día"],
  },
]

export function AssignmentWizard({ match, onSubmit, onCancel }: AssignmentWizardProps) {
  const [selectedReferee, setSelectedReferee] = useState<number | null>(null)
  const [assignmentType, setAssignmentType] = useState("main")
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    if (!selectedReferee) return

    const assignmentData = {
      matchId: match?.id,
      refereeId: selectedReferee,
      type: assignmentType,
      notes,
    }

    onSubmit(assignmentData)
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const getRefereeScore = (referee: any) => {
    let score = 0

    // Base score from rating
    score += referee.rating * 20

    // Experience bonus
    score += Math.min(referee.experience, 20)

    // Category bonus
    const categoryBonus = {
      nacional: 20,
      regional: 15,
      provincial: 10,
      local: 5,
    }
    score += categoryBonus[referee.category as keyof typeof categoryBonus] || 0

    // Availability penalty
    if (!referee.availability.saturday) score -= 50

    // Conflict penalty
    score -= referee.conflicts.length * 25

    return Math.max(0, Math.min(100, score))
  }

  const sortedReferees = [...mockReferees].sort((a, b) => getRefereeScore(b) - getRefereeScore(a))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asignar Árbitro al Partido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Match Info */}
        {match && (
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">
              {match.homeTeam} vs {match.awayTeam}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
          </div>
        )}

        {/* Assignment Type */}
        <div className="space-y-2">
          <Label>Tipo de Asignación</Label>
          <Select value={assignmentType} onValueChange={setAssignmentType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">Árbitro Principal</SelectItem>
              <SelectItem value="assistant1">Asistente 1</SelectItem>
              <SelectItem value="assistant2">Asistente 2</SelectItem>
              <SelectItem value="fourth">Cuarto Árbitro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Referee Selection */}
        <div className="space-y-4">
          <Label>Seleccionar Árbitro</Label>
          <div className="space-y-3">
            {sortedReferees.map((referee) => {
              const score = getRefereeScore(referee)
              const hasConflicts = referee.conflicts.length > 0
              const isAvailable = referee.availability.saturday

              return (
                <div
                  key={referee.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedReferee === referee.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedReferee(referee.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{getInitials(referee.firstName, referee.lastName)}</AvatarFallback>
                      </Avatar>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">
                            {referee.firstName} {referee.lastName}
                          </h4>
                          <Badge variant="outline">{referee.category.toUpperCase()}</Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {referee.rating}/5
                          </div>
                          <div>{referee.experience} años exp.</div>
                          <div>{referee.specializations.join(", ")}</div>
                        </div>

                        {hasConflicts && (
                          <div className="flex items-start gap-1 text-sm text-destructive">
                            <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            <div>
                              {referee.conflicts.map((conflict, index) => (
                                <div key={index}>{conflict}</div>
                              ))}
                            </div>
                          </div>
                        )}

                        {!isAvailable && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <AlertTriangle className="h-3 w-3" />
                            No disponible este día
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm font-medium">Puntuación</div>
                        <div
                          className={`text-lg font-bold ${
                            score >= 80 ? "text-chart-3" : score >= 60 ? "text-chart-5" : "text-chart-4"
                          }`}
                        >
                          {score}
                        </div>
                      </div>

                      {isAvailable && !hasConflicts && <CheckCircle className="h-5 w-5 text-chart-3" />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Notas de la Asignación</Label>
          <Textarea
            id="notes"
            placeholder="Información adicional sobre la asignación..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <Button onClick={handleSubmit} disabled={!selectedReferee} className="flex-1">
            Confirmar Asignación
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
