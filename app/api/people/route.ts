import { NextRequest, NextResponse } from "next/server";
import { getPeople, createPerson } from "@/lib/services/person";
import { ZodError } from "zod";

export async function GET() {
  try {
    const people = await getPeople();
    return NextResponse.json(people);
  } catch {
    return NextResponse.json({ error: "Failed to fetch people" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const person = await createPerson(body);
    return NextResponse.json(person, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create person" }, { status: 500 });
  }
}
