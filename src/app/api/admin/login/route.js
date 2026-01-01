import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/utils/db";
import Admin from "@/models/Admin";
import { signToken } from "@/utils/auth";

export async function POST(req) {
  await connectDB();

  const { email, password } = await req.json();

  let admin = await Admin.findOne({ email });

  // ⚠️ AUTO CREATE ADMIN (DEV ONLY)
  if (!admin && email === "aishaadam3678@gmail.com") {
    const hashed = await bcrypt.hash("Adam2165", 10);

    admin = await Admin.create({
      fullName: "Aisha Adam",
      email,
      password: hashed,
      role: "admin",
    });
  }

  // ✅ VERY IMPORTANT CHECK
  if (!admin) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = signToken({
    id: admin._id,
    role: admin.role,
  });

  const response = NextResponse.json({ message: "Login successful" });

  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
