import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import TeacherApplication from "@/models/Teachers";

export async function GET() {
  try {
    await connectDB();
    const teachers = await TeacherApplication.find().sort({ createdAt: -1 });
    return NextResponse.json(teachers);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 });
  }
}
