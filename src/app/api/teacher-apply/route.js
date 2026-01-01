import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import TeacherApplication from "@/models/Teachers";
import cloudinary from "@/utils/cloudinary";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    // Extract fields
    const firstName = formData.get("firstName");
    const surname = formData.get("surname");
    const otherName = formData.get("otherName");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const address = formData.get("address");
    const state = formData.get("state");
    const lga = formData.get("lga");
    const dob = formData.get("dob");
    const gender = formData.get("gender");

    const qualification = formData.get("qualification");
    const experience = formData.get("experience");
    const preferredSection = formData.get("preferredSection");
    const preferredClassLevel = formData.get("preferredClassLevel");

    const password = formData.get("password");

    // Upload resume
    const resume = formData.get("resume");
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());
    const uploadedResume = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "teacher_resumes", resource_type: "raw" },
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      ).end(resumeBuffer);
    });

    // Upload photo
    const photo = formData.get("photo");
    const photoBuffer = Buffer.from(await photo.arrayBuffer());
    const uploadedPhoto = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "teacher_photos" },
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      ).end(photoBuffer);
    });

    // Password hash
    const passwordHash = await bcrypt.hash(password, 10);

    // Save to DB with approval status
    await TeacherApplication.create({
      firstName,
      surname,
      otherName,
      phone,
      email,
      address,
      state,
      lga,
      dob,
      gender,
      qualification,
      experience,
      preferredSection,
      preferredClassLevel,
      resumeUrl: uploadedResume.secure_url,
      photoUrl: uploadedPhoto.secure_url,
      passwordHash,
      status: "pending", // 🚀 TEACHER MUST WAIT FOR APPROVAL
    });

    return NextResponse.json(
      { message: "Application submitted successfully! Please wait for admin approval." },
      { status: 201 }
    );

  } catch (error) {
    console.log("APPLY ERROR:", error);
    return NextResponse.json(
      { error: "Failed to submit application", details: error.message },
      { status: 500 }
    );
  }
}
