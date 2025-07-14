"use client";

import Addtask from "./components/AddTask";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // ❌ No token, redirect to login
      router.replace("/loginPage");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      if (isExpired) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.replace("/loginPage");
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      router.replace("/loginPage");
    }
  }, []);

  
  return (
      <div className="mt-25 md:mt-20 w-full ">
      <h1 className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                     text-transparent bg-clip-text text-3xl font-bold">
        Welcome to the Task Manager
      </h1>
      <p className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                    text-transparent bg-clip-text text-sm font-bold mb-3">
        Manage your tasks efficiently!
      </p>

    </div>
  );
}
