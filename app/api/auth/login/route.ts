import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/lib/services/auth";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = await loginUser(body);
    return NextResponse.json({ success: true, user });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Login failed" },
      { status: 401 }
    );
  }
}
