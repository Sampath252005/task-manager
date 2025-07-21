"use client";
import { useEffect, useState } from "react";
import TaskSelector from "../components/ TaskSelector";
import TimerSettings from "../components/TimerSettings";
import TaskTimer from "../components/TaskTimer";

export default function TimerPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [workDuration, setWorkDuration] = useState(25); // default 25 mins
  const [breakDuration, setBreakDuration] = useState(5); // default 5 mins
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const task = tasks.find((t) => t._id === selectedTaskId);
    setSelectedTask(task || null);
  }, [selectedTaskId, tasks]);

  const handleComplete = () => {
    setIsWorkTime(!isWorkTime);
    setKey((prev) => prev + 1);
  };

  const startTimer = () => setIsPlaying(true);
  const pauseTimer = () => setIsPlaying(false);
  const resetTimer = () => {
    setIsPlaying(false);
    setKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-3xl font-bold">⏳ Task Timer</h1>

      <TaskSelector
        tasks={tasks}
        selectedTaskId={selectedTaskId}
        onSelect={setSelectedTaskId}
      />

      {selectedTask && (
        <>
          <TimerSettings
            workDuration={workDuration}
            breakDuration={breakDuration}
            setWorkDuration={setWorkDuration}
            setBreakDuration={setBreakDuration}
          />

          <TaskTimer
            keyId={key}
            duration={isWorkTime ? workDuration * 60 : breakDuration * 60}
            isPlaying={isPlaying}
            onComplete={handleComplete}
            color={isWorkTime ? "#22c55e" : "#3b82f6"}
            label={isWorkTime ? "Work Time" : "Break Time"}
            soundUrl="/alarm.mp3" // ✅ add a sound file to public/
          />

          <div className="flex gap-4 mt-4">
            <button
              onClick={startTimer}
              className="bg-green-500 px-4 py-2 rounded-lg text-amber-50"
            
            >
              Start
            </button>
            <button
              onClick={pauseTimer}
              className="bg-yellow-500 px-4 py-2 rounded-lg"
            >
              Pause
            </button>
            <button
              onClick={resetTimer}
              className="bg-red-500 px-4 py-2 rounded-lg"
            >
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
}
