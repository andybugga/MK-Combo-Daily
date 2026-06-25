import { db } from "@/lib/db";

export default async function HomePage() {
  const today = new Date().toISOString().slice(0, 10);

  const dailyLot = await db.dailyLot.findUnique({
    where: { day: today },
    include: { video: true },
  });

  return (
    <main>
      <h1>Today’s Video</h1>
      {dailyLot ? (
        <p>Chosen video ID: {dailyLot.videoId}</p>
      ) : (
        <p>No video selected yet today.</p>
      )}
    </main>
  );
}