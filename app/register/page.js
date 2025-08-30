"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Alert from "../components/Alert";
import { motion } from "framer-motion";

const Register = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertVisible, setAlertVisible] = React.useState(false);

  const showAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  const checkUsername = async (username) => {
    const res = await fetch("/api/check-username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    if (res.status === 409) {
      const data = await res.json();
      showAlert(data.type, data.message);
      return false;
    }

    // parse the success JSON if you need it
    await res.json();
    return true;
  };

  const checkEmail = async (email) => {
    const res = await fetch("/api/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.status === 409) {
      const data = await res.json();
      showAlert(data.type, data.message);
      return false;
    }

    await res.json();
    return true;
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (!isExpired) {
          router.replace("/"); // ✅ Use replace to prevent going back
        } else {
          localStorage.removeItem("token"); // ❌ Remove expired token
        }
      } catch (err) {
        console.error("Invalid token format:", err);
        localStorage.removeItem("token"); // ❌ Remove invalid token
      }
    }
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    const validUsername = await checkUsername(username);
    const validEmail = await checkEmail(email);
    if (!validUsername || !validEmail) return;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        showAlert("success", "Registration successful! Please log in.");

        // ✅ Store token
        localStorage.setItem("token", result.token);

        // ✅ Store user info (you need to include it in the backend response too)
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("userId", result.user._id);

        router.push("/loginPage");
      } else {
        showAlert(
          "error",
          result.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      console.error(err);
      showAlert("error", "An error occurred. Try again later.");
    }
  };

  return (
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-violet-500 to-indigo-700"
      } flex items-center justify-center px-4 py-10 relative`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded shadow-md z-50"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {alertVisible && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
          <Alert type={alertType} message={alertMessage} />
        </div>
      )}

      <h1 className="absolute top-10 text-3xl md:text-4xl font-extrabold text-white drop-shadow-md tracking-wide text-center">
        Personal Task Manager
      </h1>

      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full mt-24"
      >
        {/* Image Section */}
        <div className="relative hidden md:block md:w-1/2 h-96 md:h-auto">
          <Image
            src="/loginPage_image.jpg"
            alt="Register"
            layout="fill"
            objectFit="cover"
            className="object-cover"
            priority
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:text-white mb-6">
            Create Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-semibold">Username</label>
              <input
                {...register("username", { required: "Username is required" })}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
                type="email"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold">Password</label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
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
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold">Confirm Password</label>
              <div className="relative">
                <input
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (val) => val === watch("password") || "Passwords do not match",
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full text-white bg-gradient-to-br from-purple-400 to-blue-500 hover:from-purple-500 hover:to-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5"
            >
              Register
            </button>
            <p className="text-sm text-center text-gray-600 dark:text-gray-300">
              Already have an account?{' '}
              <a
                href="/loginPage"
                className="font-semibold text-blue-500 hover:text-blue-700"
              >
                Log in
              </a>
            </p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
