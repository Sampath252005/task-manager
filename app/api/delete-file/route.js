// /app/api/delete-file/route.js or /pages/api/delete-file.js
import  connectDB  from "@/lib/db";
import File from "@/models/UserFile";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { public_id, fileId } = body;

    console.log("🧾 Delete request for:", { public_id, fileId });

    if (!public_id || !fileId) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    await connectDB();

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(public_id);
    console.log("📤 Cloudinary delete result:", result);

    // Delete from MongoDB
    const deletedFile = await File.findByIdAndDelete(fileId);
    if (!deletedFile) {
      return new Response(JSON.stringify({ error: "File not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
  } catch (err) {
    console.error("❌ DELETE FILE ERROR:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
