import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Student from "@/models/Student";

// GET all approved students
export async function GET() {
  try {
    await connectDB();

    const students = await Student.find({
      status: "approved",
    }).sort({ createdAt: -1 });

    return NextResponse.json(students);
  } catch (error) {
    console.error("Approved students API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch approved students" },
      { status: 500 }
    );
  }
}

// POST approve a student
export async function POST(req) {
  try {
    await connectDB();
    const { studentId } = await req.json();

    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    student.status = "approved";
    await student.save();

    return NextResponse.json({
      message: "Student approved successfully",
    });
  } catch (error) {
    console.error("Approve student error:", error);
    return NextResponse.json(
      { error: "Failed to approve student" },
      { status: 500 }
    );
  }
}
