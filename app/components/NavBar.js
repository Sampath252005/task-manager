"use client";
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ToggleButton from "../components/ToggleButton";

const NavBar = ({ NavbarShow, setNavbarShow }) => {
  const router = useRouter();

  // 🔥 Navigate instantly and close navbar
  const handleNavigation = (path) => {
    // setNavbarShow(false); // Hide sidebar instantly
    router.push(path); // Navigate immediately
  };

  return (
    <>
      {/* Toggle Button - Always Visible */}
      <div
        className="fixed top-2 md:top-4 left-2 md:left-4 z-[9999] 
             p-2 mb-5 mt-3 md:mt-0 bg-blue-200 dark:bg-gray-900 cursor-pointer 
             hover:bg-gray-700 rounded-2xl"
        onClick={() => setNavbarShow(!NavbarShow)}
      >
        <Image src="/layers.png" alt="Toggle Sidebar" width={25} height={25} />
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {NavbarShow && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }} // 🔥 No slide-out delay, instant unmount
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 flex flex-col justify-between items-center min-h-screen dark:bg-gray-800 bg-[#abc4ff] p-2 md:p-5 w-15 md:w-20 z-40"
          >
            <div className="flex flex-col items-center space-y-10 md:space-y-10 mt-20">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative group text-white bg-transparent rounded cursor-pointer dark:hover:bg-gray-700 p-2"
                onClick={() => handleNavigation("/tasks")}
              >
                <Image
                  src="/blue-file.png"
                  alt="Files"
                  width={25}
                  height={25}
                />
                <span className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Tasks
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative group text-white bg-transparent rounded cursor-pointer dark:hover:bg-gray-700 p-2"
                onClick={() => handleNavigation("/timer")}
              >
                <Image src="/clock.png" alt="Timer" width={25} height={25} />
                <span className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Timer
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative group text-white bg-transparent rounded cursor-pointer dark:hover:bg-gray-700 p-2"
                onClick={() => handleNavigation("/calender")}
              >
                <Image
                  src="/color-calendar.png"
                  alt="Calendar"
                  width={25}
                  height={25}
                />
                <span className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Calendar
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative group text-white bg-transparent rounded cursor-pointer dark:hover:bg-gray-700 p-2"
                onClick={() => handleNavigation("/files")}
              >
                <Image
                  src="/blue-open-folder.png"
                  alt="Folder"
                  width={25}
                  height={25}
                />
                <span className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Files
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative group text-white bg-transparent rounded cursor-pointer dark:hover:bg-gray-700 p-2"
                onClick={() => handleNavigation("/dashboard")}
              >
                <Image
                  src="/pie-chart.png"
                  alt="Dashboard"
                  width={25}
                  height={25}
                />
                <span className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Dashboard
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative group text-white bg-transparent rounded cursor-pointer dark:hover:bg-gray-700 p-2"
                onClick={() => handleNavigation("/profile")}
              >
                <Image
                  src="/profile.png"
                  alt="Profile"
                  width={25}
                  height={25}
                />
                <span className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Profile
                </span>
              </motion.button>
            </div>

            {/* Dark Mode Toggle */}
            <ToggleButton />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
