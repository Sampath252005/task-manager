import React from "react";
import TaskList from "../components/TaskList"; // ✅ Correct import
const page = () => {
  return (
    
      <div className="justify-center items-center w-full h-full px-4 py-5">
        <div className="backlog p-3 mt-5 bg-[#323643] border-l-2 h-screen">
          <h1 className="text-2xl font-bold text-red-500 p-3">Tasks</h1>
          <TaskList />
        </div>
       
    </div>
  );
};

export default page;
