import Image from "next/image";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <div className="flex  min-h-screen min-w-screen space-x-3.5">
   <NavBar />
   <div className=" flex  bg-gray-800 min-w-[96%]   p-4">
   <SearchBar/>
   </div>
    </div>
  
  );
}
