"use client";
import React from "react";
import { motion } from "framer-motion";

export default function TimerSettings({
  workDuration,
  breakDuration,
  setWorkDuration,
  setBreakDuration,
}) {
  return (
    <motion.div
      className="flex gap-6 w-full max-w-md text-white mt-4 bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Work Duration */}
      <motion.div
        className="flex flex-col items-center flex-1"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.label
          className="font-semibold text-sm text-blue-400 mb-1"
          whileHover={{ scale: 1.05, color: "#3b82f6" }}
        >
          🧠 Work Duration
        </motion.label>
        <motion.input
          type="number"
          min="1"
          value={workDuration}
          onChange={(e) => setWorkDuration(Number(e.target.value))}
          placeholder="Work (min)"
          className="w-full p-2 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          whileFocus={{ scale: 1.04 }}
          whileHover={{ scale: 1.03 }}
        />
      </motion.div>

      {/* Break Duration */}
      <motion.div
        className="flex flex-col items-center flex-1"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.label
          className="font-semibold text-sm text-pink-400 mb-1"
          whileHover={{ scale: 1.05, color: "#ec4899" }}
        >
          🛀 Break Duration
        </motion.label>
        <motion.input
          type="number"
          min="1"
          value={breakDuration}
          onChange={(e) => setBreakDuration(Number(e.target.value))}
          placeholder="Break (min)"
          className="w-full p-2 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200"
          whileFocus={{ scale: 1.04 }}
          whileHover={{ scale: 1.03 }}
        />
      </motion.div>
    </motion.div>
  );
}
