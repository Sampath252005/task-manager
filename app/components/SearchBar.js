"use client";

import React, { useState, useRef, useEffect } from "react";

const SearchBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center flex-wrap gap-4 p-4 relative">
      {/* Left nav links */}
      <div className="flex gap-4 font-bold text-gray-700">
        <span className="cursor-pointer hover:text-purple-600">Projects</span>
        <span className="cursor-pointer hover:text-purple-600">Tasks</span>
        <span className="cursor-pointer hover:text-purple-600">Calendar</span>
      </div>

      {/* Search form with dropdown */}
      <form className="flex max-w-md flex-1 relative" ref={dropdownRef}>
        <button
          id="dropdown-button"
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200"
          onClick={() => setDropdownOpen((prev) => !prev)}
          aria-expanded={dropdownOpen}
          aria-controls="dropdown-options"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 3a1 1 0 01.993.883L11 4v4h4a1 1 0 01.117 1.993L15 10h-4v4a1 1 0 01-1.993.117L9 14v-4H5a1 1 0 01-.117-1.993L5 8h4V4a1 1 0 011-1z" />
          </svg>
          Option
        </button>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div
            id="dropdown-options"
            className="absolute z-10 top-12 left-0 bg-white border border-gray-300 rounded shadow-md w-40"
          >
            <button className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100">
              Option 1
            </button>
            <button className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100">
              Option 2
            </button>
            <button className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100">
              Option 3
            </button>
          </div>
        )}

        <input
          type="text"
          id="location-search"
          className="flex-1 rounded-r-lg border border-gray-300 px-4 py-2 text-sm text-gray-900"
          placeholder="Enter your email"
          aria-label="Search input"
        />
      </form>

      {/* Add Task button */}
      <div className="relative">
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
          Add Task
        </button>

        {/* Optional: User dropdown menu (currently hidden) */}
        <div
          className="hidden z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
          id="user-dropdown"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              Bonnie Green
            </span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
              name@flowbite.com
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
