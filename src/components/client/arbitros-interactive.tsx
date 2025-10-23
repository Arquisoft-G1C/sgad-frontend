"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefereeForm } from "@/components/referees/referee-form"
import { RefereeFilters } from "@/components/referees/referee-filters"
import { RefereeList } from "@/components/referees/referee-list"
import { useReferees } from "@/hooks/use-referees"
import { Referee } from "@/services"
import { useToast } from "@/hooks/use-toast"

interface ArbitrosInteractiveProps {
    onCreateReferee: () => void
    onEditReferee: (referee: any) => void
    onDeleteReferee: (refereeId: number) => void
    onViewDetails: (referee: any) => void
    onRefresh: () => void
}

export function ArbitrosInteractive({
    onCreateReferee,
    onEditReferee,
    onDeleteReferee,
    onViewDetails,
    onRefresh
}: ArbitrosInteractiveProps) {
    const { deleteReferee } = useReferees()
    const { toast } = useToast()
    const [showForm, setShowForm] = useState(false)
    const [editingReferee, setEditingReferee] = useState<Referee | null>(null)
    const [filters, setFilters] = useState({
        search: "",
        category: "",
        status: "",
        specialization: "",
        availability: "",
    })

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const handleClearFilters = () => {
        setFilters({
            search: "",
            category: "",
            status: "",
            specialization: "",
            availability: "",
        })
    }

    const handleCreateReferee = () => {
        setEditingReferee(null)
        setShowForm(true)
        onCreateReferee()
    }

    const handleEditReferee = (referee: any) => {
        setEditingReferee(referee)
        setShowForm(true)
        onEditReferee(referee)
    }

    const handleSubmitReferee = () => {
        setShowForm(false)
        setEditingReferee(null)
    }

    const handleDeleteReferee = async (refereeId: number) => {
        if (confirm("¿Estás seguro de que deseas eliminar este árbitro?")) {
            try {
                await deleteReferee(refereeId)
                toast({
                    title: "Árbitro eliminado",
                    description: "El árbitro se eliminó correctamente",
                })
                onRefresh()
            } catch (error) {
                toast({
                    title: "Error",
                    description: "No se pudo eliminar el árbitro",
                    variant: "destructive",
                })
            }
        }
        onDeleteReferee(refereeId)
    }

    const handleViewDetails = (referee: any) => {
        onViewDetails(referee)
    }

    const handleCancelForm = () => {
        setShowForm(false)
        setEditingReferee(null)
    }

    return (
        <>
            {/* Form */}
            {showForm && (
                <RefereeForm
                    referee={editingReferee ?? undefined}
                    onSubmit={handleSubmitReferee}
                    onCancel={handleCancelForm}
                />
            )}

            {/* Filters */}
            <RefereeFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
            />

            {/* Referee List */}
            <RefereeList
                filters={filters}
                onEdit={handleEditReferee}
                onDelete={handleDeleteReferee}
                onViewDetails={handleViewDetails}
                onRefresh={onRefresh}
            />
        </>
    )
}
