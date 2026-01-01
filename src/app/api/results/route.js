import result from "@/models/result";
import { connectDB } from "@/utils/db"; // your mongoose connect function


export async function GET() {
  try {
    await connectDB(); // ensure Mongoose is connected

    const results = await result.find({}); // fetch all results

    return new Response(JSON.stringify({ results }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const { studentId, subject, score } = await req.json();

    // Calculate grade
    let grade = "F";
    if (score >= 70) grade = "A";
    else if (score >= 60) grade = "B";
    else if (score >= 50) grade = "C";
    else if (score >= 40) grade = "D";

    const result = await Result.create({
      studentId,
      subject,
      score,
      grade,
    });

    return new Response(JSON.stringify({ result }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
