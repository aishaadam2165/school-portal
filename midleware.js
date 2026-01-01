import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/student-dashboard") && decoded.role !== "student") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/teacher-dashboard") && decoded.role !== "teacher") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/admin-dashboard") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/student-dashboard/:path*",
    "/teacher-dashboard/:path*",
    "/admin-dashboard/:path*",
  ],
};
