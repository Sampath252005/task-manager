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
        className={`flex bg-gray-800 p-2 ${
          NavbarShow ? "ml-20 w-[calc(100%-5rem)]" : "w-full"
        }`}
      >
        <SearchBar NavbarShow={NavbarShow} setNavbarShow={setNavbarShow} />
      </div>
    </div>
  );
}
