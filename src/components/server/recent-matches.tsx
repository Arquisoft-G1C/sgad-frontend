import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"
import { getMatchesServer } from "@/lib/server-api"

export async function RecentMatches() {
    const allMatches = await getMatchesServer({ limit: 100 })

    // Filter today's matches
    const today = new Date().toISOString().split('T')[0]
    const todayMatches = allMatches
        .filter(m => m.date === today)
        .slice(0, 4)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Partidos de Hoy</CardTitle>
            </CardHeader>
            <CardContent>
                {todayMatches.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No hay partidos programados para hoy</p>
                ) : (
                    <div className="space-y-4">
                        {todayMatches.map((match) => (
                            <div key={match.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                                <div className="space-y-1">
                                    <p className="font-medium">{match.home_team} vs {match.away_team}</p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {match.time}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            {match.location}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right space-y-1">
                                    <Badge variant={match.referee_id ? "default" : "destructive"}>
                                        {match.referee_id ? "Asignado" : "Sin asignar"}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

