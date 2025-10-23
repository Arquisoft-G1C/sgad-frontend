"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { MatchForm } from "@/components/matches/match-form"
import { MatchFilters } from "@/components/matches/match-filters"
import { MatchList } from "@/components/matches/match-list"
import { Plus, Calendar } from "lucide-react"
import { useMatches } from "@/hooks/use-matches"
import { Match } from "@/services"
import { useToast } from "@/hooks/use-toast"

export default function PartidosPage() {
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
  }

  const handleEditMatch = (match: any) => {
    setEditingMatch(match)
    setShowForm(true)
  }

  const handleSubmitMatch = () => {
    // Form now handles submission internally
    setShowForm(false)
    setEditingMatch(null)
  }

  const handleRefresh = () => {
    // Trigger refresh of match list by toggling a key
    window.location.reload()
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
  }

  const handleAssignReferee = (matchId: number) => {
    console.log("Assigning referee to match:", matchId)
    // Here you would typically open assignment modal
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingMatch(null)
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
                <Calendar className="h-8 w-8" />
                Gestión de Partidos
              </h1>
              <p className="text-muted-foreground">Administra todos los partidos del sistema</p>
            </div>
            <Button onClick={handleCreateMatch}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Partido
            </Button>
          </div>

          {/* Form */}
          {showForm && <MatchForm match={editingMatch} onSubmit={handleSubmitMatch} onCancel={handleCancelForm} />}

          {/* Filters */}
          <MatchFilters filters={filters} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />

          {/* Match List */}
          <MatchList
            filters={filters}
            onEdit={handleEditMatch}
            onDelete={handleDeleteMatch}
            onAssign={handleAssignReferee}
            onRefresh={handleRefresh}
          />
        </div>
      </main>
    </div>
  )
}
