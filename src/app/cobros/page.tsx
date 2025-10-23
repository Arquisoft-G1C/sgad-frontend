import { Sidebar } from "@/components/sidebar"
import { CobrosClient } from "@/components/client/cobros-client"
import { getMatchesServer, getRefereesServer } from "@/lib/server-api"

export default async function CobrosPage() {
  // Fetch initial data on the server
  const [matches, referees] = await Promise.all([
    getMatchesServer({ limit: 100 }),
    getRefereesServer({ limit: 100 })
  ])

  // Generate payment data based on matches and referees
  const completedMatches = matches.filter(m => m.status === 'completed')

  const payments = completedMatches.map(match => {
    const referee = referees.find(r => r.id === match.referee_id)
    return {
      id: match.id,
      refereeId: match.referee_id,
      refereeName: referee?.name || 'Sin asignar',
      matchDescription: `${match.home_team} vs ${match.away_team}`,
      date: match.date,
      amount: 150, // Base amount, can be calculated based on category
      status: 'pending' as const,
      category: match.category,
    }
  })

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 space-y-6">
          <CobrosClient
            initialPayments={payments}
            initialReferees={referees}
          />
        </div>
      </main>
    </div>
  )
}
