"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, ListChecks, Timer } from "lucide-react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const DashboardSummary = () => {
  const tasks = useSelector((state) => state.tasks.items);
  const [completedCount, setCompletedCount] = useState(0);
  const [todayTime, setTodayTime] = useState(null);
  const [overallTime, setOverallTime] = useState(null);

  useEffect(() => {
    const fetchCompletedCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/completed-tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCompletedCount(data.count);
      } catch (error) {
        console.error("Error fetching completed count:", error);
      }
    };

    fetchCompletedCount();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/user/sessions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodayTime(data.today);
        setOverallTime(data.overall);
      })
      .catch((err) => console.error("Error fetching time stats:", err));
  }, []);

  const formatTime = (time) => {
    if (!time) return "Loading...";
    const { hours, minutes, seconds } = time;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const totalCount = tasks.length + completedCount;
  const pendingCount = tasks.length;

  const summaryData = [
    {
      icon: <CheckCircle className="text-green-600 w-6 h-6" />,
      label: "Tasks Completed",
      value: completedCount,
      bg: "bg-green-50",
      color: "text-green-700",
    },
    {
      icon: <ListChecks className="text-red-600 w-6 h-6" />,
      label: "Pending Tasks",
      value: pendingCount,
      bg: "bg-red-50",
      color: "text-red-700",
    },
    {
      icon: <Timer className="text-blue-600 w-6 h-6" />,
      label: "Total Time Spent",
      value: formatTime(overallTime),
      bg: "bg-blue-50",
      color: "text-blue-700",
    },
    {
      icon: <Clock className="text-yellow-600 w-6 h-6" />,
      label: "Time Spent Today",
      value: formatTime(todayTime),
      bg: "bg-yellow-50",
      color: "text-yellow-700",
    },
  ];

  return (
    <motion.div
      className="bg-white shadow-lg rounded-2xl p-6 md:p-10 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
        📊 Today's Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {summaryData.map((item, idx) => (
          <motion.div
            key={idx}
            className={`flex items-center gap-4 p-8 rounded-xl ${item.bg} hover:scale-[1.03] transition-transform duration-300`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            {item.icon}
            <div>
              <p className="text-sm text-gray-600">{item.label}</p>
              <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DashboardSummary;
