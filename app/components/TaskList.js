"use client";

import React, { useEffect } from "react";
import TaskCard from "./TaskCard";
import Loading from "./Loading";
import { useTasks } from "../hooks/useTasks";
import AddTaskAnimation from "./AddTaskAnimation";

const TaskList = ({ view }) => {
  const {
    tasks,
    completedTasks,
    loading,
    refreshTasks,
    // refreshCompletedTasks,
  } = useTasks();

  useEffect(() => {

      refreshTasks();
 
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loading />
      </div>
    );

  const list = view === "pending" ? tasks : completedTasks;

  if (!list || list.length === 0)
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <AddTaskAnimation />
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
      {list.map((task) => (
        <TaskCard
          key={task._id}
          taskId={task._id}
          title={task.title}
          subtitle={task.subtitle}
          tag={task.tag}
          description={task.description}
          refreshTasks={refreshTasks}
          estimatedTime={task.estimatedTime}
          totalWorkTime={task.totalWorkTime}
          remainingTime={task.remainingTime}
          priority={task.priority}
          refreshPending={refreshTasks}
          // refreshCompleted={refreshCompletedTasks}
          view={view}
        />
      ))}
    </div>
  );
};

export default TaskList;
