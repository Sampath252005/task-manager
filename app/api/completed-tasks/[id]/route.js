import { NextResponse } from "next/server";
import connectDB from "@/lib/db"; // Adjust path if needed
import Task from "@/models/Task";
import CompletedTask from "@/models/CompletedTask";
import { getTokenFromHeader } from "@/app/utils/getToken"; // Your custom token decoder
import jwt from "jsonwebtoken";

export const POST = async (req, { params }) => {
  await connectDB();

  const { id: taskId } = params;

  try {
    // ✅ Extract token from headers
    const token = getTokenFromHeader(req);
    console.log("token: ", token);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // ✅ Find the task by ID and userId
    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    // ✅ Create new completed task
    const completedTask = new CompletedTask({
      title: task.title,
      description: task.description,
      tag: task.tag,
      priority: task.priority,
      dueDate: task.dueDate,
      date: task.date,
      userId: task.userId,
      completed: true,
      estimatedTime: task.estimatedTime,
      remainingTime: task.remainingTime,
      totalWorkTime: task.totalWorkTime,
    });

    await completedTask.save();

    // ✅ Delete original task
    await Task.findByIdAndDelete(taskId);

    return NextResponse.json(
      { message: "Task marked as completed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error completing task:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
