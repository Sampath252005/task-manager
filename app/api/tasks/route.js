import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  await connectDB();
  const token = req.headers.get("authorization")?.split(" ")[1];
  const { userId } = verifyToken(token);
  const tasks = await Task.find({ userId });
  return Response.json(tasks);
}

export async function POST(req) {
  await connectDB();
  const token = req.headers.get("authorization")?.split(" ")[1];
  const { userId } = verifyToken(token);
  const body = await req.json();

  const task = await Task.create({ ...body, userId });
  return Response.json(task);
}

export async function PUT(req) {
  await connectDB();
  const token = req.headers.get("authorization")?.split(" ")[1];
  const { userId } = verifyToken(token);
  const { taskId, ...updates } = await req.json();

  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    updates,
    { new: true }
  );

  if (!task) {
    return new Response("Task not found or unauthorized", { status: 404 });
  }

  return Response.json(task);
}

export async function DELETE(req) {
  await connectDB();
  const token = req.headers.get("authorization")?.split(" ")[1];
  const { userId } = verifyToken(token);
  const { taskId } = await req.json();

  const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });

  if (!deletedTask) {
    return new Response("Task not found or unauthorized", { status: 404 });
  }

  return Response.json({ message: "Task deleted successfully" });
}
