"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Euro, TrendingUp, Clock, CheckCircle } from "lucide-react"

const paymentStats = [
  {
    title: "Total Este Mes",
    value: "€12,450",
    description: "+15% vs mes anterior",
    icon: Euro,
    color: "text-chart-1",
  },
  {
    title: "Pagos Pendientes",
    value: "€3,200",
    description: "8 árbitros",
    icon: Clock,
    color: "text-chart-4",
  },
  {
    title: "Pagos Procesados",
    value: "€9,250",
    description: "15 árbitros",
    icon: CheckCircle,
    color: "text-chart-3",
  },
  {
    title: "Promedio por Partido",
    value: "€145",
    description: "Basado en categoría",
    icon: TrendingUp,
    color: "text-chart-2",
  },
]

export function PaymentSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {paymentStats.map((stat) => (
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
