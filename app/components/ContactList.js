"use client";
import React from 'react';
import ContactCard from './contactCard';

const dummyContacts = [
  {
    id: 1,
    name: "John Doe",
    image: "/profile.png",
    status: "typing...",
    time: "08:30 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "/profile.png",
    status: "online",
    time: "09:10 AM",
  },
  {
    id: 3,
    name: "Alice Johnson",
    image: "/profile.png",
    status: "last seen 10 mins ago",
    time: "10:45 AM",
  },
];

const ContactList = () => {
  return (
    <div className="space-y-4">
      {dummyContacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default ContactList;
