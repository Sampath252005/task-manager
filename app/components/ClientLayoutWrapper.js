"use client";

import NavBar from "@/app/components/NavBar";
import SearchBar from "@/app/components/SearchBar";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const ClientLayoutWrapper = ({ children }) => {
  const pathname = usePathname();
  const [NavbarShow, setNavbarShow] = useState(true);
  const hideLayoutFor = ["/loginPage", "/register"];
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  if (!shouldRender) return null;

  const shouldHideLayout = hideLayoutFor.includes(pathname);

  return shouldHideLayout ? (
    <div>{children}</div>
  ) : (
    <div className="flex">
      <NavBar NavbarShow={NavbarShow} setNavbarShow={setNavbarShow} />
      <div
        className={`flex flex-col bg-[#edf2fb] dark:bg-gray-900 md:min-h-screen transition-all duration-300 w-full
          ${NavbarShow ? "ml-15 md:20" : "ml-0"}`}
      >
        {/* Fixed top search bar */}
        <div
          className={`flex justify-between items-center md:p-4 p-2 pt-3 md:pt-2 bg-[#edf2fb] z-30]  
            dark:bg-slate-900 fixed top-0 z-50
            ${NavbarShow ? "left-20" : "left-0"} right-0`}
        >
          <SearchBar NavbarShow={NavbarShow} setNavbarShow={setNavbarShow} />
        </div>

        {/* Content */}
        <div className="mt-14 md:px-4 pl-4 pr-1">{children}</div>
      </div>
    </div>
  );
};

export default ClientLayoutWrapper;
