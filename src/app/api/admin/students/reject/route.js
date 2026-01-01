import Students from "@/models/Student";
import { connectDB } from "@/utils/db";
import { sendEmail } from "@/utils/mailer";
import { NextResponse } from "next/server";

// import { sendSMS } from "@/lib/sms"; // optional

export async function POST(req) {
  try {
    await connectDB();

    const { studentId, notifyGuardian, reason } = await req.json();

    const student = await Students.findById(studentId);
    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // 🔁 Update status
    student.status = "rejected";
    await student.save();

    // 📩 Decide recipients
    const recipients = [];
    if (student.email) recipients.push(student.email);
    if (notifyGuardian && student.guardianEmail) {
      recipients.push(student.guardianEmail);
    }

    // 📧 Send email
    await sendEmail({
      to: recipients.join(","),
      subject: "Admission Application Update",
      html: `
        <h2>Admission Status</h2>
        <p>We regret to inform you that the application for 
        <strong>${student.firstName} ${student.surname}</strong>
        was <strong>not approved</strong>.</p>

        ${
          reason
            ? `<p><strong>Reason:</strong> ${reason}</p>`
            : ""
        }

        <p>You may contact the school for further clarification.</p>
      `,
    });

    // 📲 SMS (optional)
    /*
    if (student.phoneNumber) {
      await sendSMS(
        student.phoneNumber,
        "Admission update: The application was not approved. Please contact the school."
      );
    }
    */

    return NextResponse.json({
      message: "Student rejected and notification sent",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
