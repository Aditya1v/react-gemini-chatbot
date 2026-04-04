import { createContext, useContext, useEffect, useState } from "react";
import { fetchChatResponse } from "../services/chatService";
import { buildConversation, generateChatTitle } from "../utils/chatHelpers";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [querry, setQuerry] = useState("");
  const [result, setResult] = useState([]);
  const [chats, setChats] = useState(
    JSON.parse(localStorage.getItem("chats")) || [],
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

    let chatId = currentChatId;
    let updatedChats = [...chats];

    if (!chatId) {
      const newChat = {
        id: Date.now(),
        messages: [],
        title: "New Chat",
      };

      updatedChats = [newChat, ...updatedChats];
      setChats(updatedChats);
      setCurrentChatId(newChat.id);

      chatId = newChat.id;
    }

    const currentChat = updatedChats.find((c) => c.id === chatId);

    setQuerry("");

    const tempMessages = [
      ...(currentChat?.messages || []),
      { type: "q", text: querry },
      { type: "a", text: "Typing", loading: true },
    ];

    setResult(tempMessages);

    try {
      const conversation = currentChat
        ? buildConversation(currentChat.messages.slice(-5))
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
        { type: "a", text: answer ,  loading: false },
      ];
      typeText(answer, (partialText) => {
        setResult((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            type: "a",
            text: partialText,
            loading:false,
          };

          return updated;
        });
      });
      setTimeout(() => {
        setChats(updatedChats);
        localStorage.setItem("chats", JSON.stringify(updatedChats));
      }, answer.length * 15);

      updatedChats = updatedChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: finalMessages,
              title: generateChatTitle(querry, chat.title),
            }
          : chat,
      );

      setChats(updatedChats);
      // setResult(finalMessages);
      localStorage.setItem("chats", JSON.stringify(updatedChats));
    } catch {
      alert("API Token Limit Exceeds!🥲");
    }
  };
  const deleteChat = (id) => {
    const updated = chats.filter((chat) => chat.id !== id);
    setChats(updated);
  };
  const typeText = (text, callback) => {
    let index = 0;

    const interval = setInterval(() => {
      index++;

      callback(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 15);
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
        deleteChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
