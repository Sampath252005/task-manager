// app/api/check-username/route.js
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { username } = await req.json(); // ✅ Must use req.json() in App Router
    await dbConnect();
    const existing = await User.findOne({ username });

    if (existing) {
      return Response.json(
        { message: "Username already exists", type: "warning" },
        { status: 409 }
      );
    }

    return Response.json({ message: "Username is available" });
  } catch (error) {
    return Response.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
