"use client";
import Image from "next/image";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import CardList from "./components/CardList";

export default function Home() {
  const [NavbarShow, setNavbarShow] = useState(true);

  return (
    <div className="flex ">
      <NavBar NavbarShow={NavbarShow} setNavbarShow={setNavbarShow} />

      <div
        className={`flex flex-col max-h-15 bg-gray-900 ${
          NavbarShow
            ? "md:ml-20 ml-15 w-[calc(100%-5rem)] md:w-[calc(100%-5rem)]"
            : "w-full"
        }`}
      >
        <div
          className={`flex justify-between items-center p-4 bg-gray-900 fixed top-0 ${
            NavbarShow ? "left-15" : "left-0"
          } right-0 z-10`}
        >
          <SearchBar NavbarShow={NavbarShow} setNavbarShow={setNavbarShow} />
        </div>

        <div className="flex flex-col  justify-start w-full h-full bg-transparent  px-5 mt-23 ">
          <h1
            className=" md:block
              bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
              text-transparent bg-clip-text text-3xl font-bold  "
          >
            Welcome to the Task Manager
          </h1>
          <p
            className="md:block
              bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
              text-transparent bg-clip-text text-sm font-bold mb-3"
          >
            Manage your tasks efficiently!
          </p>
        </div>
        <div className="justify-center items-center w-full h-full px-4 py-5">
          <div className="backlog p-3 mt-5 bg-[#323643] border-l-2 border-red-500">
            <h1 className="text-2xl font-bold text-red-500 p-3">Backlog</h1>
            <CardList />
          </div>
          <div className="Inprogress p-3 mt-5 bg-[#323643] border-l-2 border-yellow-500">
            <h1 className="text-2xl font-bold text-yellow-500 p-3">Inprogrss</h1>
            <CardList />
          </div>
          <div className="completed p-3 mt-5 bg-[#323643] border-l-2 border-green-500">
            <h1 className="text-2xl font-bold text-green-500 p-3">Completed</h1>
            <CardList />
          </div>
        </div>
      </div>
    </div>
  );
}
