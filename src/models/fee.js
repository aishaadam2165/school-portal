import mongoose from "mongoose";

const FeeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  total: { type: Number, required: true },
  paid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Fee || mongoose.model("Fee", FeeSchema);
