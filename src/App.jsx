import { useEffect, useState, useRef } from "react";
import { SmilePlus, Sparkles, Send } from "lucide-react";
import { URL } from "./constants/constants";

import Sidebar from "./components/Sidebar";
import QuerryAnswer from "./components/QuerryAnswer";

function App() {
  /* ================= STATE ================= */

  const [querry, setQuerry] = useState("");
  const [result, setResult] = useState([]);
  const [loader, setLoader] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [chats, setChats] = useState(
    JSON.parse(localStorage.getItem("chats")) || [],
  );
  const [currentChatId, setCurrentChatId] = useState(null);

  const scrollToAns = useRef();

  const [darkmode, setDarkmode] = useState("dark");

  /* ================= DARK MODE ================= */

  useEffect(() => {
    if (darkmode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkmode]);

  /* ================= AUTO LOAD CHAT ================= */

  useEffect(() => {
    if (chats.length > 0 && !currentChatId) {
      setCurrentChatId(chats[0].id);
      setResult(chats[0].messages);
    }
  }, [chats]);

  /* ================= CREATE CHAT ================= */

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      messages: [],
      title: "New Chat",
    };

    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    setCurrentChatId(newChat.id);
    setResult([]);

    localStorage.setItem("chats", JSON.stringify(updatedChats));
  };

  /* ================= LOAD CHAT ================= */

  const loadChat = (id) => {
    const chat = chats.find((c) => c.id === id);
    setCurrentChatId(id);
    setResult(chat.messages);
  };

  /* ================= API CALL ================= */

  const askQuerry = async () => {
    if (!querry) return;

    const currentChat = chats.find((c) => c.id === currentChatId);

    //STEP 1: show user message immediately
    const tempMessages = [
      ...(currentChat?.messages || []),
      { type: "q", text: querry },
      { type: "loading" }, // 👈 temporary loader message
    ];

    setResult(tempMessages);

    setLoader(true);

    try {
      const conversation = currentChat
        ? currentChat.messages.map((msg) => ({
            role: msg.type === "q" ? "user" : "model",
            parts: [{ text: msg.text }],
          }))
        : [];

      const payload = {
        contents: [
          ...conversation,
          { role: "user", parts: [{ text: querry }] },
        ],
      };

      let response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      response = await response.json();

      const answer = response.candidates[0].content.parts[0].text;

      //STEP 2: replace loader with real answer
      const finalMessages = [
        ...(currentChat?.messages || []),
        { type: "q", text: querry },
        { type: "a", text: answer },
      ];

      let chatTitle = currentChat?.title;
      if (!chatTitle || chatTitle === "New Chat") {
        chatTitle = querry.slice(0, 30);
      }

      const updatedChats = chats.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: finalMessages, title: chatTitle }
          : chat,
      );

      setChats(updatedChats);
      setResult(finalMessages);

      localStorage.setItem("chats", JSON.stringify(updatedChats));
      setQuerry("");
    } catch (err) {
      console.error(err);

      //STEP 3: TOKEN ERROR POPUP
      alert("⚠️ API tokens finished. Please wait or replace API key.");
    }

    setLoader(false);
  };

  /* ================= UI ================= */

  return (
    <div className={darkmode === "dark" ? "dark" : "light"}>
      <div className="grid grid-cols-5 h-screen">
        {/* Sidebar */}
        <Sidebar
          chats={chats}
          loadChat={loadChat}
          createNewChat={createNewChat}
        />

        {/* Main */}
        <div className="col-span-4 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <h1 className="text-4xl text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-800">
            Hello, User Ask me Anything
          </h1>

          {/* Loader */}

          {/* Chat Area */}
          <div ref={scrollToAns} className="flex-1 overflow-y-auto px-10 py-6">
            <ul className="space-y-4 max-w-3xl mx-auto">
              {result.map((item, index) => (
                <QuerryAnswer key={index} item={item} index={index} />
              ))}
              {loader && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 text-zinc-200 px-4 py-2 rounded-2xl flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}
            </ul>
          </div>

          {/* Search Bar  */}
          <div className="pb-6">
            <div
              className={`flex items-center dark:bg-zinc-800 bg-red-100 w-1/2 m-auto rounded-full border p-1 transition-all duration-300
              ${
                isFocused
                  ? "border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  : "border-gray-500"
              }`}
            >
              <button className="ml-3 relative w-6 h-6 flex items-center justify-center">
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
                className="w-full p-3 rounded-full outline-none bg-transparent placeholder:text-zinc-400 focus:placeholder:text-zinc-600 dark:placeholder:text-zinc-500 dark:focus:placeholder:text-zinc-300 text-white"
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
                      ? "text-blue-400 scale-110 animate-send "
                      : "text-blue-200"
                  } hover:scale-110`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <select
          onChange={(e) => setDarkmode(e.target.value)}
          className="fixed bottom-2 left-2 p-2 text-white outline-none"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>
    </div>
  );
}

export default App;
