// app/api/user-profile/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  await connectDB();
  const user = await User.findById(userId).select("username email profile");
  console.log("Fetched user:", user);

  return NextResponse.json(user);
}
