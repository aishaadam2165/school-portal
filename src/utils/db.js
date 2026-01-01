import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in your .env.local file");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  try {
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    cached.conn = await cached.promise;

    console.log("✅ MongoDB Connected");
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error(error);
    throw error;
  }
}
