import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, UserCheck, AlertTriangle } from "lucide-react"
import { getDashboardStatsServer } from "@/lib/server-api"

export async function DashboardStats() {
    const stats = await getDashboardStatsServer()

    const statsConfig = [
        {
            title: "Partidos Hoy",
            value: stats.todayMatches.toString(),
            description: `${stats.unassignedMatches} sin asignar`,
            icon: Calendar,
            color: "text-chart-1",
        },
        {
            title: "Árbitros Activos",
            value: stats.activeReferees.toString(),
            description: `${stats.availableReferees} disponibles hoy`,
            icon: Users,
            color: "text-chart-2",
        },
        {
            title: "Asignaciones",
            value: stats.assignedMatches.toString(),
            description: `de ${stats.todayMatches} partidos`,
            icon: UserCheck,
            color: "text-chart-3",
        },
        {
            title: "Conflictos",
            value: stats.conflicts.toString(),
            description: "requieren atención",
            icon: AlertTriangle,
            color: "text-chart-4",
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsConfig.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {stat.title}
                        </CardTitle>
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

