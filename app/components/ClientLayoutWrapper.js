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

  if (!shouldRender) return null; // Wait for mount to get pathname

  const shouldHideLayout = hideLayoutFor.includes(pathname);

  return shouldHideLayout ? (
    <div>{children}</div>
  ) : (
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
        <div className="mt-24 px-5">{children}</div>
      </div>
    </div>
  );
};

export default ClientLayoutWrapper;
