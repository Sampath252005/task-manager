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
    date: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔽 Pomodoro Timer Additions
    estimatedTime: {
      type: Number, // in minutes
      default: 25,
    },
    remainingTime: {
      type: Number, // in seconds
      default: 0,
    },
     totalWorkTime: { type: Number, default: 0 },
    },
  
  { timestamps: true } 
);

export default mongoose.models?.Task || mongoose.model("Task", TaskSchema);
