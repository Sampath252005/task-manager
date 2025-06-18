"use client";

import React, { useEffect } from "react";
import TaskCard from "./TaskCard";
import Loading from "./Loading";
import { useTasks } from "../hooks/useTasks";

const TaskList = () => {
  const { tasks, loading, refreshTasks } = useTasks();

  useEffect(() => {
    refreshTasks();
  }, []);

  if (loading) return <Loading />;
  if (!tasks||tasks.length === 0) return <div>No tasks found</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          taskId={task._id}
          title={task.title}
          subtitle={task.subtitle}
          tagsList={task.tagsList}
          description={task.description}
          refreshTasks={refreshTasks} // pass this down for delete or update
        />
      ))}
    </div>
  );
};

export default TaskList;
