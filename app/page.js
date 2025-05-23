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
        className={`flex flex-col max-h-15 bg-gray-800 ${
          NavbarShow ? "md:ml-20 ml-15 w-[calc(100%-5rem)] md:w-[calc(100%-5rem)]" : "w-full"
        }`}
      >  
      <div className="flex justify-between items-center p-4 bg-gray-900">
        <SearchBar NavbarShow={NavbarShow} setNavbarShow={setNavbarShow} />
        </div>
        <div className="flex flex-col  justify-start w-full h-full bg-black p-2">
          
          <h1 className="text-white text-2xl font-bold">Welcome to the Task Manager</h1>
          <p className="text-gray-400 ">Manage your tasks efficiently!</p>
          </div>
          <div>
            <div className="backlog">
           <h1>Backlog</h1>
              <CardList/>
            </div>
            <div className="Inprogress">
               <h1>Inprogrss</h1>
              <CardList/>
            </div>
            <div className="completed">
              <h1>Completed</h1>
              <CardList/>
            </div>
          </div>
          </div>
      </div>
   
  );
}
