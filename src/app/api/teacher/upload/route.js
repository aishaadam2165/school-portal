import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import cloudinary from "@/utils/cloudinary";
import { TeacherApplication } from '@/models/Teachers';


export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("file");
    const teacherId = formData.get("teacherId");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadRes = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "teacher_photos" }, (err, result) => {
          if (err) reject(err);
          resolve(result);
        })
        .end(buffer);
    });

    // Save into DB
    const updatedTeacher = await TeacherApplication.findByIdAndUpdate(
      teacherId,
      { photoUrl: uploadRes.secure_url },
      { new: true }
    );

    return NextResponse.json({
      message: "Upload successful",
      photoUrl: uploadRes.secure_url,
      user: updatedTeacher,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
