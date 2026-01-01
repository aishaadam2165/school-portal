import Students from "@/models/Student";
import Teachers from "@/models/Teachers";
import { connectDB } from "@/utils/db";


export async function PATCH(req) {
  await connectDB();

  const { id, type, status } = await req.json();

  if (!id || !type || !status) {
    return Response.json({ message: "Missing data" }, { status: 400 });
  }

  if (type === "student") {
    await Students.findByIdAndUpdate(id, { status });
  }

  if (type === "teacher") {
    await Teachers.findByIdAndUpdate(id, { status });
  }

  return Response.json({ message: "Status updated" });
}
