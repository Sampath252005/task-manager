"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const NavBar = () => {
  return (
    <>
      <div className="flex flex-col justify-between items-center h-screen bg-gray-800 p-4 max-w-18 md:w-20 ">
        <div className=" hover:bg-gray-700 rounded-full cursor-pointer">
          <Image src="/layers.png" alt="Logo" width={40} height={80} />
        </div>
        <div className=" flex flex-col items-center space-y-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white bg-transparent rounded cursor-pointer"
          >
            <Image src="/blue-file.png" alt="Logo" width={30} height={40} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white bg-transparent rounded cursor-pointer hover:bg-gray-700 p-2"
          >
            <Image src="/blue-message.png" alt="Logo" width={30} height={40} />
          </motion.button>

          {/* <Image src="/blue-message.png" alt="Logo" width={40} height={50} /> */}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white bg-transparent rounded cursor-pointer"
          >
            <Image
              src="/color-calendar.png"
              alt="Logo"
              width={30} height={40}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white bg-transparent rounded cursor-pointer"
          >
            <Image
              src="/blue-open-folder.png"
              alt="Logo"
              width={30} height={40}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white bg-transparent rounded cursor-pointer"
          >
            <Image
              src="/color-notification.png"
              alt="Logo"
              width={30} height={40}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white bg-transparent rounded cursor-pointer"
          >
            <Image src="/pie-chart.png" alt="Logo" width={30} height={40} />
          </motion.button>
        </div>
        <div className="flex flex-col items-center space-y-2 hover:bg-gray-700 rounded-full p-1 md:p-0">
          <span className="p-2 cursor-pointer">
            <Image src="/moon.png" alt="Logo" width={40} height={50} />
          </span>
          <span className="p-2 cursor-pointer">
            <Image src="/sunny.png" alt="Logo" width={40} height={50} />
          </span>
        </div>
      </div> 
    </>
  );
};

export default NavBar;
