// lib/groupTasksByDate.js
export function groupCompletedTasksByDate(tasks) {
  const counts = {};

  tasks.forEach((task) => {
    if (task.completed) {
      const date = new Date(task.updatedAt).toLocaleDateString("en-CA"); // "YYYY-MM-DD"
      counts[date] = (counts[date] || 0) + 1;
    }
  });

  return Object.entries(counts).map(([date, count]) => ({ date, count }));
}
