"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CalendarDays, Clock } from "lucide-react";

const UpcomingTask = () => {
  const [todayTasks, setTodayTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [dayAfterTasks, setDayAfterTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const tasks = res.data;
        const normalize = (date) => new Date(date).toLocaleDateString("en-CA"); // YYYY-MM-DD

        const today = new Date();
        const tmr = new Date();
        const dayAfter = new Date();
        tmr.setDate(today.getDate() + 1);
        dayAfter.setDate(today.getDate() + 2);

        const todayStr = normalize(today);
        const tmrStr = normalize(tmr);
        const dayAfterStr = normalize(dayAfter);

        const todayList = [];
        const tmrList = [];
        const dayAfterList = [];

        tasks.forEach((task) => {
          if (!task.date) return;
          const taskDate = new Date(task.date);
          if (isNaN(taskDate)) return;

          const taskDateStr = normalize(taskDate);
          if (taskDateStr === todayStr) todayList.push(task);
          else if (taskDateStr === tmrStr) tmrList.push(task);
          else if (taskDateStr === dayAfterStr) dayAfterList.push(task);
        });

        setTodayTasks(todayList);
        setTomorrowTasks(tmrList);
        setDayAfterTasks(dayAfterList);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const renderTaskList = (tasks) =>
    tasks.map((task) => (
      <motion.div
        key={task._id}
        className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 shadow hover:shadow-md transition-shadow border border-blue-200 dark:border-blue-700 min-h-[80px] flex flex-col justify-between"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-semibold text-base text-gray-800 dark:text-gray-100 truncate">
            {task.title}
          </h3>
          <Clock size={16} className="text-gray-500 dark:text-gray-300" />
        </div>
      </motion.div>
    ));

  const Section = ({ label, tasks, color }) => (
    <div className="flex flex-col gap-3  bg-blue-950 p-3">
      <h3
        className={`text-lg font-semibold flex items-center gap-2 text-${color}-700 dark:text-${color}-400`}
      >
        <CalendarDays size={18} /> {label}
      </h3>
      <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 hover:dark:scrollbar-thumb-gray-600 h-56 space-y-3">
        {tasks.length ? (
          renderTaskList(tasks)
        ) : (
          <p className="text-sm text-gray-400 dark:text-gray-500 italic">
            No tasks
          </p>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full h-full max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        📅 Upcoming Tasks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Section label="Today" tasks={todayTasks} color="blue" />
        <Section label="Tomorrow" tasks={tomorrowTasks} color="green" />
        <Section label="Day After Tomorrow" tasks={dayAfterTasks} color="red" />
      </div>
    </motion.div>
  );
};

export default UpcomingTask;
