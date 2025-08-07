"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, ListChecks, Timer } from "lucide-react";
import { useSelector } from "react-redux";
import { useTasks } from "../hooks/useTasks";

const DashboardSummary = () => {
  const tasks = useSelector((state) => state.tasks.items); // active tasks from Redux
  const [completedCount, setCompletedCount] = useState(0); // separate state for completed tasks count

  // Fetch completed task count from backend
  useEffect(() => {
    const fetchCompletedCount = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ Get token
        const res = await fetch("/api/completed-tasks", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Set token
          },
        });
        const data = await res.json();
        setCompletedCount(data.count);
        console.log(data);
      } catch (error) {
        console.error("Error fetching completed count:", error);
      }
    };

    fetchCompletedCount();
  }, []);

  const totalCount = tasks.length + completedCount;
  const pendingCount = tasks.length;
  console.log("Total Tasks:", totalCount);
  console.log("Completed Tasks:", completedCount);
  console.log("Pending Tasks:", pendingCount);
  const [todayTime, setTodayTime] = useState(null);
  const [overallTime, setOverallTime] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/user/sessions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodayTime(data.today);
        setOverallTime(data.overall);
        console.log("details:",data.today,data.overall);
      })
      .catch((err) => console.error("Error fetching time stats:", err));
  }, []);

  const formatTime = (time) => {
    if (!time) return "Loading...";
    const { hours, minutes, seconds } = time;
    return `${hours}h ${minutes}m ${seconds}s`;
  };
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 transition hover:shadow-xl">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        📊 Today's Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50">
          <CheckCircle className="text-green-600 w-6 h-6" />
          <div>
            <p className="text-sm text-gray-600">Tasks Completed</p>
            <p className="text-lg font-bold text-green-700">{completedCount}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-red-50">
          <ListChecks className="text-red-600 w-6 h-6" />
          <div>
            <p className="text-sm text-gray-600">Pending Tasks</p>
            <p className="text-lg font-bold text-red-700">{pendingCount}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50">
          <Timer className="text-blue-600 w-6 h-6" />
          <div>
            <p className="text-sm text-gray-600">Total Time Spent</p>
            <p className="text-lg font-bold text-blue-700">{formatTime(overallTime)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-yellow-50">
          <Clock className="text-yellow-600 w-6 h-6" />
          <div>
            <p className="text-sm text-gray-600">Time Spent Today</p>
            <p className="text-lg font-bold text-yellow-700">{formatTime(todayTime)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
