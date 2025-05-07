import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return new Response("All fields are required", { status: 400 });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("User already exists", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return new Response("User created successfully", { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
};
