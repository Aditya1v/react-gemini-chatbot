import { useChat } from "../context/ChatContext";
import useTheme from "../hooks/useTheme";
import { Trash2, Menu, X } from "lucide-react";
import { useState } from "react";

function Sidebar({ isOpen, setIsOpen }) {
  const { chats, loadChat, createNewChat, deleteChat } = useChat();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Hamburger Button (Mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className={`md:hidden fixed top-4 left-4 z-50 
        bg-white/30 dark:bg-zinc-800/30 
        backdrop-blur-md 
        border border-white/20 dark:border-white/10
        p-2 rounded-full 
        shadow-lg 
        transition-all duration-300
        hover:scale-105 active:scale-95
        ${isOpen ? "ring-2 ring-blue-400/50" : ""}
        `}
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full z-50 w-[65%] sm:w-[55%] md:w-auto
        bg-white text-black dark:bg-zinc-800 dark:text-white p-2 flex flex-col
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        md:flex col-span-1 h-screen`}
      >
        {/* Close Button (Mobile) */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden mb-3 self-end"
        >
          <X size={20} />
        </button>

        <button
          onClick={() => {
            createNewChat();
            setIsOpen(false);
          }}
          className="w-full mb-3 p-2 bg-blue-500 rounded"
        >
          + New Chat
        </button>

        <ul className="flex-1">
          {chats?.map((chat) => (
            <li
              key={chat.id}
              className="flex justify-between items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              {/* Chat Title */}
              <span
                onClick={() => loadChat(chat.id)}
                className="cursor-pointer truncate flex-1"
              >
                {chat.title}
              </span>

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex justify-between item-center">
          <h1 className="p-2 font-bold">AI-ChatBot</h1>
          <button
            onClick={toggleTheme}
            className="mt-auto px-4 py-2 rounded-full bg-zinc-200 dark:bg-zinc-600 text-black dark:text-white cursor-pointer"
          >
            {theme === "dark" ? "Dark" : "Light"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
