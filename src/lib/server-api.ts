/**
 * Server-Side API Functions
 * These functions run ONLY on the server and should never be imported in client components
 * They provide server-side data fetching with proper caching and revalidation
 */

import { cookies } from "next/headers";

// Server-side API URLs (no NEXT_PUBLIC_ prefix - these are server-only)
// All services go through the API Gateway
const API_CONFIG = {
  API_GATEWAY: process.env.API_URL || "http://localhost:8080",
  AUTH_SERVICE: process.env.AUTH_SERVICE_URL || "http://localhost:8080",
  MATCH_SERVICE: process.env.MATCH_SERVICE_URL || "http://localhost:8080",
  REFEREE_SERVICE: process.env.REFEREE_SERVICE_URL || "http://localhost:8080",
  AVAILABILITY_SERVICE:
    process.env.AVAILABILITY_SERVICE_URL || "http://localhost:8080",
};

/**
 * Get auth token from cookies (server-side)
 */
export async function getServerAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("authToken")?.value || null;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
}

/**
 * Get headers for server-side requests
 */
async function getServerHeaders(): Promise<HeadersInit> {
  const token = await getServerAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// ============================================================================
// MATCH SERVICE
// ============================================================================

export interface Match {
  id: number;
  home_team: string;
  away_team: string;
  date: string;
  time: string;
  location: string;
  category: string;
  competition: string;
  status: string;
  referee_id?: number;
  notes?: string;
}

/**
 * Get all matches (server-side)
 * @param params Query parameters for filtering
 * @param options Caching options
 */
export async function getMatchesServer(
  params?: {
    skip?: number;
    limit?: number;
    referee_id?: number;
  },
  options?: {
    revalidate?: number | false;
    tags?: string[];
  }
): Promise<Match[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append("skip", params.skip.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.referee_id)
      queryParams.append("referee_id", params.referee_id.toString());

    // FastAPI expects trailing slashes - add it to prevent redirects
    const url = `${API_CONFIG.MATCH_SERVICE}/matches${
      queryParams.toString() ? `?${queryParams}` : "/"
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: await getServerHeaders(),
      next: {
        revalidate: options?.revalidate ?? 60, // Default: revalidate every 60 seconds
        tags: options?.tags ?? ["matches"],
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch matches:", response.statusText);
      return [];
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
}

/**
 * Get a single match by ID (server-side)
 */
export async function getMatchServer(
  id: number,
  options?: {
    revalidate?: number | false;
  }
): Promise<Match | null> {
  try {
    const response = await fetch(`${API_CONFIG.MATCH_SERVICE}/matches/${id}`, {
      method: "GET",
      headers: await getServerHeaders(),
      next: {
        revalidate: options?.revalidate ?? 30,
        tags: [`match-${id}`],
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch match:", response.statusText);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching match:", error);
    return null;
  }
}

/**
 * Get upcoming matches (server-side)
 */
export async function getUpcomingMatchesServer(
  limit: number = 10
): Promise<Match[]> {
  try {
    const matches = await getMatchesServer({ limit: 100 });
    const now = new Date();

    return matches
      .filter((match) => new Date(match.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    return [];
  }
}

// ============================================================================
// REFEREE SERVICE
// ============================================================================

export interface Referee {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: string;
  specialization: string;
  status: string;
  available: boolean;
  license_number?: string;
  experience_years?: number;
  rating?: number;
  notes?: string;
}

/**
 * Get all referees (server-side)
 */
export async function getRefereesServer(
  params?: {
    skip?: number;
    limit?: number;
  },
  options?: {
    revalidate?: number | false;
    tags?: string[];
  }
): Promise<Referee[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append("skip", params.skip.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    // Always use trailing slash to avoid FastAPI redirects
    const url = `${API_CONFIG.REFEREE_SERVICE}/referees/${
      queryParams.toString() ? `?${queryParams}` : ""
    }`;

    console.log("[SERVER] Fetching referees from:", url);
    console.log(
      "[SERVER] REFEREE_SERVICE_URL env:",
      process.env.REFEREE_SERVICE_URL
    );

    let response;
    try {
      response = await fetch(url, {
        method: "GET",
        headers: await getServerHeaders(),
        cache: "no-store",
      });
      console.log("[SERVER] Fetch successful, status:", response.status);
    } catch (fetchError: any) {
      console.error("[SERVER] Fetch error details:", {
        message: fetchError.message,
        cause: fetchError.cause,
        url: url,
      });
      throw fetchError;
    }

    if (!response.ok) {
      console.error("Failed to fetch referees:", response.statusText);
      return [];
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching referees:", error);
    return [];
  }
}

/**
 * Get a single referee by ID (server-side)
 */
export async function getRefereeServer(
  id: number,
  options?: {
    revalidate?: number | false;
  }
): Promise<Referee | null> {
  try {
    const response = await fetch(
      `${API_CONFIG.REFEREE_SERVICE}/referees/${id}`,
      {
        method: "GET",
        headers: await getServerHeaders(),
        next: {
          revalidate: options?.revalidate ?? 30,
          tags: [`referee-${id}`],
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch referee:", response.statusText);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching referee:", error);
    return null;
  }
}

/**
 * Get available referees (server-side)
 */
export async function getAvailableRefereesServer(): Promise<Referee[]> {
  try {
    const referees = await getRefereesServer({ limit: 100 });
    return referees.filter(
      (referee) => referee.available && referee.status === "active"
    );
  } catch (error) {
    console.error("Error fetching available referees:", error);
    return [];
  }
}

// ============================================================================
// DASHBOARD STATISTICS
// ============================================================================

export interface DashboardStats {
  todayMatches: number;
  unassignedMatches: number;
  activeReferees: number;
  availableReferees: number;
  assignedMatches: number;
  totalMatches: number;
  conflicts: number;
}

/**
 * Get dashboard statistics (server-side)
 * Aggregates data from multiple services
 */
export async function getDashboardStatsServer(): Promise<DashboardStats> {
  try {
    // Fetch data from multiple services in parallel
    const [matches, referees] = await Promise.all([
      getMatchesServer({ limit: 1000 }),
      getRefereesServer({ limit: 1000 }),
    ]);

    // Calculate today's date
    const today = new Date().toISOString().split("T")[0];

    // Filter today's matches
    const todayMatches = matches.filter((m) => m.date === today);
    const unassignedMatches = todayMatches.filter((m) => !m.referee_id);
    const assignedMatches = todayMatches.filter((m) => m.referee_id);

    // Count active and available referees
    const activeReferees = referees.filter((r) => r.status === "active");
    const availableReferees = referees.filter(
      (r) => r.available && r.status === "active"
    );

    // TODO: Implement conflict detection logic
    // For now, conflicts = 0
    const conflicts = 0;

    return {
      todayMatches: todayMatches.length,
      unassignedMatches: unassignedMatches.length,
      activeReferees: activeReferees.length,
      availableReferees: availableReferees.length,
      assignedMatches: assignedMatches.length,
      totalMatches: matches.length,
      conflicts,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      todayMatches: 0,
      unassignedMatches: 0,
      activeReferees: 0,
      availableReferees: 0,
      assignedMatches: 0,
      totalMatches: 0,
      conflicts: 0,
    };
  }
}

// ============================================================================
// HEALTH CHECKS
// ============================================================================

/**
 * Check if services are healthy (server-side)
 */
export async function checkServicesHealthServer() {
  const checks = await Promise.all([
    fetch(`${API_CONFIG.AUTH_SERVICE}/health`)
      .then((r) => ({ service: "auth", healthy: r.ok }))
      .catch(() => ({ service: "auth", healthy: false })),
    fetch(`${API_CONFIG.MATCH_SERVICE}/health`)
      .then((r) => ({ service: "match", healthy: r.ok }))
      .catch(() => ({ service: "match", healthy: false })),
    fetch(`${API_CONFIG.REFEREE_SERVICE}/health`)
      .then((r) => ({ service: "referee", healthy: r.ok }))
      .catch(() => ({ service: "referee", healthy: false })),
  ]);

  return checks;
}
