"use client";
import { useEffect, useState } from "react";

export default function DebugPage() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-500">
      <h1 className="text-3xl font-bold mb-6">Dark Mode Debug Page</h1>
      <button
        onClick={toggleTheme}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Toggle Theme
      </button>
      <p className="mt-6">Current theme: {theme}</p>
    </div>
  );
}
