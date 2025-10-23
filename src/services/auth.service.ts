/**
 * Auth Service
 * Handles all authentication-related API calls
 */

import { API_CONFIG, getAuthToken, setAuthToken, setUserData, clearAuthData } from '@/lib/api-config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

class AuthService {
  private baseUrl = API_CONFIG.AUTH_SERVICE;

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al iniciar sesión');
    }

    const data = await response.json();
    
    // Store token and user data
    setAuthToken(data.token);
    setUserData(data.user);
    
    return data;
  }

  /**
   * Register new user
   */
  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al registrar usuario');
    }

    const data = await response.json();
    
    // Store token and user data
    setAuthToken(data.token);
    setUserData(data.user);
    
    return data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    // Clear local storage
    clearAuthData();
    
    // Optionally call backend logout endpoint if available
    try {
      const token = getAuthToken();
      if (token) {
        await fetch(`${this.baseUrl}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      // Ignore errors on logout
      console.error('Error during logout:', error);
    }
  }

  /**
   * Verify token and get current user
   */
  async verifyToken(): Promise<any> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${this.baseUrl}/auth/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      clearAuthData();
      throw new Error('Token inválido o expirado');
    }

    return response.json();
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<any> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No autenticado');
    }

    const response = await fetch(`${this.baseUrl}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener perfil');
    }

    return response.json();
  }

  /**
   * Update user profile
   */
  async updateProfile(data: any): Promise<any> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No autenticado');
    }

    const response = await fetch(`${this.baseUrl}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar perfil');
    }

    const updatedUser = await response.json();
    setUserData(updatedUser);
    
    return updatedUser;
  }
}

export const authService = new AuthService();

