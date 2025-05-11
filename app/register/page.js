import React from "react";
import Image from "next/image";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center p-4">
        <h1 className="absolute top-30 text-4xl font-extrabold">TaskVault</h1>
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full">
        
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src="/loginPage_image.jpg"
            alt="Register"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 bg-white">
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 mb-6">
            Create Account
          </h1>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-200">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
