"use client";

import Addtask from "./components/AddTask";

export default function Home() {
  return (
   
       <div>
      <h1 className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                     text-transparent bg-clip-text text-3xl font-bold">
        Welcome to the Task Manager
      </h1>
      <p className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                    text-transparent bg-clip-text text-sm font-bold mb-3">
        Manage your tasks efficiently!
      </p>
      <div>
        <Addtask />
      </div>
    </div>
  );
}
