"use client";
import { motion } from "framer-motion"
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";

export default function TaskTimer({
  keyId,
  duration,
  isPlaying,
  onComplete,
  color,
  label,
  soundUrl,
  selectedTaskId,
}) 



{
  const [audio] = useState(() => new Audio(soundUrl));

  useEffect(() => {
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isPlaying]);

  const { tasks, loading, refreshTasks } = useTasks();
   const updateTaskTime = async (taskId, sessionTime) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("../api/update-time", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ taskId, sessionTime }),
        });
  
        const data = await response.json();
        if (response.ok) {
          console.log("Updated remaining time:", data.remainingTime);
          // Optionally update UI or state here
          refreshTasks();
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to update time:", error);
      }
    };
  return (
   <motion.div
  className="flex flex-col items-center"
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  
>
  <CountdownCircleTimer
    key={keyId}
    isPlaying={isPlaying}
    duration={duration}
    colors={color}
    size={240}
    strokeWidth={14}
    trailColor="#1E293B"
    onComplete={() => {
      audio.play();
      updateTaskTime(selectedTaskId, duration / 60); // Convert seconds to minutes
      onComplete();
      return { shouldRepeat: false };
    }}
  >
    {({ remainingTime }) => (
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-3xl font-extrabold text-white"
      >
        {remainingTime}s
      </motion.div>
    )}
  </CountdownCircleTimer>

  <motion.p
    className="mt-4 text-white text-lg font-medium"
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    {label}
  </motion.p>
</motion.div>
  );
}
