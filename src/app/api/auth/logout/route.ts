/**
 * Logout API Route
 * Handles user logout and removes authentication cookies
 */

import { NextResponse } from "next/server";
import { removeAuthCookies, getAuthCookie } from "@/lib/auth-cookies";

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || "http://localhost:3001";

export async function POST() {
  try {
    const token = await getAuthCookie();

    // Call backend logout endpoint if token exists
    if (token) {
      try {
        await fetch(`${AUTH_SERVICE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        // Ignore errors from backend logout
        console.error("Backend logout error:", error);
      }
    }

    // Remove cookies
    await removeAuthCookies();

    return NextResponse.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    // Still try to remove cookies even if there's an error
    try {
      await removeAuthCookies();
    } catch {}

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
