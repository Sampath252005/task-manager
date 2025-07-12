"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import { motion } from "framer-motion";
import AddTask from "./AddTask";
import React, { useState } from "react";

export default function AddTaskEntry() {
  const [showAddTask, setShowAddTask] = useState(false);
  return (
    <>
      {showAddTask && (
        <motion.div
          className="fixed inset-10 bg-opacity-10 backdrop-blur-xs flex items-center justify-center z-50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <AddTask close={() => setShowAddTask(false)} />
        </motion.div>
      )}
      <motion.div
        className="flex flex-col items-center justify-center h-full px-4 py-5 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Lottie Animation */}
        <div className="w-full max-w-md">
          <DotLottieReact
            src="https://lottie.host/2ec3b927-4a6b-493e-972d-2ccb93a13a86/aOZpmlD57e.lottie"
            loop
            autoplay
          />
        </div>

        {/* Text and Add Icon */}
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className="text-2xl font-bold text-red-500 mb-2">
            Add New Task
          </span>
          <p className="text-slate-300 text-sm mb-4">
            Click the icon below to add a task
          </p>

          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => {
              setShowAddTask(true);
            }}
          >
            <Image
              src="/addicon.png"
              alt="Add Task"
              width={75}
              height={75}
              className="w-[75px] h-[75px]"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
