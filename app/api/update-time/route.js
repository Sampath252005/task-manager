import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/models/Task";

export async function POST(req) {
  try {
    console.log("🔃 Connecting to MongoDB...");
    await connectDB();
    console.log("✅ DB connected");

    const body = await req.json();
    console.log("📥 Request body:", body);

    const { taskId, start, end, sessionTime } = body;
    if (!taskId || !start || !end || typeof sessionTime !== "number") {
      console.error("❌ Invalid input:", { taskId, start, end, sessionTime });
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      console.error("❌ Task not found:", taskId);
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    // Update total/remaining time
    const sessionMinutes = Math.floor(sessionTime / 60); // convert seconds → minutes
    const newWorkTime = (task.totalWorkTime || 0) + sessionMinutes;
    const newRemainingTime = Math.max(task.estimatedTime - newWorkTime, 0);

    task.totalWorkTime = newWorkTime;
    task.remainingTime = newRemainingTime;

    // ✅ Also push the actual session
    task.sessions.push({ start, end });

    await task.save();

    console.log("✅ Task updated:", { newWorkTime, newRemainingTime });

    return NextResponse.json({
      message: "Task time updated & session saved",
      remainingTime: newRemainingTime,
      totalWorkTime: newWorkTime,
      sessions: task.sessions,
    });
  } catch (err) {
    console.error("❌ Internal error in /api/update-time:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
