import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: "nothing",
    },
    priority: {
      type: String,
      default: "low",
    },
    dueDate: {
      type: Date,
    },
    date:{
      type: Date,
      default: Date.now, // Automatically set to current date if not provided
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite error in development
export default mongoose.models?.Task || mongoose.model("Task", TaskSchema);
