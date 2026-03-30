import { NextRequest, NextResponse } from "next/server";
import { getAssets, createAsset } from "@/lib/services/asset";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId") || undefined;
    const assets = await getAssets(projectId);
    return NextResponse.json(assets);
  } catch {
    return NextResponse.json({ error: "Failed to fetch assets" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const asset = await createAsset(body);
    return NextResponse.json(asset, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create asset" }, { status: 500 });
  }
}
