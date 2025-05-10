import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  const { email, password } = await req.json();
  await dbConnect();

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken(user);
  return Response.json({ 
    token, 
    username: user.username  // ⬅️ Include username here
  });
}
