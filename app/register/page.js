"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Alert from "../components/Alert";

const Register = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center p-4 relative">
      {alertVisible && (
        <div className="absolute top-5 md:top-25 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
          <Alert type={alertType} message={alertMessage} />
        </div>
      )}

      <h1 className="absolute top-12 text-4xl font-extrabold text-white drop-shadow-md tracking-wide ">
        TaskVault
      </h1>

      <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full ">
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-[1000px] md:h-auto">
          <Image
            src="/loginPage_image.jpg"
            alt="Register"
            layout="fill"
            objectFit="cover"
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 bg-white">
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 mb-6">
            Create Account
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Username
              </label>
              <input
                {...register("username", { required: "Username is required" })}
                type="text"
                placeholder="Enter username"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Enter email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
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
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (val) =>
                      val === watch("password") || "Passwords do not match",
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                />
                <span
                  onClick={toggleConfirmPasswordVisibility}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-gradient-to-br from-purple-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Register
            </button>
            <p className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <a
                href="/loginPage"
                className="font-semibold text-blue-500 hover:text-blue-700"
              >
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
