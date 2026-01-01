import Teacher from "@/models/Teachers";
import { connectDB } from "@/utils/db";
import { sendEmail } from "@/utils/mailer";
import { NextResponse } from "next/server";

// GET all approved teachers
export async function GET() {
  try {
    await connectDB();

    const teachers = await Teacher.find({ status: "approved" })
      .select("-passwordHash") // hide password
      .sort({ createdAt: -1 });

    return NextResponse.json(teachers);
  } catch (error) {
    console.error("Approved teachers API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch approved teachers" },
      { status: 500 }
    );
  }
}

// POST approve a teacher
export async function POST(req) {
  try {
    await connectDB();
    const { teacherId } = await req.json();

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    teacher.status = "approved";
    await teacher.save();

    // 📧 Email notification
    await sendEmail({
      to: teacher.email,
      subject: "Teaching Application Approved",
      html: `
        <h2>Congratulations ${teacher.firstName}!</h2>
        <p>Your teaching application has been <strong>approved</strong>.</p>
        <p>Please report to the school management for onboarding.</p>
      `,
    });

    // 📩 SMS (optional)
    /*
    if (teacher.phone) {
      await sendSMS(
        teacher.phone,
        "Congratulations! Your teaching application has been approved."
      );
    }
    */

    return NextResponse.json({
      message: "Teacher approved and notified",
    });
  } catch (error) {
    console.error("Approve teacher error:", error);
    return NextResponse.json(
      { error: "Failed to approve teacher" },
      { status: 500 }
    );
  }
}
