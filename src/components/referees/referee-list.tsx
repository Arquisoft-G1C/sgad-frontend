"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Mail,
    Phone,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    Star,
    Users,
    Loader2,
} from "lucide-react"
import { useReferees } from "@/hooks/use-referees"
import { Referee } from "@/services"

const categoryColors = {
    nacional: "default",
    regional: "secondary",
    provincial: "outline",
    local: "outline",
} as const

const statusColors = {
    active: "default",
    inactive: "destructive",
    suspended: "secondary",
} as const

const statusLabels = {
    active: "Activo",
    inactive: "Inactivo",
    suspended: "Suspendido",
}

interface RefereeListProps {
    filters: any
    onEdit: (referee: Referee) => void
    onDelete: (refereeId: number) => void
    onViewDetails: (referee: Referee) => void
    onRefresh?: () => void
}

export function RefereeList({
    filters,
    onEdit,
    onDelete,
    onViewDetails,
    onRefresh,
}: RefereeListProps) {
    const { fetchReferees, loading, error } = useReferees()
    const [referees, setReferees] = useState<Referee[]>([])

    useEffect(() => {
        loadReferees()
    }, [])

    const loadReferees = async () => {
        try {
            const data = await fetchReferees()
            console.log("✅ Datos recibidos de API Gateway:", data)
            setReferees(data)
        } catch (err) {
            console.error("Error loading referees:", err)
        }
    }

    const handleDelete = async (refereeId: number) => {
        onDelete(refereeId)
        await loadReferees()
        onRefresh?.()
    }

    // 🔒 Protección contra undefined/null en filtros
    const filteredReferees = referees.filter((referee) => {
        const name = referee.account_holder ?? ""
        if (filters.search && !name.toLowerCase().includes(filters.search.toLowerCase())) {
            return false
        }
        if (filters.category && referee.category !== filters.category) return false
        if (filters.status && referee.status !== filters.status) return false
        if (filters.specialization && referee.specialization !== filters.specialization) return false
        return true
    })

    // 🧩 Versión robusta de getInitials
    const getInitials = (name?: string) => {
        if (!name || typeof name !== "string" || name.trim() === "") {
            return "??"
        }
        const parts = name.trim().split(" ")
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        }
        return name.substring(0, 2).toUpperCase()
    }

    if (loading) {
        return (
            <Card>
                <CardContent className="p-12 text-center">
                    <Loader2 className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-spin" />
                    <p className="text-muted-foreground">Cargando árbitros...</p>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card>
                <CardContent className="p-12 text-center">
                    <Users className="h-12 w-12 mx-auto text-destructive mb-4" />
                    <h3 className="text-lg font-medium mb-2 text-destructive">Error al cargar árbitros</h3>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Button onClick={loadReferees} variant="outline">
                        Reintentar
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {filteredReferees.map((referee) => (
                <Card key={referee.id}>
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        {getInitials(referee.account_holder)}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-semibold">
                                            {referee.account_holder || "Sin nombre"}
                                        </h3>
                                        <Badge
                                            variant={
                                                statusColors[referee.status as keyof typeof statusColors]
                                            }
                                        >
                                            {statusLabels[referee.status as keyof typeof statusLabels]}
                                        </Badge>
                                        <Badge
                                            variant={
                                                categoryColors[
                                                referee.category as keyof typeof categoryColors
                                                ]
                                            }
                                        >
                                            {referee.category?.toUpperCase() || "N/A"}
                                        </Badge>
                                        {referee.available && (
                                            <Badge
                                                variant="outline"
                                                className="text-green-600 border-green-600"
                                            >
                                                Disponible
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Mail className="h-4 w-4" />
                                            {referee.email || "Sin correo"}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Phone className="h-4 w-4" />
                                            {referee.phone || "Sin teléfono"}
                                        </div>
                                        {referee.license_number && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-muted-foreground">Licencia:</span>
                                                <span className="font-medium">
                                                    {referee.license_number}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-6 text-sm">
                                        {referee.experience_years && (
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 text-chart-3" />
                                                <span className="text-muted-foreground">
                                                    Experiencia:
                                                </span>
                                                <span className="font-medium">
                                                    {referee.experience_years} años
                                                </span>
                                            </div>
                                        )}
                                        {referee.rating && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-muted-foreground">Valoración:</span>
                                                <span className="font-medium">{referee.rating}/5</span>
                                            </div>
                                        )}
                                    </div>

                                    {referee.specialization && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-muted-foreground">
                                                Especialización:
                                            </span>
                                            <Badge variant="outline" className="text-xs">
                                                {referee.specialization}
                                            </Badge>
                                        </div>
                                    )}

                                    {referee.notes && (
                                        <div className="text-sm text-muted-foreground">
                                            <span className="font-medium">Notas:</span>{" "}
                                            {referee.notes}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => onViewDetails(referee)}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        Ver detalles
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onEdit(referee)}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleDelete(referee.id)}
                                        className="text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Eliminar
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardContent>
                </Card>
            ))}

            {filteredReferees.length === 0 && (
                <Card>
                    <CardContent className="p-12 text-center">
                        <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                            No se encontraron árbitros
                        </h3>
                        <p className="text-muted-foreground">
                            No hay árbitros que coincidan con los filtros seleccionados.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
