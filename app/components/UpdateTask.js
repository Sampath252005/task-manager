"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useTasks } from "../hooks/useTasks";

const UpdateTask = ({ close,taskId }) => {
  const { tasks, loading, refreshTasks } = useTasks();
   const task = tasks.find((t) => t._id === taskId);

  const [showloading, setShowLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      tag: task?.tag || "nothing",
      priority: task?.priority || "low",
    },
  });

  const onSubmit = async (data) => {
    try {
      setShowLoading(true);
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        
        body: JSON.stringify({
          taskId: task._id, // 🔥 Important: include taskId
          ...data,
        }),
      });
   
      if (response.ok) {
        console.log("Task updated successfully");
        close();
        refreshTasks(); // Refresh tasks
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setShowLoading(false);
      reset();
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col p-5 rounded-lg w-[95%] md:w-3/4 lg:w-2/3 xl:w-1/2 text-white z-50 max-h-[90vh] overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-extrabold text-2xl md:text-3xl pl-2 pb-2 text-blue-900">
          Update Task
        </h2>
        <Image
          src="/close.png"
          alt="Close"
          width={30}
          height={30}
          className="cursor-pointer p-2 hover:bg-blue-400 rounded-3xl"
          onClick={close}
        />
      </div>

      <form
        className="flex flex-col lg:flex-row justify-between bg-white p-4 rounded-3xl text-black gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Left side form */}
        <div className="flex flex-col gap-4 flex-1">
          <div>
            <label className="font-extrabold">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter task title"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="font-extrabold">Tags</label>
              <input
                {...register("tag", { required: "Tag is required" })}
                type="text"
                placeholder="Enter task tag"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
              {errors.tag && (
                <p className="text-red-500 text-sm">{errors.tag.message}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="font-extrabold">Priority</label>
              <input
                {...register("priority", {
                  required: "Priority is required",
                })}
                type="text"
                placeholder="Enter task priority"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
              {errors.priority && (
                <p className="text-red-500 text-sm">
                  {errors.priority.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <button
              type="button"
              onClick={close}
              className="cursor-pointer text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5"
            >
              Update
            </button>
          </div>
        </div>

        {/* Right side image */}
        <div className="flex justify-center items-center flex-1">
          {showloading ? (
            <Image
              src="/loading.gif"
              alt="Loading"
              width={500}
              height={500}
              className="rounded-lg max-h-[250px] object-contain md:max-h-[300px]"
            />
          ) : (
            <Image
              src="/taskimage1.jpg"
              alt="Add Task"
              width={500}
              height={500}
              className="rounded-lg max-h-[250px] object-contain md:max-h-[300px]"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
