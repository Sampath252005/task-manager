"use client";
import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { motion } from "framer-motion";

export default function Calendar({ selectedDate, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showAddButton, setShowAddButton] = useState(false);

  useEffect(() => {
    setShowAddButton(!!selectedDate);
  }, [selectedDate]);

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4 px-4">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="text-gray-600 hover:text-blue-500 transition"
      >
        &larr;
      </button>
      <h2 className="text-lg font-semibold text-gray-800">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="text-gray-600 hover:text-blue-500 transition"
      >
        &rarr;
      </button>
    </div>
  );

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 text-xs text-center text-gray-500 font-semibold px-2">
        {days.map((day) => (
          <div key={day} className="py-1 tracking-wide uppercase">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isToday = isSameDay(day, new Date());
        const isSelected = selectedDate && isSameDay(day, selectedDate);

        const baseStyle = `flex flex-col items-center justify-center h-16 w-16 mx-auto rounded-full cursor-pointer transition`;
        const notCurrentMonthStyle = !isSameMonth(day, monthStart)
          ? "text-gray-300"
          : "text-gray-700";

        const todayStyle = isToday
          ? "border-2 border-green-500 text-blue-600 font-bold"
          : "";

        const selectedStyle = isSelected
          ? "bg-blue-100 ring-2 ring-blue-400"
          : "hover:bg-blue-50";

        days.push(
          <div
            key={day}
            onClick={() => onDateSelect(cloneDay)}
            className={`${baseStyle} ${notCurrentMonthStyle} ${todayStyle} ${selectedStyle}`}
          >
            <div>{format(day, dateFormat)}</div>
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-7 " key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="mt-1">{rows}</div>;
  };

  return (
    <div className="w-full max-w-[90%] bg-white  rounded-2xl shadow-xl border border-gray-200 flex flex-col">
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      {/* Add Task Button at Bottom Left */}
      {showAddButton && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          onClick={() => onDateSelect(selectedDate, true)} // true = open AddTask
          className="mr-5 mb-3. cursor-pointer bg-blue-600 text-white px-4 py-2 text-2xl rounded-[50%] hover:bg-blue-700 transition self-end-safe"
        >
          + 
        </motion.button>
      )}
    </div>
  );
}
