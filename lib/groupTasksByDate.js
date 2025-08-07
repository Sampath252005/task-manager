export function groupCompletedTasksByDate(tasks) {
  const counts = {};

  tasks.forEach((task) => {
    const date = new Date(task.updatedAt).toLocaleDateString("en-CA"); // "YYYY-MM-DD"
    counts[date] = (counts[date] || 0) + 1;
  });

  return Object.entries(counts).map(([date, count]) => ({ date, count }));
}
