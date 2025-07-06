"use client";
import Task from "@/models/Task";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // ✅ Required for styling
import TaskDoneAnimation from "../components/TaskDoneAnimation";

const Page = () => {
  const [value, onChange] = useState(new Date());

  return (
     <>
    <div className="p-4">
      <Calendar onChange={onChange} value={value} />
    </div>
   </>
  );
};

export default Page;
