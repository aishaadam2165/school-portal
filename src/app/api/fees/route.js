import fee from "@/models/fee";
import { connectDB } from "@/utils/db"; // your mongoose connect function


export async function GET() {
  try {
    await connectDB(); // connect to MongoDB using Mongoose

    const fees = await fee.find({}); // fetch all fees

    return new Response(JSON.stringify({ fees }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB(); // ensure DB is connected

    const { studentId, total, paid } = await req.json();

    const fee = await Fee.create({
      studentId,
      total,
      paid: paid || false,
    });

    return new Response(JSON.stringify({ fee }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
