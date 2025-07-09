import { useState } from "react";
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

export default function Calendar({ selectedDate, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

        const baseStyle = `flex items-center justify-center h-10 w-10 mx-auto rounded-full cursor-pointer transition`;
        const notCurrentMonthStyle = !isSameMonth(day, monthStart)
          ? "text-gray-300"
          : "text-gray-700";

        const todayStyle = isToday
          ? "border-2 border-green-500 text-blue-600 font-bold"
          : "";

        const selectedStyle = isSelected
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "hover:bg-blue-100";

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
        <div className="grid grid-cols-7 gap-y-1 py-1" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="mt-1">{rows}</div>;
  };

  return (
    <div className="w-full h-full max-h-[90%] max-w-[90%] bg-white p-5 rounded-2xl shadow-xl border border-gray-200 transition-all duration-300">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
