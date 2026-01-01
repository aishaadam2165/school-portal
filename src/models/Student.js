// models/Student.js
import mongoose from "mongoose";


const StudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  otherName: { type: String },

  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  address: { type: String, required: true },
  state: { type: String, required: true },
  lga: { type: String, required: true },

  section: { type: String, required: true },
  classLevel: { type: String, required: true },

  // MUST BE HASHED
  passwordHash: { type: String, required: true },

  guardianName: { type: String, required: true },
  guardianSurname: { type: String, required: true },
  guardianOtherName: { type: String },

  guardianPhone: { type: String, required: true },
  guardianEmail: { type: String },
  guardianAddress: { type: String },

  guardianState: { type: String },
  guardianLga: { type: String },

  status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
}, { timestamps: true });

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
