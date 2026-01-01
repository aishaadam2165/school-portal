import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Student from "@/models/Student";

export async function GET() {
  try {
    await connectDB();
    const students = await Student.find().sort({ createdAt: -1 });
    return NextResponse.json(students);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}
