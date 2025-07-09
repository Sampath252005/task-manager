"use client";
import { useState } from "react";
import Calendar from "../components/Calender";
import AddTask from "../components/AddTask";

export default function TaskPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Manager</h1>

      {/* Calendar */}
      <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />

      {/* Selected Date Display */}
      <p className="mt-4 text-lg text-gray-700">
        Selected Date:{" "}
        <span className="font-medium">{selectedDate.toDateString()}</span>
      </p>

      {/* Add Task Button */}
      <button
        onClick={() => setShowAddTaskForm(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
      >
        + Add Task
      </button>

      {/* Add Task Form Modal */}
      {showAddTaskForm && (
        <AddTask
          close={() => setShowAddTaskForm(false)}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}
