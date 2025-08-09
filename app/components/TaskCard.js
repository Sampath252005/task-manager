"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import UpdateTask from "./UpdateTask";
import TaskDoneAnimation from "./TaskDoneAnimation";
import { useRouter } from "next/navigation";
import { deleteTask } from "../store/taskSlice";
import { useDispatch } from "react-redux";

const TaskCard = ({
  taskId,
  title,
  subtitle,
  tagsList = [],
  description,
  image,
  refreshTasks,
  estimatedTime,
  totalWorkTime,
  remainingTime,
}) => {
  const dispatch = useDispatch();
  const [showUpdateTask, setShowUpdateTask] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showTaskDoneAnimation, setShowTaskDoneAnimation] = useState(false);
  const router = useRouter();

  const handleTaskDone = async () => {
    setShowTaskDoneAnimation(true);

    setTimeout(async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        return;
      }

      try {
        const res = await fetch(`/api/completed-tasks/${taskId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            estimatedTime,
            totalWorkTime,
            breakTime: 0, // optional
          }),
        });

        if (!res.ok) throw new Error("Failed to complete task");

        // ❌ don't call deleteTask again, backend already deleted it
        // dispatch(deleteTask(taskId));

 
        await refreshTasks() // refresh tasks
      } catch (error) {
        console.error("Error completing task:", error);
      } finally {
        setShowTaskDoneAnimation(false);
      }
    }, 2000);
  };

  const handleUpdateTask = () => {
    setShowUpdateTask(true);
  };

  const DeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/tasks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ taskId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error:", errorText);
        return;
      }

      const result = await response.json();
      console.log("Success:", result.message);
      refreshTasks();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("An error occurred while deleting the task.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className=" bg-white dark:bg-[#071E3D] shadow-md rounded-2xl p-4 m-2 sm:p-6 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl w-full justify-center items-center"
    >
      {showTaskDoneAnimation && (
        <div className="absolute inset-0 bg-opacity-80 z-10 flex justify-center items-center">
          <TaskDoneAnimation />
        </div>
      )}

      {confirmDelete && (
        <div className="absolute inset-0 bg-opacity-40 z-10 flex items-center justify-center rounded-lg">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center w-[90%] sm:w-[70%]">
            <p className="mb-4 text-gray-800 dark:text-gray-200 text-sm sm:text-base">
              Are you sure you want to delete <strong>{title}</strong>?
            </p>
            <div className="flex justify-center gap-4 mt-2">
              <button
                onClick={() => {
                  DeleteTask(taskId);
                  setConfirmDelete(false);
                }}
                className="cursor-pointer bg-red-600 text-white px-4 py-2 text-sm rounded hover:bg-red-700 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="cursor-pointer bg-gray-300 text-black px-4 py-2 text-sm rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdateTask && (
        <motion.div
          className="fixed inset-10 bg-opacity-10 backdrop-blur-xs flex items-center justify-center z-50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <UpdateTask close={() => setShowUpdateTask(false)} taskId={taskId} />
        </motion.div>
      )}

      <div className={`${showTaskDoneAnimation ? "hidden" : ""}`}>
        <div className="mb-4">
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
              {subtitle && (
                <h3 className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  {subtitle}
                </h3>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer text-white bg-transparent rounded hover:bg-gray-200 dark:hover:bg-gray-700 p-2 transition"
                onClick={handleUpdateTask}
              >
                <Image src="/update1.png" alt="Update" width={24} height={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer text-white bg-transparent rounded hover:bg-gray-200 dark:hover:bg-gray-700 p-2 transition"
                onClick={() => setConfirmDelete(true)}
              >
                <Image src="/delete.png" alt="Delete" width={24} height={24} />
              </motion.button>
            </div>
          </div>
        </div>

        {tagsList.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-3">
            {tagsList.map((tag, index) => (
              <li
                key={index}
                className="px-2 py-1 text-xs sm:text-sm bg-blue-100 text-blue-800 rounded dark:bg-blue-900 dark:text-blue-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-3">
          {description}
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-md">
          <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 mb-2">
            <strong>Estimated Time:</strong> {estimatedTime || "Not Set"}m
          </p>
          <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 mb-2">
            <strong>Remaining Time:</strong> {remainingTime || "Not Tracked"}m
          </p>

          {estimatedTime && remainingTime && (
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 mt-2 overflow-hidden">
              <div
                className="bg-blue-500 h-4 transition-all duration-500"
                style={{
                  width: `${
                    ((estimatedTime - remainingTime) / estimatedTime) * 100
                  }%`,
                }}
              ></div>
            </div>
          )}

          <button
            className="inline-block mt-4 text-sm sm:text-base text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            onClick={() => router.push(`/timer`)}
          >
            ⏱ Begin Work Session
          </button>
        </div>

        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
          <div className="flex items-center gap-3 mt-2">
            <Image
              src="/profile.png"
              alt="User"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Assigned to Sampath
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={handleTaskDone}
            className=" inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span className=" cursor-pointer  px-2 py-2 md:px-5 md:py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md ">
              Task Done
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
