"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PartidosInteractive } from "@/components/client/partidos-interactive"
import { Match } from "@/lib/server-api"

interface PartidosClientProps {
    initialMatches: Match[]
    initialReferees: any[]
}

export function PartidosClient({ initialMatches, initialReferees }: PartidosClientProps) {
    const [matches, setMatches] = useState(initialMatches)

    const handleCreateMatch = () => {
        console.log("Creating match")
    }

    const handleEditMatch = (match: any) => {
        console.log("Editing match:", match)
    }

    const handleDeleteMatch = (matchId: number) => {
        console.log("Deleting match:", matchId)
    }

    const handleAssignReferee = (matchId: number) => {
        console.log("Assigning referee to match:", matchId)
    }

    const handleRefresh = async () => {
        // Refresh data from client
        const response = await fetch('/api/matches')
        if (response.ok) {
            const data = await response.json()
            setMatches(data)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Button onClick={handleCreateMatch}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Partido
                </Button>
            </div>

            <PartidosInteractive
                matches={matches}
                referees={initialReferees}
                onCreateMatch={handleCreateMatch}
                onEditMatch={handleEditMatch}
                onDeleteMatch={handleDeleteMatch}
                onAssignReferee={handleAssignReferee}
                onRefresh={handleRefresh}
            />
        </div>
    )
}
