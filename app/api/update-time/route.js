import { NextResponse } from "next/server";
import connectDB from "@/lib/db"; // adjust if your DB config is different
import Task from "@/models/Task";
import { verifyToken } from "@/lib/auth"; // optional if you're using JWT
export async function POST(req) {
  try {
    console.log("🔃 Connecting to MongoDB...");
    await connectDB();
    console.log("✅ DB connected");

    const body = await req.json();
    console.log("📥 Request body:", body);

    const { taskId, sessionTime } = body;
    if (!taskId || typeof sessionTime !== "number") {
      console.error("❌ Invalid input:", { taskId, sessionTime });
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    console.log("🔐 Token received:", token);

    // optional: const user = verifyToken(token);

    console.log("🔍 Finding task with ID:", taskId);
    const task = await Task.findById(taskId);
    if (!task) {
      console.error("❌ Task not found:", taskId);
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    const newWorkTime = (task.totalWorkTime || 0) + sessionTime;
    const newRemainingTime = Math.max(task.estimatedTime - newWorkTime, 0);

    task.totalWorkTime = newWorkTime;
    task.remainingTime = newRemainingTime;
    await task.save();

    console.log("✅ Task updated:", { newWorkTime, newRemainingTime });

    return NextResponse.json({
      message: "Task time updated",
      remainingTime: newRemainingTime,
      totalWorkTime: newWorkTime,
    });
  } catch (err) {
    console.error("❌ Internal error in /api/update-time:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
