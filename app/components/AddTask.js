"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useTasks } from "../hooks/useTasks";
import AddTaskgif from "../components/AddTaskgif";

const AddTask = ({ close, selectedDate, setNavbarShow, NavbarShow }) => {
  const { refreshTasks } = useTasks();
  const [showloading, setShowLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      tag: "nothing",
      priority: "low",
      date: selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    reset({
      title: "",
      description: "",
      tag: "nothing",
      priority: "low",
      date: selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    });
  }, [selectedDate, reset]);

  const onSubmit = async (data) => {
    const { title, description, tag, priority } = data;
    const date = (selectedDate || new Date()).toISOString();

    try {
      setShowLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ No token found. User may not be logged in.");
        return;
      }

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, tag, priority, date }),
      });

      if (response.ok) {
        console.log("✅ Task added successfully");
        refreshTasks();
        close();
      } else {
        console.error("❌ Failed to add task");
      }
    } catch (error) {
      console.error("❌ Error adding task:", error);
    } finally {
      setShowLoading(false);
      reset();
    }
  };
  useEffect(() => {
    if (NavbarShow) setNavbarShow(false);
  }, [NavbarShow]);

  return (
    <div className="relative bg-gradient-to-r from-cyan-200 to-blue-400 p-4 sm:p-6 md:p-8 rounded-lg w-[95%] md:w-3/4 lg:w-2/3 xl:w-1/2 text-white max-h-[90vh] overflow-auto z-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-extrabold text-xl sm:text-2xl md:text-3xl text-blue-900">
          Add New Task
        </h2>
        <Image
          src="/close.png"
          alt="Close"
          width={30}
          height={30}
          className="cursor-pointer p-1 hover:bg-blue-400 rounded-full"
          onClick={close}
        />
      </div>

      {/* Form */}
      <form
        className="flex flex-col gap-6 md:flex-row bg-white p-4 sm:p-6 rounded-2xl text-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Left Form */}
        <div className="flex flex-col gap-4 flex-1">
          <div>
            <label className="font-extrabold">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter task title"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="font-extrabold">Description</label>
            <input
              {...register("description", {
                required: "Description is required",
              })}
              type="text"
              placeholder="Enter task description"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-extrabold">Expected Completion Time (minutes)</label>
            <input
              {...register("estimatedTime", {
                required: "Estimated time is required",
              })}
              type="number"
              placeholder="E.g. 60"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {errors.estimatedTime && (
              <p className="text-red-500 text-sm">
                {errors.estimatedTime.message}
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="font-extrabold">Tag</label>
              <input
                {...register("tag", { required: "Tag is required" })}
                type="text"
                placeholder="Enter tag"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
              {errors.tag && (
                <p className="text-red-500 text-sm">{errors.tag.message}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="font-extrabold">Priority</label>
              <select
                {...register("priority", { required: "Priority is required" })}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                defaultValue="low"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && (
                <p className="text-red-500 text-sm">
                  {errors.priority.message}
                </p>
              )}
            </div>
          </div>

          <input type="hidden" {...register("date")} />

          <div className="flex justify-between items-center mt-4 gap-4">
            <button
              type="button"
              onClick={close}
              className="flex-1 text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 rounded-lg text-sm px-4 py-2.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 text-white font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 rounded-lg text-sm px-4 py-2.5"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Right Side Image or Loading */}
        <div className="flex justify-center items-center flex-1 max-h-[250px]">
          {showloading ? (
            <Image
              src="/loading.gif"
              alt="Loading"
              width={300}
              height={300}
              className="rounded-lg object-contain max-w-full max-h-[200px] md:max-h-[250px]"
            />
          ) : (
            <div className="w-full md:w-1xl">
              <AddTaskgif />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTask;
