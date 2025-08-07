"use client";
import React, { useEffect, useState } from "react";
import DailyTaskChart from "../components/DailyTaskChart";
import { groupCompletedTasksByDate } from "@/lib/groupTasksByDate";

const ProductivityCharts = () => {
  const [tasks, setTasks] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Not logged in.");
          return;
        }

        const res = await fetch("/api/completed-tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText);
        }

        const data = await res.json();
        console.log("Fetched tasks:", data);
        setTasks(data);

        const grouped = groupCompletedTasksByDate(data.tasks);
        console.log("grouped", grouped);
        setGroupedData(grouped);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks. Please log in again.");
      }
    };

    fetchTasks();
  }, []);
  const testData = [
    { date: "2025-08-05", count: 3 },
    { date: "2025-08-06", count: 1 },
    { date: "2025-08-07", count: 4 },
  ];
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">📈 Productivity Charts</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <DailyTaskChart data={groupedData} />
      )}
    </div>
  );
};

export default ProductivityCharts;
