import Teachers from "@/models/Teachers";
import { connectDB } from "@/utils/db";
import { sendEmail } from "@/utils/mailer";
import { NextResponse } from "next/server";


export async function POST(req) {
  await connectDB();
  const { teacherId, reason } = await req.json();

  const teacher = await Teachers.findById(teacherId);
  if (!teacher) {
    return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
  }

  teacher.status = "rejected";
  await teacher.save();

  await sendEmail({
    to: teacher.email,
    subject: "Teaching Application Update",
    html: `
      <h2>Application Status</h2>
      <p>We regret to inform you that your teaching application was <strong>not approved</strong>.</p>
      ${
        reason
          ? `<p><strong>Reason:</strong> ${reason}</p>`
          : ""
      }
      <p>You may contact the school for further information.</p>
    `,
  });

  return NextResponse.json({
    message: "Teacher rejected and notified",
  });
}
