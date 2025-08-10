"use client";
import { useEffect, useState } from "react";
import TaskSelector from "@/app/components/ TaskSelector";
import TimerSettings from "@/app/components/TimerSettings";
import TaskTimer from "@/app/components/TaskTimer";

export default function TimerPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [workDuration, setWorkDuration] = useState(25); // default 25 mins
  const [breakDuration, setBreakDuration] = useState(5); // default 5 mins
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0); // in seconds

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

    // Load total time for this task from localStorage
    if (selectedTaskId) {
      const saved = localStorage.getItem(`task-time-${selectedTaskId}`);
      setTotalTime(saved ? parseInt(saved) : 0);
    }
  }, [selectedTaskId, tasks]);

  const handleComplete = () => {
    setIsWorkTime(!isWorkTime);
    setKey((prev) => prev + 1);
  };

  const startTimer = () => {
    if (isWorkTime) {
      setSessionStartTime(new Date());
    }
    setIsPlaying(true);
  };

  const pauseTimer = async () => {
    setIsPlaying(false);

    if (!sessionStartTime || !selectedTaskId || !isWorkTime) return;

    const sessionEndTime = new Date();
    const duration = Math.floor(
      (sessionEndTime - new Date(sessionStartTime)) / 1000
    ); // in seconds

    try {
      const token = localStorage.getItem("token");

      await fetch(`/api/tasks/${selectedTaskId}/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          start: sessionStartTime.toISOString(),
          end: sessionEndTime.toISOString(),
        }),
      });

      console.log("✅ Session saved");

      // Update total time in localStorage
      const storageKey = `task-time-${selectedTaskId}`;
      const previousTime = parseInt(localStorage.getItem(storageKey)) || 0;
      const updatedTime = previousTime + duration;
      localStorage.setItem(storageKey, updatedTime);
      setTotalTime(updatedTime);
    } catch (err) {
      console.error("❌ Failed to save session:", err);
    }

    setSessionStartTime(null);
  };

  const resetTimer = () => {
    setIsWorkTime(!isWorkTime);
    setIsPlaying(false);
    setKey((prev) => prev + 1);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center gap-6 p-4">
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
            selectedTaskId={selectedTaskId}
            duration={isWorkTime ? workDuration * 60 : breakDuration * 60}
            isPlaying={isPlaying}
            onComplete={handleComplete}
            color={isWorkTime ? "#22c55e" : "#3b82f6"}
            label={isWorkTime ? "Work Time" : "Break Time"}
            soundUrl="/alarm.mp3"
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

          <p className="mt-4 text-lg">
            ⏱️ Total Time Spent on This Task:{" "}
            <span className="font-semibold">{formatTime(totalTime)}</span>
          </p>
        </>
      )}
    </div>
  );
}
