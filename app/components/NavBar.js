"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ToggleButton from "../components/ToggleButton";

const NavBar = ({ NavbarShow, setNavbarShow }) => {
  const router = useRouter();

  return (
    <>
      {/* Toggle Button - Always Visible */}
      <div
        className="fixed top-2 md:top-4 left-2 md:left-4 z-[9999] 
             p-2 mb-5 mt-3 md:mt-0 bg-gray-900 cursor-pointer 
             hover:bg-gray-700 rounded-2xl"
        onClick={() => setNavbarShow(!NavbarShow)}
      >
        <Image src="/layers.png" alt="Toggle Sidebar" width={25} height={25} />
      </div>

      {/* Sidebar with smooth animation */}
      <AnimatePresence>
        {NavbarShow && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 flex flex-col justify-between items-center min-h-screen dark:bg-gray-800 bg-white p-2  md:p-5 w-15 md:w-20 z-40"
          >
            <div className="flex flex-col items-center space-y-10 md:space-y-10 mt-20 ">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative group  text-white bg-transparent rounded cursor-pointer  hover:bg-gray-700 p-2"
                onClick={() => router.push("/tasks")}
              >
                <Image
                  src="/blue-file.png"
                  alt="Files"
                  width={25}
                  height={25}
                  className="tasks"
                />
                <span className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  files
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative group text-white bg-transparent rounded cursor-pointer hover:bg-gray-700 p-2"
              >
                <Image
                  src="/clock.png"
                  alt="Timer"
                  width={25}
                  height={25}
                  onClick={() => router.push("/timer")}
                />
                {/* Tooltip */}
                <span className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Timer
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative group text-white bg-transparent rounded cursor-pointer  hover:bg-gray-700 p-2"
              >
                <Image
                  src="/color-calendar.png"
                  alt="Calendar"
                  width={25}
                  height={25}
                  onClick={() => router.push("/calender")}
                />
                <span className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Timer
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className=" relative group text-white bg-transparent rounded cursor-pointer  hover:bg-gray-700 p-2"
              >
                <Image
                  src="/blue-open-folder.png"
                  alt="Folder"
                  width={25}
                  height={25}
                  onClick={() => router.push("/files")}
                />
                <span className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  file
                </span>
              </motion.button>
              {/* 
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white bg-transparent rounded cursor-pointer  hover:bg-gray-700 p-2"
              >
                <Image
                  src="/color-notification.png"
                  alt="Notifications"
                  width={25}
                  height={25}
                />
              </motion.button> */}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative group text-white bg-transparent rounded cursor-pointer  hover:bg-gray-700 p-2"
              >
                <Image
                  src="/pie-chart.png"
                  alt="Analytics"
                  width={25}
                  height={25}
                  onClick={() => router.push("/dashboard")}
                />
                <span className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Dashboard
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative group text-white bg-transparent rounded cursor-pointer  hover:bg-gray-700 p-2"
                onClick={() => router.push("/profile")}
              >
                <Image
                  src="/profile.png"
                  alt="profile"
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
