import dbConnect from "@/lib/db";
import Task from "@/models/Task";
import CompletedTask from "@/models/CompletedTask";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  try {
    await dbConnect();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return new Response("Unauthorized", { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded?.userId) return new Response("Unauthorized", { status: 401 });

    const userId = decoded.userId;

    const tasks = await CompletedTask.find({ userId });

    return Response.json({ count: tasks.length,tasks });
  } catch (error) {
    console.error("Completed task fetch error:", error);
    return new Response("Server error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return new Response("Unauthorized", { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded?.userId) return new Response("Unauthorized", { status: 401 });

    const userId = decoded.userId;

    const { taskId, title, estimatedTime, timeSpent, breakTime,description } =
      await req.json();

    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) return new Response("Task not found", { status: 404 });

    await CompletedTask.create({
      title,
      description, 
      estimatedTime,
      timeSpent,
      breakTime,
      userId,
    });

    await Task.deleteOne({ _id: taskId });

    return Response.json({ message: "Task marked as completed" });
  } catch (error) {
    console.error("Complete task error:", error);
    return new Response("Server error", { status: 500 });
  }
}
