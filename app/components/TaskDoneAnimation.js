// components/TaskDoneAnimation.js
import React from "react";
import Lottie from "lottie-react";
import doneAnimation from "/public/taskdone.json"; // or wherever you saved it

const TaskDoneAnimation = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-60 h-60">
        <Lottie animationData={doneAnimation} loop={false} />
      </div>
    </div>
  );
};

export default TaskDoneAnimation;
