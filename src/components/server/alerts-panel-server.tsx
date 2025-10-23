import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock } from "lucide-react"
import { getMatchesServer, getRefereesServer } from "@/lib/server-api"

export async function AlertsPanelServer() {
    const [matches, referees] = await Promise.all([
        getMatchesServer({ limit: 100 }),
        getRefereesServer({ limit: 100 })
    ])

    const today = new Date().toISOString().split('T')[0]

    // Find unassigned matches for today
    const unassignedMatches = matches.filter(m => m.date === today && !m.referee_id)

    // Find unavailable referees
    const unavailableReferees = referees.filter(r => r.status === 'active' && !r.available)

    const alerts = [
        ...unassignedMatches.map(match => ({
            id: `match-${match.id}`,
            type: 'warning' as const,
            title: 'Partido sin asignar',
            description: `${match.home_team} vs ${match.away_team} - ${match.time}`,
            time: match.time,
        })),
        ...unavailableReferees.slice(0, 2).map(referee => ({
            id: `referee-${referee.id}`,
            type: 'info' as const,
            title: 'Árbitro no disponible',
            description: `${referee.name} - ${referee.category}`,
            time: 'Hoy',
        }))
    ].slice(0, 5)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Alertas y Notificaciones</CardTitle>
            </CardHeader>
            <CardContent>
                {alerts.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No hay alertas pendientes</p>
                ) : (
                    <div className="space-y-3">
                        {alerts.map((alert) => (
                            <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                                <AlertTriangle className={`h-4 w-4 mt-0.5 ${alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`} />
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium text-sm">{alert.title}</p>
                                        <Badge variant={alert.type === 'warning' ? 'destructive' : 'secondary'}>
                                            {alert.type === 'warning' ? 'Urgente' : 'Info'}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        {alert.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

