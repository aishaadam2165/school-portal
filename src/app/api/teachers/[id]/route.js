import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Teachers from "@/models/Teachers";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const teacher = await Teachers.findById(id);
    if (!teacher) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(teacher);
  } catch (error) {
    console.error("Teacher profile error:", error);
    return NextResponse.json(
      { error: "Failed to fetch teacher" },
      { status: 500 }
    );
  }
}
