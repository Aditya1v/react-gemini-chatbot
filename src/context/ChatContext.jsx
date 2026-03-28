import { createContext, useContext, useState, useEffect } from "react";
import { fetchChatResponse } from "../services/chatService";
import { buildConversation, generateChatTitle } from "../utils/chatHelpers";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [querry, setQuerry] = useState("");
  const [result, setResult] = useState([]);
  const [chats, setChats] = useState(
    JSON.parse(localStorage.getItem("chats")) || []
  );
  const [currentChatId, setCurrentChatId] = useState(null);

  useEffect(() => {
    if (chats.length > 0 && !currentChatId) {
      setCurrentChatId(chats[0].id);
      setResult(chats[0].messages);
    }
  }, [chats]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      messages: [],
      title: "New Chat",
    };

    const updated = [newChat, ...chats];
    setChats(updated);
    setCurrentChatId(newChat.id);
    setResult([]);
    localStorage.setItem("chats", JSON.stringify(updated));
  };

  const loadChat = (id) => {
    const chat = chats.find((c) => c.id === id);
    setCurrentChatId(id);
    setResult(chat.messages);
  };

  const askQuerry = async () => {
    if (!querry) return;

    const currentChat = chats.find((c) => c.id === currentChatId);

    const tempMessages = [
      ...(currentChat?.messages || []),
      { type: "q", text: querry },
      { type: "loading" },
    ];

    setResult(tempMessages);

    try {
      const conversation = currentChat
        ? buildConversation(currentChat.messages)
        : [];

      const payload = {
        contents: [
          ...conversation,
          { role: "user", parts: [{ text: querry }] },
        ],
      };

      const answer = await fetchChatResponse(payload);

      const finalMessages = [
        ...(currentChat?.messages || []),
        { type: "q", text: querry },
        { type: "a", text: answer },
      ];

      const updatedChats = chats.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: finalMessages,
              title: generateChatTitle(querry, chat.title),
            }
          : chat
      );

      setChats(updatedChats);
      setResult(finalMessages);
      localStorage.setItem("chats", JSON.stringify(updatedChats));
      setQuerry("");
    } catch {
      alert("API error");
    }
  };

  return (
    <ChatContext.Provider
      value={{
        querry,
        setQuerry,
        result,
        chats,
        askQuerry,
        loadChat,
        createNewChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);