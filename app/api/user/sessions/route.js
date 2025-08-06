import { NextResponse } from "next/server";
import Task from "@/models/Task";
import connectToDB from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDB();

    const tasks = await Task.find({ user: decoded.id });

    let totalMsToday = 0;
    let totalMsOverall = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // start of today

    tasks.forEach((task) => {
      task.sessions.forEach((session) => {
        const start = new Date(session.start);
        const end = new Date(session.end);
        const duration = end - start;

        totalMsOverall += duration;

        if (start >= today) {
          totalMsToday += duration;
        }
      });
    });

    const msToHMS = (ms) => {
      const totalSeconds = Math.floor(ms / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return { hours, minutes, seconds };
    };

    return NextResponse.json({
      today: msToHMS(totalMsToday),
      overall: msToHMS(totalMsOverall),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
