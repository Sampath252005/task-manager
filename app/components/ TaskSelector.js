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
      className="w-full max-w-md flex flex-col items-center bg-gray-900 p-6 rounded-lg "
    >
      <label
        htmlFor="taskSelect"
        className="block text-white mb-2 font-semibold text-lg"
      >
        📝 Select a Task
      </label>

      <motion.select
        id="taskSelect"
        name="taskSelect"
         whileFocus={{ scale: 1.02 }}
         whileHover={{ scale: 1.02 }}
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
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
