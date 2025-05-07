import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: String,
  dueDate: Date,
  completed: Boolean,
  tag: String,
  description: String,
  priority: { type: String, enum: ["low", "medium", "high"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  completedAt: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
