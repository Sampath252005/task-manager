import React from "react";
import TaskList from "../components/TaskList"; // ✅ Correct import
const page = () => {
  return (
    
      <div className="justify-center items-center w-full h-[80vh] md:h-full  py-5 md:px-5">
        <div className="backlog p-3 mt-5 bg-[#323643] border-l-2 h-[90vh] md:h-full overflow-y-">
          <h1 className="text-2xl font-bold text-red-500 p-3">Tasks</h1>
          <TaskList />
        </div>
       
    </div>
  );
};

export default page;
