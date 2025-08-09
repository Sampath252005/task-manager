import { NextResponse } from "next/server";
import { Readable } from "stream";
import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/db";
import UserFile from "@/models/UserFile";

export const config = {
  api: { bodyParser: false },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const userId = formData.get("userId");

    if (!file || !userId) {
      return NextResponse.json(
        { error: "File or userId missing" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    await connectDB();

    const resourceType = file.type.startsWith("image/")
      ? "image"
      : file.type.startsWith("video/")
      ? "video"
      : "raw";
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `user_files/${userId}`,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      Readable.from(buffer).pipe(stream);
    });

    const savedFile = await UserFile.create({
      userId,
      name: file.name,
      url: result.secure_url,
      type: file.type || result.resource_type,
      public_id: result.public_id,
    });

    return NextResponse.json(
      {
        url: result.secure_url,
        message: "Uploaded & saved to DB",
        fileId: savedFile._id,
        public_id: savedFile.public_id,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json(
      { error: "Internal Server Error", detail: err.message },
      { status: 500 }
    );
  }
}
