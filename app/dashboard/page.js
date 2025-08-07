"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import DashboardSummary from "../components/DashboardSummary";
import UpcomingTasks from "../components/UpcomingTasks";
import ProductivityCharts from "../components/ProductivityCharts";
import QuickActions from "../components/QuickActions";
import { useTasks } from "../hooks/useTasks";



const page = () => {
  const { refreshTasks } = useTasks();

  useEffect(() => {
    refreshTasks();
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-10">
      <motion.h1
        className="text-3xl font-bold mb-6 text-black"
        {...fadeUp}
        transition={{ duration: 0.5 }}
      >
        👋 Welcome back, Sampath!
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div {...fadeUp} className="h-full">
          <div className="h-full">
            <DashboardSummary />
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="h-full">
          <div className="h-full">
            <UpcomingTasks />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <motion.div {...fadeUp} className="h-full">
          <div className="h-full">
            <ProductivityCharts />
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="h-full">
          <div className="h-full">
            <QuickActions />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default page;
