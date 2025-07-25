"use client";

import NavBar from "@/app/components/NavBar";
import SearchBar from "@/app/components/SearchBar";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const ClientLayoutWrapper = ({ children }) => {
  const pathname = usePathname();
  const [NavbarShow, setNavbarShow] = useState(true);
  const hideLayoutFor = ["/loginPage", "/register"];
  const [shouldRender, setShouldRender] = useState(false); // ensure client mount

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
  className={`flex flex-col bg-gray-900 md:min-h-screen transition-all duration-300
    ${NavbarShow ? "ml-15 md:ml-20 w-full" : "ml-0 w-full"}
  `}
>
        <div
          className={`flex justify-between items-center md:p-4 p-2 pt-5 md:pt-2 bg-gray-900 fixed top-0 w-full md:w-auto ${
            NavbarShow ? "left-17 md:left-15" : "left-0"
          } md:right-0  z-10`}
        >
          <SearchBar
            NavbarShow={NavbarShow}
            setNavbarShow={setNavbarShow}
          />
        </div>
        <div className="mt-10 md:px-4 pl-4 pr-1">{children}</div>
      </div>
    </div>
  );
};

export default ClientLayoutWrapper;
