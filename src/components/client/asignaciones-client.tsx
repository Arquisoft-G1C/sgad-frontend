"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssignmentWizard } from "@/components/assignments/assignment-wizard"
import { AssignmentCalendar } from "@/components/assignments/assignment-calendar"
import { AssignmentList } from "@/components/assignments/assignment-list"
import { Plus } from "lucide-react"

interface AsignacionesClientProps {
    initialMatches: any[]
    initialReferees: any[]
    availableReferees: any[]
}

export function AsignacionesClient({ initialMatches, initialReferees, availableReferees }: AsignacionesClientProps) {
    const [matches, setMatches] = useState(initialMatches)
    const [referees, setReferees] = useState(initialReferees)
    const [showWizard, setShowWizard] = useState(false)
    const [selectedMatch, setSelectedMatch] = useState(null)

    const handleCreateAssignment = () => {
        setSelectedMatch(null)
        setShowWizard(true)
    }

    const handleAssignToMatch = (assignment: any) => {
        setSelectedMatch(assignment.match)
        setShowWizard(true)
    }

    const handleSubmitAssignment = (data: any) => {
        console.log("Submitting assignment:", data)
        // Here you would typically save to your backend
        setShowWizard(false)
        setSelectedMatch(null)
    }

    const handleEditAssignment = (assignment: any) => {
        console.log("Editing assignment:", assignment)
        // Here you would typically open edit modal
    }

    const handleDeleteAssignment = (assignmentId: number) => {
        console.log("Deleting assignment:", assignmentId)
        // Here you would typically delete from your backend
    }

    const handleCancelWizard = () => {
        setShowWizard(false)
        setSelectedMatch(null)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        Sistema de Asignaciones
                    </h1>
                    <p className="text-muted-foreground">Gestiona las asignaciones de árbitros a partidos</p>
                </div>
                <Button onClick={handleCreateAssignment}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Asignación
                </Button>
            </div>

            {/* Assignment Wizard */}
            {showWizard && (
                <AssignmentWizard match={selectedMatch} onSubmit={handleSubmitAssignment} onCancel={handleCancelWizard} />
            )}

            {/* Tabs */}
            <Tabs defaultValue="calendar" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="calendar" className="flex items-center gap-2">
                        Calendario
                    </TabsTrigger>
                    <TabsTrigger value="list" className="flex items-center gap-2">
                        Lista
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="calendar">
                    <AssignmentCalendar />
                </TabsContent>

                <TabsContent value="list">
                    <AssignmentList
                        onEdit={handleEditAssignment}
                        onDelete={handleDeleteAssignment}
                        onAssign={handleAssignToMatch}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}
