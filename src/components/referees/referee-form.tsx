"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Mail, Phone, Star, Loader2 } from "lucide-react"
import { useReferees } from "@/hooks/use-referees"
import { Referee, RefereeCreate, RefereeUpdate } from "@/services"
import { useToast } from "@/hooks/use-toast"

interface RefereeFormProps {
  referee?: Referee
  onSubmit?: () => void
  onCancel: () => void
}

export function RefereeForm({ referee, onSubmit, onCancel }: RefereeFormProps) {
  const { createReferee, updateReferee, loading } = useReferees()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: referee?.name || "",
    email: referee?.email || "",
    phone: referee?.phone || "",
    category: referee?.category || "",
    specialization: referee?.specialization || "",
    license_number: referee?.license_number || "",
    experience_years: referee?.experience_years || 0,
    available: referee?.available !== undefined ? referee.available : true,
    notes: referee?.notes || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (referee) {
        // Update existing referee
        const updateData: RefereeUpdate = { ...formData }
        await updateReferee(referee.id, updateData)
        toast({
          title: "Árbitro actualizado",
          description: "El árbitro se actualizó correctamente",
        })
      } else {
        // Create new referee
        const createData: RefereeCreate = { ...formData } as RefereeCreate
        await createReferee(createData)
        toast({
          title: "Árbitro creado",
          description: "El árbitro se creó correctamente",
        })
      }
      onSubmit?.()
      onCancel()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo guardar el árbitro",
        variant: "destructive",
      })
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{referee ? "Editar Árbitro" : "Nuevo Árbitro"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Nombre completo del árbitro"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="license_number">Número de Licencia</Label>
                <Input
                  id="license_number"
                  placeholder="LIC-2024-001"
                  value={formData.license_number}
                  onChange={(e) => handleChange("license_number", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+34 600 000 000"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
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
                    <SelectItem value="nacional">Nacional</SelectItem>
                    <SelectItem value="regional">Regional</SelectItem>
                    <SelectItem value="provincial">Provincial</SelectItem>
                    <SelectItem value="local">Local</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">Especialización</Label>
                <Select value={formData.specialization} onValueChange={(value) => handleChange("specialization", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar especialización" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fútbol 11">Fútbol 11</SelectItem>
                    <SelectItem value="Fútbol Sala">Fútbol Sala</SelectItem>
                    <SelectItem value="Fútbol Playa">Fútbol Playa</SelectItem>
                    <SelectItem value="Fútbol Femenino">Fútbol Femenino</SelectItem>
                    <SelectItem value="Fútbol Juvenil">Fútbol Juvenil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience_years">Años de Experiencia</Label>
                <div className="relative">
                  <Star className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="experience_years"
                    type="number"
                    placeholder="0"
                    value={formData.experience_years}
                    onChange={(e) => handleChange("experience_years", parseInt(e.target.value) || 0)}
                    className="pl-10"
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="available">Disponibilidad</Label>
                <div className="flex items-center space-x-2 h-10">
                  <Checkbox
                    id="available"
                    checked={formData.available}
                    onCheckedChange={(checked) => handleChange("available", checked as boolean)}
                  />
                  <Label htmlFor="available" className="text-sm font-normal">
                    Disponible para asignaciones
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea
              id="notes"
              placeholder="Información adicional sobre el árbitro..."
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {referee ? "Actualizar Árbitro" : "Crear Árbitro"}
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
