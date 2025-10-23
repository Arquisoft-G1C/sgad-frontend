import { Sidebar } from "@/components/sidebar"
import { ConfiguracionClient } from "@/components/client/configuracion-client"

export default function ConfiguracionPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 space-y-6">
          <ConfiguracionClient />
        </div>
      </main>
    </div>
  )
}
