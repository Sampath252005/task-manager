"use client";
import React from "react";
import Image from "next/image";

const profile = () => {
  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="flex flex-row  text-center  bg-gradient-to-tr from-gray-900 via-slate-700 to-slate-900  min-h-screen rounded-2xl  min-w-full">
        <div className=" shadow-md rounded-lg p-6  flex-1  ">
          <div className="flex  flex-col   text-white  bg-gray-900 gap-10   p-3 ">
            <div className="flex items-center justify-around space-x-15 ">
              <div>
              <Image
                className="w-6 md:w-40 h-6 md:h-40 rounded-full cursor-pointer"
                src="/profile.png"
                alt="User dropdown"
                width={100}
                height={100}
              />
              </div>
              <div className="flex flex-col items-center">
                <p className=" mb-2">Name</p>
                <p>{capitalizeFirstLetter(user?.username)}</p>
              </div>
            </div>
             <div className="flex justify-around">
             <div className="flex flex-col items-center">
                <p className=" mb-2">Name</p>
                <p>{capitalizeFirstLetter(user?.username)}</p>
              </div>
             <div className="flex flex-col items-center">
                <p className=" mb-2">Name</p>
                <p>{capitalizeFirstLetter(user?.username)}</p>
              </div>
            </div>
            <div className="flex justify-around">
             <div className="flex flex-col items-center">
                <p className=" mb-2">Name</p>
                <p>{capitalizeFirstLetter(user?.username)}</p>
              </div>
             <div className="flex flex-col items-center">
                <p className=" mb-2">Name</p>
                <p>{capitalizeFirstLetter(user?.username)}</p>
              </div>
            </div>
            <div className="flex justify-around">
             <div className="flex flex-col items-center">
                <p className=" mb-2">Name</p>
                <p>{capitalizeFirstLetter(user?.username)}</p>
              </div>
             <div className="flex flex-col items-center">
                <p className=" mb-2">Name</p>
                <p>{capitalizeFirstLetter(user?.username)}</p>
              </div>
            </div>
            {/* Add more profile details as needed */}
          </div>
        </div>

        <div className=" shadow-md rounded-lg p-6  justify-center items-center flex-1">
          <div className="flex items-center mb-4 text-white space-x-10 bg-gray-900  rounded-lg justify-center">
            <div>
              <Image
                className="w-6 md:w-40 h-6 md:h-40 rounded-full cursor-pointer"
                src="/profile.png"
                alt="User dropdown"
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col">
              <p className=" mb-2">Name</p>
              <p>{capitalizeFirstLetter(user?.username)}</p>
            </div>
          </div>

          <p className=" mb-2">Email: {user?.username}</p>
          {/* Add more profile details as needed */}
        </div>
      </div>
    </>
  );
};

export default profile;
