"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DashboardSummary from "../../components/DashboardSummary";
import UpcomingTasks from "../../components/UpcomingTasks";
import ProductivityCharts from "../../components/ProductivityCharts";
import QuickActions from "../../components/QuickActions";
import { useTasks } from "../../hooks/useTasks";

const Page = () => {
  const { refreshTasks } = useTasks();
  const [user, setUser] = useState(null);

  useEffect(() => {
    refreshTasks();
  }, []);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      console.log("user:", storedUser);
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  const capitalizeFirstLetter = (val) =>
    String(val).charAt(0).toUpperCase() + String(val).slice(1);

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  return (
    <div className="p-6 min-h-screen mt-10 bg-gray-100 dark:bg-gray-900">
      <motion.h1
        className="text-[20px] md:text-3xl  font-bold mb-6 text-black dark:text-white"
        {...fadeUp}
        transition={{ duration: 0.5 }}
      >
        👋 Welcome back, {user ? capitalizeFirstLetter(user.username) : ""}
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

export default Page;
