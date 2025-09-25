"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"

interface RefereeFiltersProps {
  filters: {
    search: string
    category: string
    status: string
    specialization: string
    availability: string
  }
  onFilterChange: (key: string, value: string) => void
  onClearFilters: () => void
}

export function RefereeFilters({ filters, onFilterChange, onClearFilters }: RefereeFiltersProps) {
  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar árbitros..."
                value={filters.search}
                onChange={(e) => onFilterChange("search", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filtros:</span>
          </div>

          <Select value={filters.category} onValueChange={(value) => onFilterChange("category", value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="nacional">Nacional</SelectItem>
              <SelectItem value="regional">Regional</SelectItem>
              <SelectItem value="provincial">Provincial</SelectItem>
              <SelectItem value="local">Local</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.status} onValueChange={(value) => onFilterChange("status", value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
              <SelectItem value="suspended">Suspendido</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.specialization} onValueChange={(value) => onFilterChange("specialization", value)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Especialización" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="Fútbol 11">Fútbol 11</SelectItem>
              <SelectItem value="Fútbol Sala">Fútbol Sala</SelectItem>
              <SelectItem value="Fútbol Playa">Fútbol Playa</SelectItem>
              <SelectItem value="Fútbol Femenino">Fútbol Femenino</SelectItem>
              <SelectItem value="Fútbol Juvenil">Fútbol Juvenil</SelectItem>
              <SelectItem value="Fútbol Base">Fútbol Base</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.availability} onValueChange={(value) => onFilterChange("availability", value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Disponibilidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="weekend">Fin de semana</SelectItem>
              <SelectItem value="weekdays">Entre semana</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
