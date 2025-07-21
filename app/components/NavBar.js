"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation'

const NavBar = ({ NavbarShow, setNavbarShow }) => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      {/* Toggle Button - Always Visible */}
      <div
        className="fixed top-2 md:top-4 left-2  md:left-4 z-50 p-2 mb-5 mt-3 md:mt-0 bg-gray-900 cursor-pointer hover:bg-gray-700 rounded-2xl"
        onClick={() => setNavbarShow(!NavbarShow)}
      >
        <Image src="/layers.png" alt="Toggle Sidebar" width={25} height={25}  />
      </div>

      {/* Sidebar with smooth animation */}
      <AnimatePresence>
        {NavbarShow && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 flex flex-col justify-between items-center min-h-screen bg-gray-800 p-2  md:p-5 w-15 md:w-20 z-40"
          >
            <div className="flex flex-col items-center space-y-10 md:space-y-10 mt-20 ">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="  text-white bg-transparent rounded cursor-pointer  hover:bg-gray-700 p-2"
                onClick={() => router.push('/tasks')}
              >
                <Image
                  src="/blue-file.png"
                  alt="Files"
                  width={25}
                  height={25}
                  className="tasks"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white bg-transparent rounded cursor-pointer hover:bg-gray-700 p-2"
              >
                <Image
                  src="/clock.png"
                  alt="Messages"
                  width={25}
                  height={25}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white bg-transparent rounded cursor-pointer  hover:bg-gray-700 p-2"
              >
                <Image
                  src="/color-calendar.png"
                  alt="Calendar"
                  width={25}
                  height={25}
                  onClick={()=>router.push('/calender')}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white bg-transparent rounded cursor-pointer  hover:bg-gray-700 p-2"
              >
                <Image
                  src="/blue-open-folder.png"
                  alt="Folder"
                  width={25}
                  height={25}
                  onClick={()=>router.push('/files')}
                />
              </motion.button>

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
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white bg-transparent rounded cursor-pointer  hover:bg-gray-700 p-2"
              >
                <Image
                  src="/pie-chart.png"
                  alt="Analytics"
                  width={25}
                  height={25}
                />
              </motion.button>
            </div>

            {/* Dark Mode Toggle */}
            <div
              className="flex flex-col items-center space-y-2 bg-gray-700 cursor-pointer rounded-full p-1 mb-3 md:mb-0"
              onClick={toggleDarkMode}
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
                    <Image
                      src="/moon.png"
                      alt="Dark Mode"
                      width={25}
                      height={25}
                    />
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
                    <Image
                      src="/sunny.png"
                      alt="Light Mode"
                      width={25}
                      height={25}
                    />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
