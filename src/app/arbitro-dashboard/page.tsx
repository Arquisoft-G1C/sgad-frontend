import { Sidebar } from "@/components/sidebar"
import { ArbitroDashboardClient } from "@/components/client/arbitro-dashboard-client"
import { getMatchesServer, getRefereeServer } from "@/lib/server-api"
import { getUserDataCookie } from "@/lib/auth-cookies"
import { redirect } from "next/navigation"

export default async function ArbitroDashboard() {
    // Get current user from cookie
    const userData = await getUserDataCookie()

    // Redirect if not authenticated or not a referee
    if (!userData || userData.role !== 'referee') {
        redirect('/login')
    }

    // Fetch referee-specific data
    const [refereeData, assignedMatches, allMatches] = await Promise.all([
        getRefereeServer(userData.refereeId || 1), // Use actual referee ID from user data
        getMatchesServer({ referee_id: userData.refereeId || 1 }),
        getMatchesServer({ limit: 100 })
    ])

    return (
        <div className="flex h-screen bg-background">
            <Sidebar />

            <main className="flex-1 md:ml-64 overflow-auto">
                <div className="p-6 space-y-6">
                    <ArbitroDashboardClient
                        refereeData={refereeData}
                        assignedMatches={assignedMatches}
                        allMatches={allMatches}
                    />
                </div>
            </main>
        </div>
    )
}
