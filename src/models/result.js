import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  score: { type: Number, required: true },
  grade: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Ensure unique result per student per subject
ResultSchema.index({ student: 1, subject: 1 }, { unique: true });

export default mongoose.models.Result || mongoose.model("Result", ResultSchema);
