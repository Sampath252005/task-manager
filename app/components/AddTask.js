import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
const addTask = () => {
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
  return (
    <div className="bg-[#0C74E8] absolute flex p-5  flex-col  rounded-lg w-3xl text-white top-[50%] left-[50%] ">
      <h2 className="font-extrabold text-2xl pl-2 pb-2 ">Add New Task</h2>
      <form className="space-y-4 flex justify-between bg-[#00BDFF] p-2 rounded-3xl text-black">
        <div className="flex flex-col gap-4 p-2">
          <div>
            <label>Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter task title"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label>Description</label>
            <input
              {...register("description", {
                required: "Description is required",
              })}
              type="text"
              placeholder="Enter task descrption"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label>Title</label>
            <input
              {...register("tag", { regis: "Title is required" })}
              type="text"
              placeholder="Enter task title"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center p-5">
          <Image
            src="/taskimage1.jpg"
            alt="Add Task"
            width={400}
            height={600}
            className=" rounded-lg"
          />
        </div>
      </form>
    </div>
  );
};

export default addTask;
