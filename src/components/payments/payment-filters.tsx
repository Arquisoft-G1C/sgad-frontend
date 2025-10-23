"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"

interface PaymentFiltersProps {
  filters: {
    search: string
    status: string
    period: string
    amount: string
  }
  onFilterChange: (key: string, value: string) => void
  onClearFilters: () => void
}

export function PaymentFilters({ filters, onFilterChange, onClearFilters }: PaymentFiltersProps) {
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

          <Select value={filters.status} onValueChange={(value) => onFilterChange("status", value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="processing">Procesando</SelectItem>
              <SelectItem value="paid">Pagado</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.period} onValueChange={(value) => onFilterChange("period", value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Enero 2024">Enero 2024</SelectItem>
              <SelectItem value="Diciembre 2023">Diciembre 2023</SelectItem>
              <SelectItem value="Noviembre 2023">Noviembre 2023</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.amount} onValueChange={(value) => onFilterChange("amount", value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Monto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="0-200">€0 - €200</SelectItem>
              <SelectItem value="200-500">€200 - €500</SelectItem>
              <SelectItem value="500+">€500+</SelectItem>
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
