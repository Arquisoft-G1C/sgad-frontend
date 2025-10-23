/**
 * Match Service
 * Handles all match-related API calls
 */

import { API_CONFIG, getAuthToken } from '@/lib/api-config';

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

export interface MatchCreate {
  home_team: string;
  away_team: string;
  date: string;
  time: string;
  location: string;
  category: string;
  competition: string;
  referee_id: number;
  notes?: string;
}

export interface MatchUpdate {
  home_team?: string;
  away_team?: string;
  date?: string;
  time?: string;
  location?: string;
  category?: string;
  competition?: string;
  status?: string;
  referee_id?: number;
  notes?: string;
}

class MatchService {
  private baseUrl = API_CONFIG.MATCH_SERVICE;

  /**
   * Get authorization headers
   */
  private getHeaders(): HeadersInit {
    const token = getAuthToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  /**
   * Get all matches
   */
  async getMatches(params?: {
    skip?: number;
    limit?: number;
    referee_id?: number;
  }): Promise<Match[]> {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append('skip', params.skip.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.referee_id) queryParams.append('referee_id', params.referee_id.toString());

    const url = `${this.baseUrl}/matches${queryParams.toString() ? `?${queryParams}` : ''}`;
    
    // 🔍 DEBUG: Log request details
    console.log('🔍 [MatchService] Debug Info:', {
      baseUrl: this.baseUrl,
      fullUrl: url,
      params,
      headers: this.getHeaders(),
      API_CONFIG: API_CONFIG,
      env_NEXT_PUBLIC_MATCH_SERVICE_URL: process.env.NEXT_PUBLIC_MATCH_SERVICE_URL,
      env_NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    });

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      console.log('✅ [MatchService] Response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      if (!response.ok) {
      throw new Error('Error al obtener partidos');
    }

    return response.json();
  }

  /**
   * Get match by ID
   */
  async getMatch(id: number): Promise<Match> {
    const response = await fetch(`${this.baseUrl}/matches/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener partido');
    }

    return response.json();
  }

  /**
   * Create new match
   */
  async createMatch(data: MatchCreate): Promise<Match> {
    const response = await fetch(`${this.baseUrl}/matches`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al crear partido');
    }

    return response.json();
  }

  /**
   * Update match
   */
  async updateMatch(id: number, data: MatchUpdate): Promise<Match> {
    const response = await fetch(`${this.baseUrl}/matches/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al actualizar partido');
    }

    return response.json();
  }

  /**
   * Delete match
   */
  async deleteMatch(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/matches/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al eliminar partido');
    }
  }

  /**
   * Assign referee to match
   */
  async assignReferee(matchId: number, refereeId: number): Promise<Match> {
    return this.updateMatch(matchId, { referee_id: refereeId });
  }

  /**
   * Get matches by status
   */
  async getMatchesByStatus(status: string): Promise<Match[]> {
    const matches = await this.getMatches();
    return matches.filter(match => match.status === status);
  }

  /**
   * Get upcoming matches
   */
  async getUpcomingMatches(): Promise<Match[]> {
    const matches = await this.getMatches();
    const now = new Date();
    return matches.filter(match => new Date(match.date) >= now);
  }
}

export const matchService = new MatchService();

