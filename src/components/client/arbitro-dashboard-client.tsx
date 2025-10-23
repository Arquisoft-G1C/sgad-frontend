"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ArbitroAgenda } from "@/components/arbitro-agenda"
import { Badge } from "@/components/ui/badge"

interface ArbitroDashboardClientProps {
    refereeData: any
    assignedMatches: any[]
    allMatches: any[]
}

export function ArbitroDashboardClient({ refereeData, assignedMatches, allMatches }: ArbitroDashboardClientProps) {
    // Convert matches to calendar events
    const events = assignedMatches.map(match => {
        const matchDate = new Date(match.date)
        const [hours, minutes] = match.time.split(':')
        matchDate.setHours(parseInt(hours), parseInt(minutes))

        const endDate = new Date(matchDate)
        endDate.setHours(endDate.getHours() + 2) // Assume 2 hour duration

        return {
            title: `${match.home_team} vs ${match.away_team}`,
            start: matchDate,
            end: endDate,
            valor: "$150", // Can be calculated based on match category
            location: match.location,
        }
    })
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        Agenda de Partidos - {refereeData?.name}
                    </h1>
                    <p className="text-muted-foreground">
                        Consulta tus próximos compromisos y valores a cobrar
                    </p>
                </div>
                <div className="flex gap-2">
                    <Badge variant={refereeData?.available ? "default" : "secondary"}>
                        {refereeData?.available ? "Disponible" : "No disponible"}
                    </Badge>
                    <Badge variant="outline">{refereeData?.category}</Badge>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Partidos Asignados
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{assignedMatches.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Próximos Partidos
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {assignedMatches.filter(m => new Date(m.date) >= new Date()).length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Ingresos Estimados
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${assignedMatches.length * 150}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Calendario dentro de un Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Calendario</CardTitle>
                    <CardDescription>
                        Visualiza tus partidos por día, semana o mes
                    </CardDescription>
                </CardHeader>
                <CardContent className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                    <ArbitroAgenda events={events} />
                </CardContent>
            </Card>
        </div>
    )
}
