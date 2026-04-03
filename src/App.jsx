import React from "react";
import Sidebar from "./components/Sidebar";
import ChatLayout from "./components/ChatLayout";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
<div className="bg-gray-100 text-black dark:bg-zinc-900 dark:text-white h-screen">
      <div className="grid grid-cols-1 md:grid-cols-5 h-full">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <ChatLayout isOpen={isOpen}/>
      </div>
    </div>
  );
}

export default App;