"use client";
import React from "react";
import Image from "next/image";

const TaskCard = ({ title, subtitle, tagsList = [], description, image }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <h3 className="text-md text-gray-600 dark:text-gray-300">
            {subtitle}
          </h3>
        )}
      </div>

      {tagsList.length > 0 && (
        <ul className="flex flex-wrap gap-2 mb-2">
          {tagsList.map((tag, index) => (
            <li
              key={index}
              className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded dark:bg-blue-900 dark:text-blue-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>

      <Image
        src={image || "/taskimage1.jpg"}
        alt="Task illustration"
        width={400}
        height={100}
        className="rounded mb-4"
      />

      <div className="flex items-center gap-2">
        <Image
          src="/profile.png"
          alt="User"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Assigned to Sampath
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
