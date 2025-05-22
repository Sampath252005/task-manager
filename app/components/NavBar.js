"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const NavBar = () => {
  const [NavbarShow, setNavbarShow] = useState(true);

  return (
    <>
      {/* Toggle Button - Always Visible */}
      <div
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-full cursor-pointer hover:bg-gray-700"
        onClick={() => setNavbarShow(!NavbarShow)}
      >
        <Image src="/layers.png" alt="Toggle Sidebar" width={30} height={30} />
      </div>

      {/* Sidebar */}
      {NavbarShow && (
        <div className="fixed top-0 left-0 flex flex-col justify-between items-center h-screen bg-gray-800 p-4 w-20 z-40">
          <div className="flex flex-col items-center space-y-8 mt-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white bg-transparent rounded cursor-pointer"
            >
              <Image src="/blue-file.png" alt="Files" width={30} height={40} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white bg-transparent rounded cursor-pointer hover:bg-gray-700 p-2"
            >
              <Image
                src="/blue-message.png"
                alt="Messages"
                width={30}
                height={40}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white bg-transparent rounded cursor-pointer"
            >
              <Image
                src="/color-calendar.png"
                alt="Calendar"
                width={30}
                height={40}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white bg-transparent rounded cursor-pointer"
            >
              <Image
                src="/blue-open-folder.png"
                alt="Folder"
                width={30}
                height={40}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white bg-transparent rounded cursor-pointer"
            >
              <Image
                src="/color-notification.png"
                alt="Notifications"
                width={30}
                height={40}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white bg-transparent rounded cursor-pointer"
            >
              <Image
                src="/pie-chart.png"
                alt="Analytics"
                width={30}
                height={40}
              />
            </motion.button>
          </div>

          <div className="flex flex-col items-center space-y-2 hover:bg-gray-700 rounded-full p-1 md:p-0">
            <span className="p-2 cursor-pointer">
              <Image src="/moon.png" alt="Dark Mode" width={30} height={30} />
            </span>
            <span className="p-2 cursor-pointer">
              <Image src="/sunny.png" alt="Light Mode" width={30} height={30} />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
