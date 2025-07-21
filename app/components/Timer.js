"use client";
import { useEffect, useState } from "react";

export default function Timer() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(1500); // default 25 mins
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  useEffect(() => {
    const clock = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
      setOnBreak((prev) => !prev);
      setSecondsLeft(onBreak ? workMinutes * 60 : breakMinutes * 60);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, onBreak]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStartPause = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setIsRunning(false);
    setOnBreak(false);
    setSecondsLeft(workMinutes * 60);
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg p-6 max-w-md mx-auto mt-10 border border-gray-700 shadow-xl">
      <h2 className="text-2xl font-semibold mb-2">⏰ Timer</h2>
      <p className="text-sm text-gray-400 mb-6">
        Current Time: {currentTime.toLocaleTimeString()}
      </p>

      <div className="mb-4">
        <label className="block text-sm mb-1">Work Minutes</label>
        <input
          type="number"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={workMinutes}
          onChange={(e) => {
            setWorkMinutes(+e.target.value);
            setSecondsLeft(+e.target.value * 60);
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1">Break Minutes</label>
        <input
          type="number"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={breakMinutes}
          onChange={(e) => setBreakMinutes(+e.target.value)}
        />
      </div>

      <div className="text-center text-4xl font-bold mb-6">
        {formatTime(secondsLeft)}
      </div>

      <div className="flex justify-center gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          onClick={handleStartPause}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <p className="text-center text-xs mt-4 text-gray-400">
        {onBreak ? "☕ Break Time" : "👨‍💻 Work Time"}
      </p>
    </div>
  );
}
