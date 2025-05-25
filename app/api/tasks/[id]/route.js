import dbConnect from "@/lib/db";
import Task from "@/models/Task";
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await dbConnect();

  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return new Response("Unauthorized", { status: 401 });

  const { userId } = verifyToken(token);
  const { id } = params;

  const deletedTask = await Task.findOneAndDelete({ _id: id, userId });
  if (!deletedTask) {
    return new Response("Task not found or unauthorized", { status: 404 });
  }

  return NextResponse.json({ message: `Task ${id} deleted successfully` });
}

export async function PUT(req, { params }) {
  await dbConnect();

  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return new Response("Unauthorized", { status: 401 });

  const { userId } = verifyToken(token);
  const { id } = params;
  const body = await req.json();

  const updatedTask = await Task.findOneAndUpdate({ _id: id, userId }, body, {
    new: true,
  });

  if (!updatedTask) {
    return new Response("Task not found or unauthorized", { status: 404 });
  }

  return NextResponse.json({
    message: `Task updated successfully`,
    data: updatedTask,
  });
}
