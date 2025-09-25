import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"

const matches = [
  {
    id: 1,
    teams: "Real Madrid vs Barcelona",
    time: "15:00",
    venue: "Estadio Santiago Bernabéu",
    referee: "Carlos Pérez",
    status: "assigned",
  },
  {
    id: 2,
    teams: "Atlético vs Valencia",
    time: "17:30",
    venue: "Wanda Metropolitano",
    referee: null,
    status: "unassigned",
  },
  {
    id: 3,
    teams: "Sevilla vs Betis",
    time: "20:00",
    venue: "Ramón Sánchez-Pizjuán",
    referee: "María González",
    status: "assigned",
  },
  {
    id: 4,
    teams: "Athletic vs Real Sociedad",
    time: "21:45",
    venue: "San Mamés",
    referee: null,
    status: "unassigned",
  },
]

export function RecentMatches() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Partidos de Hoy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.map((match) => (
            <div key={match.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="space-y-1">
                <p className="font-medium">{match.teams}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {match.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {match.venue}
                  </div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <Badge variant={match.status === "assigned" ? "default" : "destructive"}>
                  {match.status === "assigned" ? "Asignado" : "Sin asignar"}
                </Badge>
                {match.referee && <p className="text-sm text-muted-foreground">{match.referee}</p>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
