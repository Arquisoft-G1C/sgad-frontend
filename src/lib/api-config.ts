/**
 * API Configuration
 * Centralized configuration for all backend service URLs
 */

export const API_CONFIG = {
  AUTH_SERVICE: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:3001',
  MATCH_SERVICE: process.env.NEXT_PUBLIC_MATCH_SERVICE_URL || 'http://localhost:8000',
  REFEREE_SERVICE: process.env.NEXT_PUBLIC_REFEREE_SERVICE_URL || 'http://localhost:8001',
} as const;

/**
 * Get auth token from localStorage
 */
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

/**
 * Set auth token in localStorage
 */
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};

/**
 * Remove auth token from localStorage
 */
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
};

/**
 * Get user data from localStorage
 */
export const getUserData = (): any => {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

/**
 * Set user data in localStorage
 */
export const setUserData = (data: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userData', JSON.stringify(data));
  }
};

/**
 * Remove user data from localStorage
 */
export const removeUserData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userData');
  }
};

/**
 * Clear all auth data
 */
export const clearAuthData = (): void => {
  removeAuthToken();
  removeUserData();
};

