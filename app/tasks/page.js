import React from "react";
import TaskList from "../components/TaskList"; // ✅ Correct import
const page = () => {
  return (
    <div>
      <div className="justify-center items-center w-full h-full px-4 py-5">
        <div className="backlog p-3 mt-5 bg-[#323643] border-l-2 border-red-500">
          <h1 className="text-2xl font-bold text-red-500 p-3">Backlog</h1>
          <TaskList />
        </div>
        <div className="Inprogress p-3 mt-5 bg-[#323643] border-l-2 border-yellow-500">
          <h1 className="text-2xl font-bold text-yellow-500 p-3">Inprogrss</h1>
          <TaskList />
        </div>
        <div className="completed p-3 mt-5 bg-[#323643] border-l-2 border-green-500">
          <h1 className="text-2xl font-bold text-green-500 p-3">Completed</h1>
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default page;
