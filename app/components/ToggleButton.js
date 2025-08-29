"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, toggleDarkMode } from "@/app/store/themeSlice";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const ToggleButton = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDark = savedTheme === "dark";
    dispatch(setDarkMode(isDark));
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setHasMounted(true);
  }, []);

  const handleToggle = () => {
    const newMode = !isDarkMode;
    dispatch(setDarkMode(newMode));
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  if (!hasMounted) return null; // Prevent flash

  return (
    <div
      className="flex flex-col items-center space-y-2 bg-white dark:bg-gray-700 cursor-pointer rounded-full p-1 mb-3 md:mb-0"
      onClick={handleToggle}
    >
      <AnimatePresence mode="wait">
        {isDarkMode ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="p-2 bg-blue-250 rounded-full"
          >
            <Image src="/moon.png" alt="Dark Mode" width={25} height={25} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.3 }}
            className="p-2 bg-blue-250 rounded-full"
          >
            <Image src="/sunny.png" alt="Light Mode" width={25} height={25} />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToggleButton;
