"use client";
import { motion } from "framer-motion"
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useState } from "react";

export default function TaskTimer({
  keyId,
  duration,
  isPlaying,
  onComplete,
  color,
  label,
  soundUrl,
}) {
  const [audio] = useState(() => new Audio(soundUrl));

  useEffect(() => {
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isPlaying]);

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
