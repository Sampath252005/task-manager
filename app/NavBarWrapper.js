"use client";

import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";

export default function NavBarWrapper({ children }) {
  const [showNavBar, setShowNavBar] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex transition-all duration-300 ease-in-out">
      <NavBar showNavBar={showNavBar} setShowNavBar={setShowNavBar} />
      <main
        className={`transition-all duration-300 ease-in-out w-full ${
          showNavBar ? "ml-20" : "ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
