import { Sidebar } from "@/components/sidebar"
import { AsignacionesClient } from "@/components/client/asignaciones-client"
import { getMatchesServer, getRefereesServer, getAvailableRefereesServer } from "@/lib/server-api"

export default async function AsignacionesPage() {
  // Fetch initial data on the server
  const [initialMatches, initialReferees, availableReferees] = await Promise.all([
    getMatchesServer({ limit: 100 }),
    getRefereesServer({ limit: 100 }),
    getAvailableRefereesServer()
  ])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 space-y-6">
          <AsignacionesClient
            initialMatches={initialMatches}
            initialReferees={initialReferees}
            availableReferees={availableReferees}
          />
        </div>
      </main>
    </div>
  )
}
