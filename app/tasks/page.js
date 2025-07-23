"use client";
import React ,{useState} from "react";
import TaskList from "../components/TaskList"; // ✅ Correct import
import AddTask from "../components/AddTask";
import { motion } from "framer-motion";
const page = () => {
    const [showAddTask, setShowAddTask] = useState(false);
  const handleAddTask = () => {
    setShowAddTask(true);
  };
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

    <div className="justify-center items-center w-full h-screen md:h-full  py-5 md:px-5">
      <div className="backlog p-3 mt-5 bg-[#323643] border-l-2  md:h-full overflow-y-">
        <div className="flex justify-between items-center p5">
        <h1 className="text-2xl font-bold text-red-500 p-3">Tasks</h1>
        <div className="relative flex items-center gap-10 justify-center">
          <motion.button
            onClick={handleAddTask}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer md:hidden block text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br dark:shadow-lg font-medium rounded-lg md:text-sm px-2 py-2.5 md:text-center md:me-2 md:mb-2"

          >
            Add Task
          </motion.button>
        </div>
        </div>
        <TaskList />
      </div>
    </div>
    </>
  );
};

export default page;
