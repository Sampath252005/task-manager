"use client";
import React from "react";
import Image from "next/image";

const ContactCard = ({ contact }) => {
  return (
    <div className="flex justify-between items-center gap-4 p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition-colors duration-200">
      <div className="flex items-center gap-4">
        <Image
          src={contact.image}
          alt="Profile Picture"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{contact.name}</h1>
          <p className="text-gray-500 text-sm">{contact.status}</p>
        </div>
      </div>
      <span className="text-gray-400 text-sm">{contact.time}</span>
    </div>
  );
};

export default ContactCard;
