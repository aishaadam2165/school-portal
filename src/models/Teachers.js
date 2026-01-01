import mongoose from "mongoose";

const TeacherApplicationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    otherName: { type: String },

    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    address: { type: String, required: true },
    state: { type: String, required: true },
    lga: { type: String, required: true },

    dob: { type: Date, required: true },
    gender: { type: String, required: true },

    qualification: { type: String, required: true },
    experience: { type: Number, required: true },

    preferredSection: { type: String, required: true },
    preferredClassLevel: { type: String, required: true },

    // FILES stored in Cloudinary
    resumeUrl: { type: String, required: true },
    photoUrl: { type: String, required: true },

    // Account Credentials
    passwordHash: { type: String, required: true },

      status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.TeacherApplication ||
  mongoose.model("TeacherApplication", TeacherApplicationSchema);
