"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation'

const QuickActions = () => {
  const router=useRouter();
  return (
    <motion.div
      className="bg-white shadow-md rounded-2xl p-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h2
        className="text-2xl font-semibold mb-4 text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        ⚡ Quick Actions
      </motion.h2>

      <div className="flex flex-col gap-4">
        {[
          { label: "+ Add file", className: "bg-blue-600", url:"/files"  },
          { label: "🎯 Start Focus Timer", className: "bg-green-600", url:"/timer" },
          { label: "📅 View Calendar", className: "bg-gray-700",url:"/calender" },
        ].map((btn, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${btn.className} text-white px-6 py-4 rounded-xl`}
            onClick={()=>router.push(btn.url)}
          >
            {btn.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
