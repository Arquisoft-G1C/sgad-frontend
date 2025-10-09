/**
 * API Utility Functions
 * Helper functions for API calls and error handling
 */

/**
 * Handle API errors consistently
 */
export function handleApiError(error: any): string {
  if (error.response) {
    // Server responded with error
    const message = error.response.data?.message || error.response.data?.detail;
    return message || `Error: ${error.response.status}`;
  } else if (error.request) {
    // Request made but no response
    return 'No se pudo conectar con el servidor. Verifica tu conexión.';
  } else if (error.message) {
    // Error message directly
    return error.message;
  }
  return 'Ha ocurrido un error inesperado.';
}

/**
 * Format date for API requests (YYYY-MM-DD)
 */
export function formatDateForApi(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format time for API requests (HH:MM)
 */
export function formatTimeForApi(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Parse API date to Date object
 */
export function parseApiDate(dateString: string): Date {
  return new Date(dateString);
}

/**
 * Check if API is available (health check)
 */
export async function checkApiHealth(url: string): Promise<boolean> {
  try {
    const response = await fetch(`${url}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Retry API call with exponential backoff
 */
export async function retryApiCall<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
}

/**
 * Build query string from params object
 */
export function buildQueryString(params: Record<string, any>): string {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });
  
  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Download file from API response
 */
export function downloadFile(data: Blob, filename: string) {
  const url = window.URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

