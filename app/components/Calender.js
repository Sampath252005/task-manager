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

export default function Calendar({ selectedDate, onDateSelect,refreshTasks }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showAddButton, setShowAddButton] = useState(false);

  useEffect(() => {
    setShowAddButton(!!selectedDate);
    refreshTasks();
  }, [selectedDate]);

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4 px-4 text-blue-200">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="hover:text-cyan-400 transition"
      >
        &larr;
      </button>
      <h2 className="text-lg font-bold tracking-wide">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="hover:text-cyan-400 transition"
      >
        &rarr;
      </button>
    </div>
  );

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 text-xs text-center text-blue-300 font-semibold  mb-1">
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

        const baseStyle =
          "flex flex-col items-center justify-center md:h-14 md:w-14 h-10 w-10  mx-auto rounded-full cursor-pointer transition duration-200";
        const notCurrentMonthStyle = !isSameMonth(day, monthStart)
          ? "text-gray-500"
          : "text-blue-100";

        const todayStyle = isToday
          ? "border-2 border-cyan-400 text-cyan-300 font-bold"
          : "";

        const selectedStyle = isSelected
          ? "bg-cyan-500 text-white font-semibold shadow-md"
          : "hover:bg-cyan-800";

        days.push(
          <div
            key={day}
            onClick={() => onDateSelect(cloneDay)}
            className={`${baseStyle} ${notCurrentMonthStyle} ${todayStyle} ${selectedStyle}`}
          >
            {format(day, dateFormat)}
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-7 gap-y-2  py-1" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="mt-1">{rows}</div>;
  };

  return (
    <div className="w-full max-w-[90%] bg-[#1e293b] p-1 rounded-2xl shadow-2xl border border-blue-900 flex flex-col ">
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      {/* Floating Add Task Button at bottom-right of calendar box */}
      {showAddButton && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDateSelect(selectedDate, true)}
          className="relative  bottom-2 -right-350 bg-cyan-500 w-20 h-auto text-white text-2xl font-bold px-4 py-2 rounded-full shadow-lg hover:bg-cyan-400 transition"
        >
          +
        </motion.button>
      )}
    </div>
  );
}
