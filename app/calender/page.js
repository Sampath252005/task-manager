"use client";
import { useState } from "react";
import Calendar from "../components/Calender";
import AddTask from "../components/AddTask";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  return (
    <>
      {/* Modal for AddTask */}
      <AnimatePresence>
        {showAddTaskForm && (
          <motion.div
            className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AddTask
              close={() => setShowAddTaskForm(false)}
              selectedDate={selectedDate}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Manager</h1>

        {/* Calendar */}
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={(date, openForm = false) => {
            setSelectedDate(date);
            if (openForm) setShowAddTaskForm(true);
          }}
        />

        {/* Selected Date Display */}
        <p className="mt-4 text-lg text-gray-700">
          Selected Date:{" "}
          <span className="font-medium">{selectedDate.toDateString()}</span>
        </p>
      </div>
    </>
  );
}
