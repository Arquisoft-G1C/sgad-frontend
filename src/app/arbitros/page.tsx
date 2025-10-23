"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { RefereeForm } from "@/components/referees/referee-form"
import { RefereeFilters } from "@/components/referees/referee-filters"
import { RefereeList } from "@/components/referees/referee-list"
import { Plus, Users } from "lucide-react"
import { useReferees } from "@/hooks/use-referees"
import { Referee } from "@/services"
import { useToast } from "@/hooks/use-toast"

export default function ArbitrosPage() {
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
  }

  const handleEditReferee = (referee: any) => {
    setEditingReferee(referee)
    setShowForm(true)
  }

  const handleSubmitReferee = () => {
    // Form now handles submission internally
    setShowForm(false)
    setEditingReferee(null)
  }

  const handleRefresh = () => {
    // Trigger refresh of referee list
    window.location.reload()
  }

  const handleDeleteReferee = async (refereeId: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este árbitro?")) {
      try {
        await deleteReferee(refereeId)
        toast({
          title: "Árbitro eliminado",
          description: "El árbitro se eliminó correctamente",
        })
        handleRefresh()
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo eliminar el árbitro",
          variant: "destructive",
        })
      }
    }
  }

  const handleViewDetails = (referee: any) => {
    console.log("Viewing referee details:", referee)
    // Here you would typically open a detailed view modal
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingReferee(null)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Users className="h-8 w-8" />
                Gestión de Árbitros
              </h1>
              <p className="text-muted-foreground">Administra todos los árbitros del sistema</p>
            </div>
            <Button onClick={handleCreateReferee}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Árbitro
            </Button>
          </div>

          {/* Form */}
          {showForm && (
            <RefereeForm referee={editingReferee} onSubmit={handleSubmitReferee} onCancel={handleCancelForm} />
          )}

          {/* Filters */}
          <RefereeFilters filters={filters} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />

          {/* Referee List */}
          <RefereeList
            filters={filters}
            onEdit={handleEditReferee}
            onDelete={handleDeleteReferee}
            onViewDetails={handleViewDetails}
            onRefresh={handleRefresh}
          />
        </div>
      </main>
    </div>
  )
}
