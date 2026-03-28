import { Trash2 } from "lucide-react";
function Sidebar({ chats, loadChat, createNewChat }) {
  return (
    <div className="col-span-1 bg-zinc-800 text-white p-2">
      
      <button
        onClick={createNewChat}
        className="w-full mb-3 p-2 bg-blue-500 rounded"
      >
        + New Chat
      </button>

      <ul>
        {chats.map(chat => (
          <li
            key={chat.id}
            onClick={() => loadChat(chat.id)}
            className="p-2 cursor-pointer hover:bg-zinc-700 rounded truncate"
          >
            {chat.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;