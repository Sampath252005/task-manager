import React from 'react'

const QuickActions = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">⚡ Quick Actions</h2>
      <div className="flex flex-col gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">+ Add Task</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-xl">🎯 Start Focus Timer</button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded-xl">📅 View Calendar</button>
      </div>
    </div>
  )
}

export default QuickActions