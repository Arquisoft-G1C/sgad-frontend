/**
 * Login API Route
 * Handles user authentication and sets HTTP-only cookies
 */

import { NextRequest, NextResponse } from "next/server";
import { setAuthCookie, setUserDataCookie } from "@/lib/auth-cookies";

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || "http://localhost:3001";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Call backend auth service
    const response = await fetch(`${AUTH_SERVICE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || "Invalid credentials" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Set HTTP-only cookie for token
    await setAuthCookie(data.token);

    // Set user data in accessible cookie
    await setUserDataCookie(data.user);

    // Return success response (without token for security)
    return NextResponse.json({
      success: true,
      user: data.user,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
