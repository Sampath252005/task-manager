import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
const addTask = ({ showAddTask, setShowAddTask }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      tag: "nothing",
      priority: "low",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    const { title, description, tag, priority } = data;
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description, tag, priority }),
      });
      if (response.ok) {
        console.log("Task added successfully");
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      console.log("Task submission completed");
      reset(); // Reset the form after submission
    }
  };
  return (
    <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 flex p-5 flex-col rounded-lg w-[90%] md:w-3/4 lg:w-2/3 xl:w-1/2 text-white z-50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-extrabold text-3xl pl-2 pb-2 text-blue-900">
          Add New Task
        </h2>
        <Image
          src="/close.png"
          alt="close"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => setShowAddTask(false)}
        />
      </div>
      <form
        className="space-y-4 flex justify-between bg-white p-2 rounded-3xl text-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4 p-2  text-blue-900">
          <div>
            <label className="font-extrabold">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter task title"
              className="w-full mt-1 p-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
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
              placeholder="Enter task descrption"
              className="w-full mt-1 p-2 border border-gray rounded-md text-black"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <div>
              <label className="font-extrabold">Tags</label>
              <input
                {...register("tag", { required: "tag is required" })}
                type="text"
                placeholder="Enter task title"
                className="w-full mt-1 p-2 border  border-grey rounded-md  text-black"
              />
              {errors.tag && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label className="font-extrabold">Priority</label>
              <input
                {...register("priority", { required: "priority is required" })}
                type="text"
                placeholder="Enter task priority"
                className="w-full mt-1 p-2 border  border-grey rounded-md  text-black"
              />
              {errors.priority && (
                <p className="text-red-500 text-sm">
                  {errors.priority.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button className="text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >
              Cancel
            </button>
            <button className="text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Add task
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center p-5">
          <Image
            src="/taskimage1.jpg"
            alt="Add Task"
            width={600}
            height={600}
            className=" rounded-lg"
          />
        </div>
      </form>
    </div>
  );
};

export default addTask;
