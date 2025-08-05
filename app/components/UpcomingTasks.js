import React from 'react'

const UpcomingTasks = ({sampleTasks}) => {
  
  return (
     <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">📅 Upcoming Tasks</h2>
      <ul className="space-y-3">
        {sampleTasks.map((task, idx) => (
          <li key={idx} className="border-b pb-2">
            <div className="font-medium">{task.title}</div>
            <div className="text-sm text-gray-500">Due: {task.due}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UpcomingTasks