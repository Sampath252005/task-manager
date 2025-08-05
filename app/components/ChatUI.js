"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const ChatUI = ({ room }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const username =
    typeof window !== "undefined" && localStorage.getItem("user.username");
  useEffect(() => {
    if (username) {
      socket.emit("register", username);
    }
    if (room) {
      socket.emit("joinRoom", room);
    }
    socket.on("chatMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("chatMessage");
    };
  }, [room]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("sendMessage", { room, message });
      setMessage("");
    }
  };

  <div className="p-4 w-full h-full flex flex-col justify-between">
    <div className="flex-1 overflow-y-auto mb-4">
      {chat.map((msg, index) => (
        <div key={index} className="my-1">
          <strong>{msg.user}:</strong> {msg.text}
        </div>
      ))}
    </div>
    <form onSubmit={sendMessage} className="flex">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 border rounded-l"
        placeholder="Type your message"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
        Send
      </button>
    </form>
  </div>;
};

export default ChatUI;
