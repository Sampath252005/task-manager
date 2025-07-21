import mongoose from "mongoose";

const userFileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  public_id: { type: String, required: true }, // ✅ add this line
  type: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.models.UserFile || mongoose.model("UserFile", userFileSchema);
