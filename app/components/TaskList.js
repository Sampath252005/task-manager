"use client";

import React from "react";
import TaskCard from "./TaskCard"; // ✅ Correct import
import { useEffect,useState } from "react";
import Loading from "./Loading";

const TaskList = () => {
  const[tasks, setTasks] = useState([]);
  const[loading,setLoading] = useState(true);
  useEffect(() => {
    const fetchTasks= async ()=>{
      try{
        const token = localStorage.getItem("token");
        const response = await fetch("/api/tasks", {
          method: "GET",
          headers:{
            Authorization: `Bearer ${token}`,
          },
        });
        if(!response.ok){
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
       
      }
      catch(error){ 
        console.error("Error fetching tasks:", error);
      }
      finally{
        setLoading(false);
      }
    }
    fetchTasks();
  },[]);

  if (loading) return <Loading />;

  if (tasks.length === 0) return <div>No tasks found</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2 ">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          title={task.title}
          subtitle={task.subtitle}
          tagsList={task.tagsList}
          description={task.description}
        />
      ))}
    </div>
  );
};

export default TaskList;
