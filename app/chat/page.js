// "use client";
// import React, { useState } from "react";
// import ChatUI from "../components/ChatUI";
// import ContactList from "../components/ContactList";
// import Image from "next/image";
// const MessagePage = () => {
//   const [selectedGroup, setSelectedGroup] = useState("general");

//   return (
//     <div className="flex flex-row bg-blue-200 mt-10 rounded-3xl fixed top-10 w-full">
//       <div className="flex flex-col flex-1 gap-10 h-[90vh] p-3">
//         <div className="flex flex-row justify-between items-center">
//           <h1 className="text-3xl text-blue-500 font-extrabold text-center">
//             Messages
//           </h1>
//         </div>
//         <div>
//           <button onClick={() => setSelectedGroup("general")}>
//             General Group
//           </button>
//           <button onClick={() => setSelectedGroup("project-room")}>
//             Project Room
//           </button>
//           {/* Add more group selectors */}
//         </div>
//         <div>
//           <ContactList />
//         </div>
//       </div>
//       <div className="flex flex-2 flex-col items-center bg-slate-600">
//         <div className="flex items-center gap-4 w-full bg-blue-400 p-2">
//           <Image
//             src="/profile.png"
//             alt="Profile Picture"
//             width={50}
//             height={50}
//             className="rounded-full"
//           />
//           <div className="flex flex-col">
//             <h1 className="text-xl font-semibold">Group: {selectedGroup}</h1>
//           </div>
//         </div>
//         <ChatUI room={selectedGroup} />
//       </div>
//     </div>
//   );
// };

// export default MessagePage;
