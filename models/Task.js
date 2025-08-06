import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  start: { type: String, required: true },
  end: { type: String, required: true },
});
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
    completed: {
      type: Boolean,
      default: false,
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
    sessions: [sessionSchema],
    totalWorkTime: { type: Number, default: 0 },
  },

  { timestamps: true }
);

export default mongoose.models?.Task || mongoose.model("Task", TaskSchema);
