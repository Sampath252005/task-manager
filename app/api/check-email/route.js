// app/api/check-email/route.js
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await dbConnect();
    const existing = await User.findOne({ email });

    if (existing) {
      return Response.json(
        { message: "Email already exists", type: "warning" },
        { status: 409 }
      );
    }

    return Response.json({ message: "Email is available" });
  } catch (error) {
    return Response.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
