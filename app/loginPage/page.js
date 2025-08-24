// app/login/page.js or wherever this file is
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // ❌ Token missing, redirect to login
      router.replace("/loginPage");
    } else {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        if (!isExpired) {
          router.push("/");
        }
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, [router]);
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("result:", result);
        localStorage.setItem("token", result.token);
        localStorage.setItem("profilePic", result.profilePic);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: result.username,
            email: result.email,
          })
        );

        router.push("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Head>
        {/* Import Poppins Font from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div
        className="min-h-screen bg-gradient-to-br from-violet-500 to-indigo-700 
                   flex items-center justify-center p-4 font-[Poppins]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <h1 className="absolute top-20 md:top-40 text-4xl font-extrabold text-white drop-shadow-md tracking-wide">
          TaskVault
        </h1>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full">
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 h-64 md:h-auto">
            <Image
              src="/loginPage_image2.jpg"
              alt="Login Visual"
              layout="fill"
              objectFit="cover"
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 bg-white">
            <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 mb-6">
              Login to Your Account
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 ">
                  Username
                </label>
                <input
                  {...register("username", { required: true })}
                  type="text"
                  placeholder="Enter username"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                />
                {errors.username && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div> */}

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Enter email"
                  className="text-black w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="text-black w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button className="w-full text-white bg-gradient-to-br from-purple-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-bold cursor-pointer">
                Login
              </button>
              <p className="text-sm text-center text-gray-500">
                Don&apos;t have an account?{" "}
                <a
                  href="/register"
                  className="font-semibold text-blue-500 hover:text-blue-700"
                >
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
