import connectDB  from "@/lib/db";
import File from "@/models/UserFile";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return new Response(JSON.stringify({ error: "Invalid or missing userId" }), {
        status: 400,
      });
    }

    await connectDB();

    const files = await File.find({ userId: new mongoose.Types.ObjectId(userId) });
    console.log("files",files);

    return new Response(JSON.stringify(files), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error in GET /api/get-files:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
