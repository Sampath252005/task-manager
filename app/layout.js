// app/layout.js
"use client";
import "./globals.css";
import NavBar from "@/app/components/NavBar";
import SearchBar from "@/app/components/SearchBar";
import { useState } from "react";



export default function RootLayout({ children }) {
  const [NavbarShow, setNavbarShow] = useState(true);

  return (
    <html lang="en">
      <body>
        <div className="flex">
          <NavBar NavbarShow={NavbarShow} setNavbarShow={setNavbarShow} />

          <div
            className={`flex flex-col bg-gray-900 min-h-screen ${
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
              <SearchBar
                NavbarShow={NavbarShow}
                setNavbarShow={setNavbarShow}
              />
            </div>

            {/* Offset top margin to account for fixed header */}
            <div className="mt-24 px-5">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
