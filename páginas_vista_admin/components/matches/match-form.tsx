"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react"

interface MatchFormProps {
  match?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function MatchForm({ match, onSubmit, onCancel }: MatchFormProps) {
  const [formData, setFormData] = useState({
    homeTeam: match?.homeTeam || "",
    awayTeam: match?.awayTeam || "",
    date: match?.date || "",
    time: match?.time || "",
    venue: match?.venue || "",
    category: match?.category || "",
    competition: match?.competition || "",
    fee: match?.fee || "",
    notes: match?.notes || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{match ? "Editar Partido" : "Nuevo Partido"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="homeTeam">Equipo Local</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="homeTeam"
                  placeholder="Nombre del equipo local"
                  value={formData.homeTeam}
                  onChange={(e) => handleChange("homeTeam", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="awayTeam">Equipo Visitante</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="awayTeam"
                  placeholder="Nombre del equipo visitante"
                  value={formData.awayTeam}
                  onChange={(e) => handleChange("awayTeam", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Hora</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue">Estadio/Cancha</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="venue"
                  placeholder="Nombre del estadio o cancha"
                  value={formData.venue}
                  onChange={(e) => handleChange("venue", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primera">Primera División</SelectItem>
                  <SelectItem value="segunda">Segunda División</SelectItem>
                  <SelectItem value="tercera">Tercera División</SelectItem>
                  <SelectItem value="juvenil">Juvenil</SelectItem>
                  <SelectItem value="infantil">Infantil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="competition">Competición</Label>
              <Select value={formData.competition} onValueChange={(value) => handleChange("competition", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar competición" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="liga">Liga Regular</SelectItem>
                  <SelectItem value="copa">Copa</SelectItem>
                  <SelectItem value="playoff">Playoff</SelectItem>
                  <SelectItem value="amistoso">Amistoso</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fee">Tarifa (€)</Label>
              <Input
                id="fee"
                type="number"
                placeholder="0.00"
                value={formData.fee}
                onChange={(e) => handleChange("fee", e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea
              id="notes"
              placeholder="Información adicional sobre el partido..."
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {match ? "Actualizar Partido" : "Crear Partido"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
