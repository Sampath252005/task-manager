"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const QuickActions = () => {
  const router = useRouter();

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h2
        className="text-[18px] md:text-2xl font-semibold mb-8 text-black dark:text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        ⚡ Quick Actions
      </motion.h2>

      <div className="flex flex-col gap-4">
        {[
          {
            label: "+ Add file",
            className: "bg-blue-600 hover:bg-blue-700",
            url: "/files",
          },
          {
            label: "🎯 Start Focus Timer",
            className: "bg-green-600 hover:bg-green-700",
            url: "/timer",
          },
          {
            label: "📅 View Calendar",
            className: "bg-gray-700 hover:bg-gray-800",
            url: "/calender",
          },
          {
            label: "🗒 Open Tasks",
            className: "bg-sky-900 hover:bg-sky-950",
            url: "/tasks",
          },
        ].map((btn, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${btn.className} text-white px-3 py-3 rounded-xl font-bold transition-colors`}
            onClick={() => router.push(btn.url)}
          >
            {btn.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
