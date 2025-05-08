// src/components/ChatWidget.jsx
"use client";

import { useState } from "react";
import Chat from "./Chat";
import { MessageSquare } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden z-50">
          <div className="bg-indigo-600 text-white px-4 py-2 flex justify-between items-center">
            <span className="font-medium">Chat med AI</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl leading-none"
              aria-label="Luk chat"
            >
              &times;
            </button>
          </div>
          <div className="flex-1">
            <Chat />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition z-50"
          aria-label="Åbn chat"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </>
  );
}
