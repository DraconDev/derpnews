"use client";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ message: "Love you" }, { status: 200 });
}
