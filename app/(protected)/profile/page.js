"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UploadForm from "@/app/components/UploadForm";

const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profilePic");
    localStorage.removeItem("userid");
    router.push("/loginPage");
  };

 useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user-profile?userId=${userId}`);
        if (!res.ok) {
          console.error("Failed to fetch user");
          return;
        }

        const data = await res.json();
        //console.log("data :",data);
        setUser(data);


        const localPhoto = localStorage.getItem("profilePic");
        setProfilePic( localPhoto || "/profile.png");
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (userId) fetchUser();
  }, []);
  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="flex flex-col md:flex-row darK:bg-gradient-to-tr darK:from-gray-900 dark:via-slate-800 dark:to-slate-900  h-screen w-screen md:w-full  lg:p-10 text-white mt-5 "
  >
    {/* Left Panel */}
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex-1 dark:bg-[#111827] bg-[#bfdbf7] rounded-2xl p-8 shadow-lg"
    >
      {/* Profile Picture & Name */}
      <div className="flex items-center gap-6 mb-8">
        <div className="p-6">
          <UploadForm
            userId={user?._id}
            onUpload={(url) => setProfilePic(url)}
            currentPhoto={profilePic}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-black dark:text-gray-400 dark:bg-slate-700 bg-white px-3 py-1 rounded-full w-fit mb-2">
            Owner
          </span>
          <h2 className="text-sm md:text-2xl font-semibold">
            {capitalizeFirstLetter(user?.username)}
          </h2>
        </div>
      </div>

      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <div className="flex flex-col">
          <label className="mb-2 text-sm text-black dark:text-gray-400">Name</label>
          <div className="bg-white dark:bg-[#1f2937] p-3 rounded-3xl border border-gray-600 cursor-not-allowed">
            {capitalizeFirstLetter(user?.username)}
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-sm text-black dark:text-gray-400">Email</label>
          <div className="bg-white dark:bg-[#1f2937] p-3 rounded-3xl border border-gray-600 cursor-not-allowed hover:border-red-500 hover:border">
            {user?.email}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 dark:bg-[#1f2937] bg-white rounded-2xl px-5 py-4 border dark:text-white text-black  dark:border-gray-600 dark:hover:bg-gray-800 transition cursor-pointer"
        >
          🔒 Change password
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignOut}
          className="flex items-center justify-center gap-2 bg-white dark:bg-[#1f2937] rounded-2xl px-5 py-4 border dark:border-gray-600 dark:hover:bg-gray-800 transition dark:text-white text-black cursor-pointer"
        >
          👤 Log out
        </motion.button>
      </div>

      {/* Delete account */}
      <div className="mt-8 border border-gray-600 rounded-2xl p-4 text-sm text-gray-400">
        <p className="mb-1 font-semibold dark:text-white text-red-500">Delete account</p>
        Contact our{" "}
        <span className="text-blue-400 underline cursor-pointer">
          support team
        </span>{" "}
        to process the deletion of your account.
      </div>
    </motion.div>

    {/* Right Panel */}
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex-1 p-8"
    >
      <div className="h-full border border-gray-700 rounded-2xl p-6 text-center">
        <p className="text-lg text-gray-400">Coming Soon: Streaks & Progress</p>
      </div>
    </motion.div>
  </motion.div>
);
};

export default ProfilePage;
