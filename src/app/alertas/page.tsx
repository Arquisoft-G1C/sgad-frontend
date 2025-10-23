import { Sidebar } from "@/components/sidebar"
import { AlertasHeader } from "@/components/server/alertas-header"
import { AlertasClient } from "@/components/client/alertas-client"
import { getMatchesServer, getRefereesServer } from "@/lib/server-api"

export default async function AlertasPage() {
  // Fetch data to generate alerts on the server
  const [matches, referees] = await Promise.all([
    getMatchesServer({ limit: 100 }),
    getRefereesServer({ limit: 100 })
  ])

  const today = new Date().toISOString().split('T')[0]

  // Generate alerts from data
  const unassignedMatches = matches.filter(m => m.date === today && !m.referee_id)
  const unavailableReferees = referees.filter(r => r.status === 'active' && !r.available)

  const alerts = [
    ...unassignedMatches.map(match => ({
      id: `match-${match.id}`,
      type: 'warning' as const,
      title: 'Partido sin asignar',
      description: `${match.home_team} vs ${match.away_team}`,
      time: match.time,
      date: match.date,
      priority: 'high' as const,
      status: 'active' as const,
    })),
    ...unavailableReferees.map(referee => ({
      id: `referee-${referee.id}`,
      type: 'info' as const,
      title: 'Árbitro no disponible',
      description: `${referee.name} - ${referee.category}`,
      time: 'Hoy',
      date: today,
      priority: 'medium' as const,
      status: 'active' as const,
    }))
  ]

  const highPriorityCount = alerts.filter(a => a.priority === 'high').length
  const activeCount = alerts.filter(a => a.status === 'active').length

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 space-y-6">
          <AlertasHeader
            highPriorityCount={highPriorityCount}
            activeCount={activeCount}
          />

          <AlertasClient initialAlerts={alerts} />
        </div>
      </main>
    </div>
  )
}