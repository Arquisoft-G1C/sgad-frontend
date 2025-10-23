import { Sidebar } from "@/components/sidebar"
import { PageHeader } from "@/components/server/page-header"
import { PartidosClient } from "@/components/client/partidos-client"
import { getMatchesServer, getRefereesServer } from "@/lib/server-api"

export default async function PartidosPage() {
  // Fetch initial data on the server
  const [initialMatches, initialReferees] = await Promise.all([
    getMatchesServer({ limit: 100 }),
    getRefereesServer({ limit: 100 })
  ])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 space-y-6">
          <PageHeader
            title="Gestión de Partidos"
            description="Administra todos los partidos del sistema"
          />

          <PartidosClient
            initialMatches={initialMatches}
            initialReferees={initialReferees}
          />
        </div>
      </main>
    </div>
  )
}
