import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { key, originalName } = await req.json();

  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  const video = await db.video.create({
    data: {
      storageKey: key,
      originalName,
      status: "pending",
    },
  });

  return NextResponse.json({ video });
}

import { NextResponse } from "next/server";
import { insertVideoRecord } from "@/lib/caspio";

export async function POST(req: Request) {
  const { key, originalName } = await req.json();

  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  try {
    await insertVideoRecord({
      fileName: originalName,
      storageKey: key,
      status: "pending",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Caspio insert failed" }, { status: 500 });
  }
}