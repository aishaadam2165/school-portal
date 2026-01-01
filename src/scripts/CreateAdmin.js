import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../src/models/Admin.js";

dotenv.config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);

  const email = "khalifhajamilu123@gmail.com";
  const password = "Khalifha66";

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("❌ Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.create({
    fullName: "Khalifah Jamilu",
    email,
    password: hashedPassword,
    role: "admin",
  });

  console.log("✅ Admin created successfully");
  process.exit();
}

createAdmin();
