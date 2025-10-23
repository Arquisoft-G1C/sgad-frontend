"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Clock, MapPin, Users, Loader2 } from "lucide-react"
import { useMatches } from "@/hooks/use-matches"
import { Match, MatchCreate, MatchUpdate } from "@/services"
import { useToast } from "@/hooks/use-toast"

interface MatchFormProps {
  match?: Match
  onSubmit?: () => void
  onCancel: () => void
}

export function MatchForm({ match, onSubmit, onCancel }: MatchFormProps) {
  const { createMatch, updateMatch, loading } = useMatches()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    home_team: match?.home_team || "",
    away_team: match?.away_team || "",
    date: match?.date || "",
    time: match?.time || "",
    location: match?.location || "",
    category: match?.category || "",
    competition: match?.competition || "",
    referee_id: match?.referee_id || 1, // Default referee ID for now
    notes: match?.notes || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (match) {
        // Update existing match
        const updateData: MatchUpdate = { ...formData }
        await updateMatch(match.id, updateData)
        toast({
          title: "Partido actualizado",
          description: "El partido se actualizó correctamente",
        })
      } else {
        // Create new match
        const createData: MatchCreate = { ...formData } as MatchCreate
        await createMatch(createData)
        toast({
          title: "Partido creado",
          description: "El partido se creó correctamente",
        })
      }
      onSubmit?.()
      onCancel()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo guardar el partido",
        variant: "destructive",
      })
    }
  }

  const handleChange = (field: string, value: string | number) => {
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
              <Label htmlFor="home_team">Equipo Local</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="home_team"
                  placeholder="Nombre del equipo local"
                  value={formData.home_team}
                  onChange={(e) => handleChange("home_team", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="away_team">Equipo Visitante</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="away_team"
                  placeholder="Nombre del equipo visitante"
                  value={formData.away_team}
                  onChange={(e) => handleChange("away_team", e.target.value)}
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
              <Label htmlFor="location">Estadio/Cancha</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Nombre del estadio o cancha"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
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
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {match ? "Actualizar Partido" : "Crear Partido"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
