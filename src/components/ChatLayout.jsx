import { useChat } from "../context/ChatContext";
import { SmilePlus, Sparkles, Send } from "lucide-react";
import QuerryAnswer from "./QuerryAnswer";
import { useState } from "react";
import { useEffect, useRef } from "react";

const ChatLayout = ({ isOpen }) => {
  const { result, querry, setQuerry, askQuerry } = useChat();

  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const showWelcome = result.length === 0;

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result]);

  return (
    <div className="col-span-4 flex flex-col h-screen  relative">
      {/* Header */}
      <div
        className={`absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2
        pointer-events-none transition-all duration-500
        ${showWelcome ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      >
        <h1
          className={`text-center font-semibold bg-clip-text text-transparent 
          bg-gradient-to-r from-blue-400 to-violet-800
          text-3xl sm:text-4xl md:text-6xl leading-tight transition-all duration-500
          
          ${isFocused ? "scale-105 drop-shadow-[0_0_25px_rgba(59,130,246,0.7)]" : ""}
          `}
        >
          Hello, User <br /> Ask me Anything
        </h1>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto min-h-0 px-3 md:px-10 pb-28 py-6">
        <ul className="space-y-4 w-full max-w-xl mx-auto">
          {result.map((item, index) => (
            <QuerryAnswer key={index} item={item} />
          ))}
          <div ref={bottomRef} />
        </ul>
      </div>

      {/* Search Bar */}
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-full px-3 z-50 
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-y-24 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}
        `}
      >
        <div
          className={`flex items-center w-full max-w-xl mx-auto rounded-full border p-1 transition-all duration-300
          ${
            isFocused
              ? "border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] bg-zinc-300 dark:bg-zinc-700"
              : "border-gray-500 bg-zinc-200/70 dark:bg-zinc-800/70 backdrop-blur-md"
          }`}
        >
          <button className="ml-3 relative w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
            <SmilePlus
              className={`absolute transition-all duration-500
              ${
                isFocused || isTyping
                  ? "opacity-0 scale-50"
                  : "opacity-100 scale-100"
              } text-gray-400`}
            />

            <Sparkles
              className={`absolute transition-all duration-500
              ${
                isFocused || isTyping
                  ? "opacity-100 scale-100 animate-spin-slow"
                  : "opacity-0 scale-50"
              } text-yellow-400`}
            />
          </button>

          <input
            type="text"
            placeholder="Ask me anything!"
            className="w-full p-3 rounded-full outline-none bg-transparent placeholder:text-zinc-400 text-black dark:text-white"
            value={querry}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              setIsTyping(false);
            }}
            onChange={(e) => {
              setQuerry(e.target.value);
              setIsTyping(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                askQuerry();
              }
            }}
          />

          <button
            onClick={askQuerry}
            className="mr-4 relative w-6 h-6 flex items-center justify-center"
          >
            <Send
              className={`transition-all duration-300
              ${
                isFocused || isTyping
                  ? "text-blue-400 scale-110 animate-send"
                  : "text-blue-200"
              } hover:scale-110`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
