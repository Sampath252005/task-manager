"use client";

import { useEffect, useState } from "react";
import socket from "../../lib/socket";
import React from "react";

const ChatPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.username;

  const [roomName, setRoomName] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const joinRoom = () => {
    if (roomName && userName) {
      socket.emit("joinRoom", { roomName, userName });
      setJoined(true);
    }
  };

  useEffect(() => {
    if (!joined) return;

    socket.on("receive_message", ({ message, userName: sender, time }) => {
      setMessages((prev) => [...prev, { message, userName: sender, time }]);
    });

    socket.on("userJoined", (info) => {
      setMessages((prev) => [...prev, { message: info, system: true }]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("userJoined");
    };
  }, [joined]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", { roomName, message, userName });
      setMessage("");
    }
  };

  return (
    <div className="p-4 mt-20">
      {!joined ? (
        <div className="space-y-4">
          <input
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={joinRoom}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Join Room
          </button>
        </div>
      ) : (
        <div>
          <h2 className="font-bold mb-2">Room: {roomName}</h2>
          <div className="border h-80 overflow-y-auto p-2 mb-2 space-y-2 bg-gray-100 rounded">
            {messages.map((msg, i) => {
              if (msg.system) {
                return (
                  <div
                    key={i}
                    className="text-center text-gray-500 text-sm italic"
                  >
                    {msg.message}
                  </div>
                );
              }

              const isMe = msg.userName === userName;
              return (
                <div
                  key={i}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      isMe
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-white text-black border rounded-bl-none"
                    }`}
                  >
                    <div className="text-xs font-semibold">{msg.userName}</div>
                    <div>{msg.message}</div>
                    <div className="text-[10px] text-gray-300 text-right">
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message"
              className="border p-2 flex-grow rounded"
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 text-white px-4 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
