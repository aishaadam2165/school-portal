import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Student from "@/models/Student";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const student = await Student.findById(id);
    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error("Student profile error:", error);
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}
