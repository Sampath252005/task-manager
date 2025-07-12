"use client";
import { useState } from "react";
import Calendar from "../components/Calender";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../hooks/useTasks";
import { AnimatePresence, motion } from "framer-motion";
import { isSameDay } from "date-fns";
import Image from "next/image";
import Searchanimation from "../components/SearchIanimation";

export default function TaskPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const { tasks, loading, refreshTasks } = useTasks();

  const tasksForSelectedDate = tasks.filter(
    (task) => task.date && isSameDay(new Date(task.date), selectedDate)
  );

  return (
    <>
      {/* Modal */}
      <AnimatePresence>
        {showAddTaskForm && (
          <motion.div
            className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AddTask
              close={() => setShowAddTaskForm(false)}
              selectedDate={selectedDate}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-6">📅 Task Manager</h1>
        {/* Calendar */}
        <Calendar
          selectedDate={selectedDate}
          refreshTasks={refreshTasks}
          onDateSelect={(date, openForm = false) => {
            setSelectedDate(date);
            if (openForm) setShowAddTaskForm(true);
          }}
        />
        {/* Selected Date Display */}
        <h2 className="mt-6 text-xl font-semibold text-blue-300">
          Tasks for {selectedDate.toDateString()}
        </h2>

        {/* Task Cards */}
        <div className="mt-4 w-full max-w-3xl space-y-2">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Searchanimation />
            </div>
          ) : tasksForSelectedDate.length === 0 ? (
            <p className="text-gray-400 italic">No tasks for this day.</p>
          ) : (
            <AnimatePresence>
              {tasksForSelectedDate.map((task) => (
                <motion.div
                  key={task._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, backgroundColor: "#22d3ee" }} // tailwind's cyan-400
                  className="text-white text-lg p-3 border-l-4 border-cyan-400 border-1 rounded-md shadow-md transition-colors duration-300 cursor-pointer hover:text-white"
                >
                  📌 {task.title}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
}
