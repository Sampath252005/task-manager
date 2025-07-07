"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/loginPage");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-tr from-gray-900 via-slate-800 to-slate-900 min-h-screen w-full p-6 text-white">
      {/* Left Panel */}
      <div className="flex-1 bg-[#111827] rounded-2xl p-8 shadow-lg">
        {/* Profile Picture & Name */}
        <div className="flex items-center gap-6 mb-8">
          <div>
            <Image
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
              src="/profile.png"
              alt="Profile"
              width={128}
              height={128}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 bg-slate-700 px-3 py-1 rounded-full w-fit mb-2">
              Owner
            </span>
            <h2 className="text-2xl font-semibold">
              {capitalizeFirstLetter(user?.username)}
            </h2>
          </div>
        </div>

        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {/* Name Field */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-400 ">Name</label>
            <div className="bg-[#1f2937] p-3 rounded-3xl border border-gray-600 cursor-not-allowed">
              {capitalizeFirstLetter(user?.username)}
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-400">Email</label>
            <div className="relative bg-[#1f2937] p-3 rounded-3xl border border-gray-600 cursor-not-allowed hover:border-red-500 hover:border">
              {user?.email}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔒
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <button className="flex items-center justify-center gap-2 bg-[#1f2937] rounded-2xl px-5 py-4 border border-gray-600 hover:bg-gray-800 transition cursor-pointer ">
            🔒 Change password
          </button>
          <button
            className="flex items-center justify-center gap-2 bg-[#1f2937] rounded-2xl px-5 py-4 border border-gray-600 hover:bg-gray-800 transition cursor-pointer"
            onClick={handleSignOut}
          >
            👤 log out
          </button>
        </div>

        {/* Delete account */}
        <div className="mt-8 border border-gray-600 rounded-2xl p-4 text-sm text-gray-400">
          <p className="mb-1 font-semibold text-white">Delete account</p>
          Contact our{" "}
          <span className="text-blue-400 underline cursor-pointer">
            support team
          </span>{" "}
          to process the deletion of your account.
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-8">
        {/* Add streaks, day progress, graphs etc. here */}
        <div className="h-full border border-gray-700 rounded-2xl p-6 text-center">
          <p className="text-lg text-gray-400">
            Coming Soon: Streaks & Progress
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
