"use client";
import Image from "next/image";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

export default function Home() {
  const [NavbarShow, setNavbarShow] = useState(true);

  return (
    <div className="flex  min-w-screen">
      <NavBar NavbarShow={NavbarShow} setNavbarShow={setNavbarShow} />

      <div
        className={`flex flex-col gap-10 bg-gray-800 p-2 ${
          NavbarShow ? "md:ml-20 ml-15 w-[calc(100%-2rem)] md:w-[calc(100%-5rem)]" : "w-full"
        }`}
      >
        <SearchBar NavbarShow={NavbarShow} setNavbarShow={setNavbarShow} />
        <div className="flex flex-col  justify-start w-full h-full">
          <div>
          <h1 className="text-white text-2xl font-bold">Welcome to the Task Manager</h1>
          <p className="text-gray-400 mt-2">Manage your tasks efficiently!</p>
          </div>
          <div>
            <div className="backlog">

            </div>
            <div className="Inprogress">

            </div>
            <div className="completed">
              
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}
