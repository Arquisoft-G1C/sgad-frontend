/**
 * Authentication Cookie Utilities
 * Manages authentication using HTTP-only cookies for better security
 */

import { cookies } from "next/headers";

const COOKIE_NAME = "authToken";
const USER_DATA_COOKIE = "userData";

/**
 * Set authentication token in HTTP-only cookie
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true, // Cannot be accessed by JavaScript (XSS protection)
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "lax", // CSRF protection
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

/**
 * Set user data in cookie (non-HTTP-only for client access)
 */
export async function setUserDataCookie(userData: any): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(USER_DATA_COOKIE, JSON.stringify(userData), {
    httpOnly: false, // Accessible by JavaScript
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

/**
 * Get authentication token from cookie
 */
export async function getAuthCookie(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value || null;
  } catch (error) {
    console.error("Error getting auth cookie:", error);
    return null;
  }
}

/**
 * Get user data from cookie
 */
export async function getUserDataCookie(): Promise<any | null> {
  try {
    const cookieStore = await cookies();
    const userDataStr = cookieStore.get(USER_DATA_COOKIE)?.value;
    return userDataStr ? JSON.parse(userDataStr) : null;
  } catch (error) {
    console.error("Error getting user data cookie:", error);
    return null;
  }
}

/**
 * Remove authentication cookies
 */
export async function removeAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  cookieStore.delete(USER_DATA_COOKIE);
}

/**
 * Check if user is authenticated (server-side)
 */
export async function isAuthenticatedServer(): Promise<boolean> {
  const token = await getAuthCookie();
  return !!token;
}
