import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/utils/db";
import Students from "@/models/Student";


export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      firstName,
      surname,
      otherName,
      phoneNumber,
      email,
      address,
      state,
      lga,
      section,
      classLevel,
      password,
      guardianName,
      guardianSurname,
      guardianOtherName,
      guardianPhone,
      guardianEmail,
      guardianAddress,
      guardianState,
      guardianLga,
    } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const newStudent = new Students({
      firstName,
      surname,
      otherName,
      phoneNumber,
      email,
      address,
      state,
      lga,
      section,
      classLevel,
      passwordHash,

      guardianName,
      guardianSurname,
      guardianOtherName,
      guardianPhone,
      guardianEmail,
      guardianAddress,
      guardianState,
      guardianLga,

      status: "pending", // ⭐ Student must wait for approval
    });

    await newStudent.save();

    return NextResponse.json(
      {
        message:
          "Registration submitted successfully! Please wait for admin approval.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Student Registration Error:", error);
    return NextResponse.json(
      { error: "Server error. Try again later." },
      { status: 500 }
    );
  }
}
