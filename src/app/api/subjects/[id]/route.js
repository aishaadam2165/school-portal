import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Subject from "@/models/Subject";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    await Subject.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Subject removed successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete subject", details: error.message },
      { status: 500 }
    );
  }
}
