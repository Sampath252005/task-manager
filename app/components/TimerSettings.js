// components/TimerSettings.jsx
"use client";
import React from "react";
import { motion } from "framer-motion"

export default function TimerSettings({
  workDuration,
  breakDuration,
  setWorkDuration,
  setBreakDuration,
}) {
  return (
   <motion.div
  className="flex gap-4 w-full max-w-md text-white mt-4"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <motion.input
    type="number"
    value={workDuration}
    onChange={(e) => setWorkDuration(Number(e.target.value))}
    placeholder="Work (min)"
    className="w-1/2 p-2 rounded bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
    whileFocus={{ scale: 1.03 }}
  />
  <motion.input
    type="number"
    value={breakDuration}
    onChange={(e) => setBreakDuration(Number(e.target.value))}
    placeholder="Break (min)"
    className="w-1/2 p-2 rounded bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200"
    whileFocus={{ scale: 1.03 }}
  />
</motion.div>
  );
}
