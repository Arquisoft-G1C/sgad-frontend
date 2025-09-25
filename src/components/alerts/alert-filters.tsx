"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"

interface AlertFiltersProps {
  filters: {
    search: string
    type: string
    severity: string
    status: string
    dateRange: string
  }
  onFilterChange: (key: string, value: string) => void
  onClearFilters: () => void
}

export function AlertFilters({ filters, onFilterChange, onClearFilters }: AlertFiltersProps) {
  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar alertas..."
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

          <Select value={filters.type} onValueChange={(value) => onFilterChange("type", value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="conflict">Conflictos</SelectItem>
              <SelectItem value="unassigned">Sin asignar</SelectItem>
              <SelectItem value="availability">Disponibilidad</SelectItem>
              <SelectItem value="schedule">Horario</SelectItem>
              <SelectItem value="venue">Lugar</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.severity} onValueChange={(value) => onFilterChange("severity", value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Severidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="low">Baja</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.status} onValueChange={(value) => onFilterChange("status", value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activas</SelectItem>
              <SelectItem value="resolved">Resueltas</SelectItem>
              <SelectItem value="dismissed">Descartadas</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.dateRange} onValueChange={(value) => onFilterChange("dateRange", value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todo</SelectItem>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
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
