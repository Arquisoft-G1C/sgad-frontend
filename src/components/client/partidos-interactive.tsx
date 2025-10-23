"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MatchForm } from "@/components/matches/match-form"
import { MatchFilters } from "@/components/matches/match-filters"
import { MatchList } from "@/components/matches/match-list"
import { useMatches } from "@/hooks/use-matches"
import { Match } from "@/services"
import { useToast } from "@/hooks/use-toast"

interface PartidosInteractiveProps {
    onCreateMatch: () => void
    onEditMatch: (match: any) => void
    onDeleteMatch: (matchId: number) => void
    onAssignReferee: (matchId: number) => void
    onRefresh: () => void
}

export function PartidosInteractive({
    onCreateMatch,
    onEditMatch,
    onDeleteMatch,
    onAssignReferee,
    onRefresh
}: PartidosInteractiveProps) {
    const { deleteMatch } = useMatches()
    const { toast } = useToast()
    const [showForm, setShowForm] = useState(false)
    const [editingMatch, setEditingMatch] = useState<Match | null>(null)
    const [filters, setFilters] = useState({
        search: "",
        date: "",
        category: "",
        status: "",
        competition: "",
    })

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const handleClearFilters = () => {
        setFilters({
            search: "",
            date: "",
            category: "",
            status: "",
            competition: "",
        })
    }

    const handleCreateMatch = () => {
        setEditingMatch(null)
        setShowForm(true)
        onCreateMatch()
    }

    const handleEditMatch = (match: any) => {
        setEditingMatch(match)
        setShowForm(true)
        onEditMatch(match)
    }

    const handleSubmitMatch = () => {
        setShowForm(false)
        setEditingMatch(null)
    }

    const handleRefresh = () => {
        window.location.reload()
        onRefresh()
    }

    const handleDeleteMatch = async (matchId: number) => {
        if (confirm("¿Estás seguro de que deseas eliminar este partido?")) {
            try {
                await deleteMatch(matchId)
                toast({
                    title: "Partido eliminado",
                    description: "El partido se eliminó correctamente",
                })
                handleRefresh()
            } catch (error) {
                toast({
                    title: "Error",
                    description: "No se pudo eliminar el partido",
                    variant: "destructive",
                })
            }
        }
        onDeleteMatch(matchId)
    }

    const handleAssignReferee = (matchId: number) => {
        onAssignReferee(matchId)
    }

    const handleCancelForm = () => {
        setShowForm(false)
        setEditingMatch(null)
    }

    return (
        <>
            {/* Form */}
            {showForm && (
                <MatchForm
                    match={editingMatch ?? undefined}
                    onSubmit={handleSubmitMatch}
                    onCancel={handleCancelForm}
                />
            )}

            {/* Filters */}
            <MatchFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
            />

            {/* Match List */}
            <MatchList
                filters={filters}
                onEdit={handleEditMatch}
                onDelete={handleDeleteMatch}
                onAssign={handleAssignReferee}
                onRefresh={handleRefresh}
            />
        </>
    )
}
