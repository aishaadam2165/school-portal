import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/utils/db";
import Student from "@/models/Student";
import Teacher from "@/models/Teachers";

export async function POST(req) {
  try {
    await connectDB();

    const { name, password, role } = await req.json();

    if (!name || !password || !role) {
      return NextResponse.json(
        { error: "Missing login fields" },
        { status: 400 }
      );
    }

    let user;

    /* ================= STUDENT ================= */
    if (role === "student") {
      user = await Student.findOne({ email: name });

      if (!user) {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );
      }

      if (user.status !== "approved") {
        return NextResponse.json(
          { error: "Account pending admin approval" },
          { status: 403 }
        );
      }
    }

    /* ================= TEACHER ================= */
    else if (role === "teacher") {
      user = await Teacher.findOne({ email: name });

      if (!user) {
        return NextResponse.json(
          { error: "Account not approved or does not exist" },
          { status: 401 }
        );
      }
    }

    else {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    /* ================= PASSWORD ================= */
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    /* ================= CREATE TOKEN ================= */
    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({ message: "Login successful" });

    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    return res;

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
