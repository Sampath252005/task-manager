"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DailyTaskChart = ({ data }) => {
  // Ensure data is always an array
  const chartData = Array.isArray(data) ? data : [];
  const hasData = chartData.length > 0;

  return (
    <div className="w-full h-70 p-4">
      <h2 className="text-sm md:text-xl font-bold mb-2">
        Daily Task Completion
      </h2>

      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex flex-col items-center justify-center h-60 text-gray-500">
          <p className="text-lg font-semibold">No tasks completed yet</p>
          <p className="text-sm text-gray-400">
            Start completing tasks to see your progress here.
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyTaskChart;
