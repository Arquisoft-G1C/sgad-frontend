"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"

interface MatchFiltersProps {
  filters: {
    search: string
    date: string
    category: string
    status: string
    competition: string
  }
  onFilterChange: (key: string, value: string) => void
  onClearFilters: () => void
}

export function MatchFilters({ filters, onFilterChange, onClearFilters }: MatchFiltersProps) {
  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar partidos..."
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

          <Select value={filters.date} onValueChange={(value) => onFilterChange("date", value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Fecha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las fechas</SelectItem>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="tomorrow">Mañana</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.category} onValueChange={(value) => onFilterChange("category", value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="primera">Primera</SelectItem>
              <SelectItem value="segunda">Segunda</SelectItem>
              <SelectItem value="tercera">Tercera</SelectItem>
              <SelectItem value="juvenil">Juvenil</SelectItem>
              <SelectItem value="infantil">Infantil</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.status} onValueChange={(value) => onFilterChange("status", value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="assigned">Asignado</SelectItem>
              <SelectItem value="unassigned">Sin asignar</SelectItem>
              <SelectItem value="completed">Completado</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.competition} onValueChange={(value) => onFilterChange("competition", value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Competición" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="liga">Liga</SelectItem>
              <SelectItem value="copa">Copa</SelectItem>
              <SelectItem value="playoff">Playoff</SelectItem>
              <SelectItem value="amistoso">Amistoso</SelectItem>
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
