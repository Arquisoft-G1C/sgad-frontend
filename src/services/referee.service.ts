/**
 * Referee Service
 * Handles all referee-related API calls
 */

import { API_CONFIG, getAuthToken } from '@/lib/api-config';

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

export interface RefereeCreate {
  name: string;
  email: string;
  phone: string;
  category: string;
  specialization: string;
  license_number?: string;
  experience_years?: number;
  notes?: string;
}

export interface RefereeUpdate {
  name?: string;
  email?: string;
  phone?: string;
  category?: string;
  specialization?: string;
  status?: string;
  available?: boolean;
  license_number?: string;
  experience_years?: number;
  rating?: number;
  notes?: string;
}

class RefereeService {
  private baseUrl = API_CONFIG.REFEREE_SERVICE;

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
   * Get all referees
   */
  async getReferees(params?: {
    skip?: number;
    limit?: number;
  }): Promise<Referee[]> {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append('skip', params.skip.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `${this.baseUrl}/referees/${queryParams.toString() ? `?${queryParams}` : ''}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener árbitros');
    }

    return response.json();
  }

  /**
   * Get referee by ID
   */
  async getReferee(id: number): Promise<Referee> {
    const response = await fetch(`${this.baseUrl}/referees/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener árbitro');
    }

    return response.json();
  }

  /**
   * Create new referee
   */
  async createReferee(data: RefereeCreate): Promise<Referee> {
    const response = await fetch(`${this.baseUrl}/referees/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al crear árbitro');
    }

    return response.json();
  }

  /**
   * Update referee
   */
  async updateReferee(id: number, data: RefereeUpdate): Promise<Referee> {
    const response = await fetch(`${this.baseUrl}/referees/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al actualizar árbitro');
    }

    return response.json();
  }

  /**
   * Delete referee
   */
  async deleteReferee(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/referees/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al eliminar árbitro');
    }
  }

  /**
   * Get available referees
   */
  async getAvailableReferees(): Promise<Referee[]> {
    const referees = await this.getReferees();
    return referees.filter(referee => referee.available && referee.status === 'active');
  }

  /**
   * Get referees by category
   */
  async getRefereesByCategory(category: string): Promise<Referee[]> {
    const referees = await this.getReferees();
    return referees.filter(referee => referee.category === category);
  }

  /**
   * Get referees by specialization
   */
  async getRefereesBySpecialization(specialization: string): Promise<Referee[]> {
    const referees = await this.getReferees();
    return referees.filter(referee => referee.specialization === specialization);
  }

  /**
   * Update referee availability
   */
  async updateAvailability(id: number, available: boolean): Promise<Referee> {
    return this.updateReferee(id, { available });
  }

  /**
   * Get referee statistics
   */
  async getRefereeStats(id: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/referees/${id}/stats`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener estadísticas del árbitro');
    }

    return response.json();
  }
}

export const refereeService = new RefereeService();

