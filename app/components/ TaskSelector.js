// components/TaskSelector.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";

export default function TaskSelector({ tasks, selectedTaskId, onSelect }) {
  return (


<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="w-full max-w-md"
>
  <label className="block text-white mb-2 font-semibold text-lg">
    📝 Select a Task
  </label>

  <motion.select
    whileFocus={{ scale: 1.02 }}
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={selectedTaskId || ""}
    onChange={(e) => onSelect(e.target.value)}
  >
    <option value="">-- Choose your task --</option>
    {tasks.map((task) => (
      <option key={task._id} value={task._id}>
        {task.title}
      </option>
    ))}
  </motion.select>
</motion.div>

  );
}
