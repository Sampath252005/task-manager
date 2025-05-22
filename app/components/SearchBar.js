"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const SearchBar = ({ NavbarShow, setNavbarShow }) => {
  const [SearchBardropdownOpen, setSearchBarDropdownOpen] = useState(false);
  const SearchBardropdownRef = useRef(null);
  const ProfileRef = useRef(null);
  const [OpenProfile, setOpenProfile] = useState(false);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        SearchBardropdownRef.current &&
        !SearchBardropdownRef.current.contains(event.target)
      ) {
        setSearchBarDropdownOpen(false);
      }
      if (ProfileRef.current && !ProfileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [selectedCategory, setSelectedCategory] = useState("All categories");

  return (
    <div
      className={`flex justify-between  flex-wrap gap-4  relative min-w-full items-center ${
        NavbarShow ? " pl-10" : "pl-18"
      } `}
    >
      {/* Left nav links */}
      <div className="flex gap-4 font-bold text-white">
        <span className="cursor-pointer hover:text-purple-600">Projects</span>
        <span className="cursor-pointer hover:text-purple-600">Tasks</span>
        <span className="cursor-pointer hover:text-purple-600">Calendar</span>
      </div>

      {/* Search form with dropdown */}
      <form className="max-w-lg mx-auto">
        <div className="flex" ref={SearchBardropdownRef}>
          <label
            htmlFor="search-dropdown"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Your Email
          </label>

          {/* Dropdown Toggle Button */}
          <button
            type="button"
            className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            onClick={() => setSearchBarDropdownOpen(!SearchBardropdownOpen)}
          >
            {selectedCategory}
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 10 6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1l4 4 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {SearchBardropdownOpen && (
            <div className="absolute mt-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {["Mockups", "Templates", "Design", "Logos"].map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        setSelectedCategory(option);
                        setDropdownOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Search Input */}
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900  rounded  border-s-2 border  dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
              placeholder={`Search ${selectedCategory}...`}
              required
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800    dark:bg-blue-600 dark:hover:bg-blue-700 "
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

      {/* Add Task button */}
      <div className="relative flex items-center gap-10 justify-center">
        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4  focus:ring-blue-300  shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Add Task
        </button>

        {/* Optional: User dropdown menu (currently hidden) */}
        <div className="flex items-center gap-4">
          <div className="relative inline-block text-left" ref={ProfileRef}>
            {/* Avatar Button */}
            <span
              className="flex items-center gap-5 bg-gray-900 p-2 text-white rounded-full cursor-pointer"
              onClick={() => setOpenProfile(!OpenProfile)}
            >
              <h2 className="font-bold">Sampath</h2>
              <Image
                className="w-10 h-10 rounded-full cursor-pointer"
                src="/profile.png"
                alt="User dropdown"
                width={40}
                height={40}
              />
            </span>

            {/* Dropdown Menu */}
            {OpenProfile && (
              <div className="absolute z-10 mt-2 right-0 top-14 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                {/* User Info */}
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>Bonnie Green</div>
                  <div className="font-medium truncate">name@flowbite.com</div>
                </div>

                {/* Navigation Links */}
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                </ul>

                {/* Sign Out */}
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
