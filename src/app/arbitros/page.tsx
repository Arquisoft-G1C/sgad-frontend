import { Sidebar } from "@/components/sidebar"
import { PageHeader } from "@/components/server/page-header"
import { ArbitrosClient } from "@/components/client/arbitros-client"
import { getRefereesServer } from "@/lib/server-api"

export default async function ArbitrosPage() {
  // Fetch initial data on the server
  const initialReferees = await getRefereesServer({ limit: 100 })

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 space-y-6">
          <PageHeader
            title="Gestión de Árbitros"
            description="Administra todos los árbitros del sistema"
          />

          <ArbitrosClient initialReferees={initialReferees} />
        </div>
      </main>
    </div>
  )
}
