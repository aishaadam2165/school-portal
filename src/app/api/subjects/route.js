import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Subject from "@/models/Subject";

export async function GET(req) {
  try {
    await connectDB();

    const teacherId = req.headers.get("teacher-id");

    if (!teacherId) {
      return NextResponse.json(
        { error: "Teacher ID is required" },
        { status: 400 }
      );
    }

    const subjects = await Subject.find({ teacherId });

    return NextResponse.json({ subjects }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch subjects", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { teacherId, name } = body;

    if (!teacherId || !name) {
      return NextResponse.json(
        { error: "Teacher ID & Subject Name are required" },
        { status: 400 }
      );
    }

    const newSubject = await Subject.create({
      teacherId,
      name: name.trim(),
    });

    return NextResponse.json(
      { message: "Subject added successfully", subject: newSubject },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add subject", details: error.message },
      { status: 500 }
    );
  }
}
