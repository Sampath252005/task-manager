import dbConnect from "@/lib/db";
import Task from "@/models/Task";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  try {
    await dbConnect();
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return new Response("Unauthorized", { status: 401 });

    const { userId } = verifyToken(token);
    const tasks = await Task.find({ userId });
    return Response.json(tasks);
  } catch (error) {
    console.error("GET error:", error);
    return new Response("Server error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return new Response("Unauthorized", { status: 401 });

    const { userId } = verifyToken(token);
    const body = await req.json();

    const task = await Task.create({ ...body, userId });
    return Response.json(task);
  } catch (error) {
    console.error("POST error:", error);
    return new Response("Server error", { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return new Response("Unauthorized", { status: 401 });

    const { userId } = verifyToken(token);
    const { taskId, ...updates } = await req.json();

    const task = await Task.findOneAndUpdate({ _id: taskId, userId }, updates, {
      new: true,
    });

    if (!task) {
      return new Response("Task not found or unauthorized", { status: 404 });
    }

    return Response.json(task);
  } catch (error) {
    console.error("PUT error:", error);
    return new Response("Server error", { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return new Response("Unauthorized", { status: 401 });

    const { userId } = verifyToken(token);
    const { taskId } = await req.json();

    const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });

    if (!deletedTask) {
      return new Response("Task not found or unauthorized", { status: 404 });
    }

    return Response.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response("Server error", { status: 500 });
  }
}
