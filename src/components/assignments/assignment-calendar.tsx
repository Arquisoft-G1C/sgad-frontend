"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, User } from "lucide-react"

const mockAssignments = [
  {
    id: 1,
    date: "2024-01-15",
    time: "15:00",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    venue: "Santiago Bernabéu",
    referee: "Carlos Pérez",
    type: "main",
    status: "confirmed",
  },
  {
    id: 2,
    date: "2024-01-15",
    time: "17:30",
    homeTeam: "Atlético",
    awayTeam: "Valencia",
    venue: "Wanda Metropolitano",
    referee: null,
    type: "main",
    status: "pending",
  },
  {
    id: 3,
    date: "2024-01-16",
    time: "20:00",
    homeTeam: "Sevilla",
    awayTeam: "Betis",
    venue: "Ramón Sánchez-Pizjuán",
    referee: "María González",
    type: "main",
    status: "confirmed",
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

export function AssignmentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const goToNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    startOfWeek.setDate(diff)

    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      days.push(date)
    }
    return days
  }

  const getAssignmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return mockAssignments.filter((assignment) => assignment.date === dateStr)
  }

  const weekDays = getWeekDays()
  const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendario de Asignaciones
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {weekDays[0].toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
            </span>
            <Button variant="outline" size="sm" onClick={goToNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => {
            const assignments = getAssignmentsForDate(day)
            const isToday = day.toDateString() === new Date().toDateString()

            return (
              <div key={day.toISOString()} className="space-y-2">
                <div
                  className={`text-center p-2 rounded-lg ${
                    isToday ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <div className="text-xs font-medium">{dayNames[index]}</div>
                  <div className="text-lg font-bold">{day.getDate()}</div>
                </div>

                <div className="space-y-1 min-h-[200px]">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="p-2 bg-card border border-border rounded text-xs space-y-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">{assignment.time}</span>
                      </div>

                      <div className="font-medium text-foreground">
                        {assignment.homeTeam} vs {assignment.awayTeam}
                      </div>

                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{assignment.venue}</span>
                      </div>

                      {assignment.referee ? (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span className="truncate">{assignment.referee}</span>
                        </div>
                      ) : (
                        <div className="text-destructive font-medium">Sin asignar</div>
                      )}

                      <div className="flex items-center justify-between">
                        <Badge
                          variant={statusColors[assignment.status as keyof typeof statusColors]}
                          className="text-xs"
                        >
                          {statusLabels[assignment.status as keyof typeof statusLabels]}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {typeLabels[assignment.type as keyof typeof typeLabels]}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
