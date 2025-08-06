import { NextResponse } from "next/server";
import Task from "@/models/Task";
import connectToDB from "@/lib/db";
import jwt from "jsonwebtoken";
export async function POST(request, context) {
  const params = await context?.params;
  const { id } = params;

  const { start, end } = await request.json();
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDB();

    const task = await Task.findById(id);
    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
      });
    }

    task.sessions.push({ start, end });
    await task.save();

    return new Response(
      JSON.stringify({ message: "Session added successfully" })
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
