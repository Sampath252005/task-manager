import { NextResponse } from "next/server";
import Task from "@/models/Task";
import connectToDB from "@/lib/db";
import mongoose from "mongoose";
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

    // ✅ Ensure userId is a valid ObjectId
    if (!mongoose.isValidObjectId(decoded.userId)) {
      return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }

    const tasks = await Task.find({
      userId: new mongoose.Types.ObjectId(decoded.userId),
    });

    console.log("tasks fetched:", tasks.length);

    let totalMsToday = 0;
    let totalMsOverall = 0;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    tasks.forEach((task) => {
      task.sessions.forEach((session) => {
        const start = new Date(session.start);
        const end = new Date(session.end);
        const duration = end - start;

        totalMsOverall += duration;

        if (end >= todayStart && start <= todayEnd) {
          const effectiveStart = start < todayStart ? todayStart : start;
          const effectiveEnd = end > todayEnd ? todayEnd : end;
          totalMsToday += effectiveEnd - effectiveStart;
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
    console.error("❌ Error in /api/user/sessions:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
