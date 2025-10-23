/**
 * Get Current User API Route
 * Returns the currently authenticated user from cookies
 */

import { NextResponse } from "next/server";
import { getUserDataCookie, isAuthenticatedServer } from "@/lib/auth-cookies";

export async function GET() {
  try {
    const isAuthenticated = await isAuthenticatedServer();

    if (!isAuthenticated) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userData = await getUserDataCookie();

    if (!userData) {
      return NextResponse.json(
        { error: "User data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: userData,
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
