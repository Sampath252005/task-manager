"use client"
import React, { useEffect } from "react";
import DashboardSummary from "../components/DashboardSummary";
import UpcomingTasks from "../components/UpcomingTasks";
import ProductivityCharts from "../components/ProductivityCharts";
import QuickActions from "../components/QuickActions";
import { useTasks } from "../hooks/useTasks";

const page = () => {
  const {  refreshTasks } = useTasks();

  useEffect(() => {
    refreshTasks();
  }, []);
  const sampleTasks = [
    { title: "Complete Dashboard UI", due: "Today" },
    { title: "Fix login bug", due: "Tomorrow" },
    { title: "Write blog post", due: "Friday" },
  ];
  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-20">
      <h1 className="text-3xl font-bold mb-6">👋 Welcome back, Sampath!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardSummary />
        <UpcomingTasks sampleTasks={sampleTasks} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ProductivityCharts sampleTasks={sampleTasks} />
        <QuickActions />
      </div>
    </div>
  );
};

export default page;
