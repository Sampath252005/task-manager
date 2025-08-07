"use client";
import React, { useEffect, useState } from "react";
import DailyTaskChart from "../components/DailyTaskChart";
import { groupCompletedTasksByDate } from "@/lib/groupTasksByDate";

const ProductivityCharts = () => {
  const [tasks, setTasks] = useState([]);
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      console.log("data:",data);
      setTasks(data);
      setGroupedData(groupCompletedTasksByDate(data));
    };
    fetchTasks();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">📈 Productivity Charts</h2>
      <DailyTaskChart data={groupedData} />
    </div>
  );
};

export default ProductivityCharts;
