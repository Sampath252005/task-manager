"use client";
import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { motion } from "framer-motion";
import { Howl } from "howler";

const sound = new Howl({
  src: ["/alarm.mp3"], // Put your sound in /public
});

export default function PomodoroTimer() {
  const [key, setKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [duration, setDuration] = useState(1500); // 25 mins

  const toggleTimer = () => setIsPlaying(!isPlaying);

  const handleComplete = () => {
    sound.play();
    const nextDuration = isBreak ? 1500 : 300; // 25 or 5 minutes
    setDuration(nextDuration);
    setIsBreak(!isBreak);
    setKey((prevKey) => prevKey + 1);
    return { shouldRepeat: true, delay: 1 };
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4 rounded-xl shadow-xl bg-gray-800 text-white max-w-sm mx-auto mt-10 sm:mt-20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-semibold mb-4">
        {isBreak ? "☕ Break Time" : "🕒 Focus Time"}
      </h2>

      <CountdownCircleTimer
        key={key}
        isPlaying={isPlaying}
        duration={duration}
        colors={isBreak ? "#00C49F" : "#3B82F6"}
        trailColor="#1F2937"
        strokeWidth={10}
        size={220}
        onComplete={handleComplete}
      >
        {({ remainingTime }) => {
          const minutes = Math.floor(remainingTime / 60);
          const seconds = remainingTime % 60;
          return (
            <div className="text-center text-3xl font-bold">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>
          );
        }}
      </CountdownCircleTimer>

      <button
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-all"
        onClick={toggleTimer}
      >
        {isPlaying ? "Pause" : "Start"}
      </button>
    </motion.div>
  );
}
