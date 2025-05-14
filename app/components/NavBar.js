import React from "react";
import Image from "next/image";

const NavBar = () => {
  return (
    <>
      <div className="flex flex-col justify-between items-center h-screen bg-gray-800 p-4 w-20">
        <div className=" hover:bg-gray-700 rounded-full cursor-pointer">
          <Image src="/layers.png" alt="Logo" width={40}  height={80} />
        </div>
        <div className=" flex flex-col items-center space-y-5">
          <span className="p-2 hover:bg-gray-700 rounded-full cursor-pointer">
            <Image src="/blue-file.png" alt="Logo" width={40} height={50} />
          </span>
          <span className="p-2 hover:bg-gray-700 rounded-full cursor-pointer">
            <Image src="/blue-message.png" alt="Logo" width={40}  height={50} />
          </span>
          <span className="p-2 hover:bg-gray-700 rounded-full cursor-pointer">
            <Image src="/color-calendar.png" alt="Logo" width={40}  height={50} />
          </span >
          <span className="p-2 hover:bg-gray-700 rounded-full cursor-pointer">
            <Image src="/blue-open-folder.png" alt="Logo" width={40}  height={50} />
          </span>
          <span className="p-2 hover:bg-gray-700 rounded-full cursor-pointer">
            <Image src="/color-notification.png" alt="Logo" width={40}  height={50} />
          </span>
          <span className="p-2 hover:bg-gray-700 rounded-full cursor-pointer">
            <Image src="/pie-chart.png" alt="Logo" width={40}  height={50} />
          </span>
        </div>
        <div className="flex flex-col items-center space-y-5">
          <span className="p-2 hover:bg-gray-700 rounded-full cursor-pointer">
            <Image src="/moon.png" alt="Logo" width={40}  height={50} />
          </span>
          <span className="p-2 hover:bg-gray-700 rounded-full cursor-pointer">
            <Image src="/sunny.png" alt="Logo" width={40}  height={50} />
          </span>
        </div>
      </div>
    </>
  );
};

export default NavBar;
