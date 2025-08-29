"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AddTask from "./AddTask";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/searchSlice";
import { set } from "mongoose";

const SearchBar = ({ NavbarShow, setNavbarShow }) => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const profilePic = localStorage.getItem("profilePic");
  const isMdOrLarger = useMediaQuery({ query: "(min-width: 768px)" });

  const paddingLeft = isMdOrLarger
    ? NavbarShow
      ? "2.5rem"
      : "2rem"
    : NavbarShow
    ? "1rem"
    : "4rem";

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query);

  const [SearchBardropdownOpen, setSearchBarDropdownOpen] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const SearchBardropdownRef = useRef(null);
  const ProfileRef = useRef(null);
  const [OpenProfile, setOpenProfile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(" ");

  const capitalizeFirstLetter = (val) =>
    String(val).charAt(0).toUpperCase() + String(val).slice(1);

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

  const router = useRouter();

  const handleAddTask = () => {
    setShowAddTask(true);
    setNavbarShow(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profilePic");
    router.push("/loginPage");
  };

  const handleSmartSearch = (input) => {
    const trimmed = input.trim().toLowerCase();

    if (trimmed.startsWith("task:")) {
      router.push(`/tasks`);
    } else if (trimmed.startsWith("timer")) {
      router.push(`/timer`);
    } else if (trimmed.startsWith("calender")) {
      router.push(`/calender`);
    } else if (trimmed === "profile") {
      router.push("/profile");
    } else if (trimmed === "home") {
      router.push("/");
    } else {
      router.push(`/tasks`);
    }
  };

  return (
    <>
      {showAddTask && (
        <motion.div
          className="fixed inset-10 bg-opacity-10 backdrop-blur-xs flex items-center justify-center z-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <AddTask
            close={() => setShowAddTask(false)}
            setNavbarShow={setNavbarShow}
            NavbarShow={NavbarShow}
          />
        </motion.div>
      )}

      <motion.div
        className={`flex justify-between  gap-10 relative min-w-full items-center transition duration-300 ${
          showAddTask ? "blur-sm pointer-events-none select-none" : ""
        }`}
        animate={{ paddingLeft }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Search form */}
        <form
          className="max-w-lg mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleSmartSearch(search);
          }}
        >
          <div className="flex" ref={SearchBardropdownRef}>
            <button
              type="button"
              onClick={() => setSearchBarDropdownOpen(!SearchBardropdownOpen)}
              className="shrink-0 z-10 inline-flex items-center py-2 px-1 md:py-0 md:px-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            >
              <Image
                className="shrink-0 w-6 md:w-10 h-6 md:h-10 cursor-pointer"
                src="/option.png"
                alt="User dropdown"
                width={20}
                height={20}
              />
            </button>

            {SearchBardropdownOpen && (
              <div className="absolute mt-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {[
                    { label: "Profile", path: "/profile" },
                    { label: "Tasks", path: "/tasks" },
                    { label: "Files", path: "/files" },
                    { label: "Calendar", path: "/calender" },
                  ].map((option) => (
                    <li key={option.label}>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                        onClick={() => {
                          router.push(option.path);
                          setSearchBarDropdownOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full  md:min-w-[30vh] lg:min-w-[50vh] z-20 text-sm text-gray-900 rounded border-s-2 border dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder={`Search ${selectedCategory}...`}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
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

        {/* Add Task and Profile */}
        <div className="relative flex items-center gap-2 md:gap-10 justify-center">
          <motion.button
            onClick={handleAddTask}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer hidden md:block md:text-white md:bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 md:hover:bg-gradient-to-br md:dark:shadow-lg md:font-medium md:rounded-lg md:text-sm md:px-5 md:py-2.5 md:text-center md:me-2 md:mb-2"
          >
            Add Task
          </motion.button>

          <div className="flex items-center gap-4">
            <div ref={ProfileRef}>
              <span
                className="hidden md:flex items-center sm:gap-0  md:gap-5 bg-blue-800 dark:bg-gray-800 border border-blue-500 p-2 text-white rounded-full cursor-pointer"
                onClick={() => setOpenProfile(!OpenProfile)}
              >
                <h2 className="hidden md:block md:text-sm font-bold">
                  {user ? capitalizeFirstLetter(user.username) : ""}
                </h2>
                <Image
                  className="hidden md:block w-6 md:w-10 h-6 md:h-10 rounded-full cursor-pointer"
                  src={profilePic || "/profile.png"}
                  alt="User dropdown"
                  width={40}
                  height={40}
                />
              </span>

              {OpenProfile && (
                <div className="absolute z-10 mt-2 right-0 top-14 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <div
                    className="px-4 py-3 text-sm text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => router.push("/profile")}
                  >
                    <div>
                      {user ? capitalizeFirstLetter(user.username) : ""}
                    </div>
                    <div className="font-medium truncate">
                      {user?.email || ""}
                    </div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <a
                        onClick={() => router.push("/dashboard")}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => router.push("/profile")}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SearchBar;
