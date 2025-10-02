import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, UserCheck, AlertTriangle } from "lucide-react"

const stats = [
  {
    title: "Partidos Hoy",
    value: "12",
    description: "3 sin asignar",
    icon: Calendar,
    color: "text-chart-1",
  },
  {
    title: "Árbitros Activos",
    value: "45",
    description: "8 disponibles hoy",
    icon: Users,
    color: "text-chart-2",
  },
  {
    title: "Asignaciones",
    value: "9",
    description: "de 12 partidos",
    icon: UserCheck,
    color: "text-chart-3",
  },
  {
    title: "Conflictos",
    value: "2",
    description: "requieren atención",
    icon: AlertTriangle,
    color: "text-chart-4",
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
