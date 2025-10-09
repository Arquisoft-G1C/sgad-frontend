/**
 * useAuth Hook
 * Custom hook for managing authentication state
 */

import { useState, useEffect } from 'react';
import { authService } from '@/services';
import { getUserData, clearAuthData } from '@/lib/api-config';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const userData = getUserData();
    if (userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await authService.login({ email, password });
      setUser(response.user);
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      clearAuthData();
    } catch (err: any) {
      console.error('Logout error:', err);
      // Clear local data even if API call fails
      setUser(null);
      clearAuthData();
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      const response = await authService.register({ email, password, name });
      setUser(response.user);
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const refreshUser = async () => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
      return profile;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    refreshUser,
    isAuthenticated: !!user,
  };
}

