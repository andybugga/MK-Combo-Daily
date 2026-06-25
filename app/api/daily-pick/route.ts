import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST() {
  const eligible = await db.video.findMany({
    where: { status: "approved" },
  });

  if (eligible.length === 0) {
    return NextResponse.json({ error: "No approved videos" }, { status: 400 });
  }

  const winner = eligible[Math.floor(Math.random() * eligible.length)];
  const day = new Date().toISOString().slice(0, 10);

  const result = await db.dailyLot.upsert({
    where: { day },
    create: { day, videoId: winner.id },
    update: { videoId: winner.id },
  });

  return NextResponse.json({ result });
}