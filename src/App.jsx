import { useState } from "react";
import "./App.css";
import { SmilePlus, Sparkles, Send, Trash2, Menu } from "lucide-react";
import { URL } from "./constants";
import Answers from "./components/Answers";
import ReactMarkdown from "react-markdown";

function App() {
  const [querry, setQuerry] = useState("");
  const [result, setResult] = useState(undefined);

  //Logic for API
  const payload = {
    contents: [
      {
        parts: [{ text: querry }],
        // "Format your response in clean markdown. Use code blocks with language."
      },
    ],
  };
  const askQuerry = async () => {
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    response = await response.json();

    let dataString = response.candidates?.[0]?.content?.parts?.[0]?.text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());

    console.log(dataString);
    setResult(dataString);
  };

  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center border border-gray-500">
        {/* Search History */}
        <div className="col-span-1 bg-zinc-800 text-white flex justify-center gap-2 pt-3 border border-gray-500">
          Recent Search
          <Trash2 />
        </div>

        {/* Top Message */}
        <div
          className="col-span-4"
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
        >
          <div className="container h-160 overflow-scroll">
            <div className="text-white">
              <ul>
                {/* {result} */}
                <ul>
                  {result &&
                    result.map((item, index) => (
                      <li className="p-1 text-left ml-2">
                        <Answers ans={item} key={index} />
                      </li>
                    ))}
                </ul>
              </ul>
            </div>
            {/* <div className="pt-18">
              <h1
                className={`text-4xl md:text-5xl font-semibold transition-all duration-500 ease-out ${
                  isActive
                    ? "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-105"
                    : "text-gray-400 scale-100"
                }`}
              >
                How can I help you today?
              </h1>
            </div> */}
          </div>

          {/* SearchBar Start*/}
          <div
            className={`flex items-center bg-zinc-800 w-1/2 text-white m-auto rounded-full border p-1 transition-all duration-300
              ${isFocused ? "border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "border-gray-500"}`}
          >
            <button className="ml-3 relative w-6 h-6 flex items-center justify-center">
              {/* Smile */}
              <SmilePlus
                className={`absolute transition-all duration-500
                ${isFocused || isTyping ? "opacity-0 scale-50" : "opacity-100 scale-100"} 
                text-gray-400`}
              />
              {/* Sparkle */}
              <Sparkles
                className={`absolute transition-all duration-500
                  ${isFocused || isTyping ? "opacity-100 scale-100 animate-spin-slow" : "opacity-0 scale-50"} 
                  text-yellow-400`}
              />
            </button>
            <input
              type="text"
              placeholder="Ask me anything!"
              className="w-full h-full p-3 rounded-full outline-none transition-transform duration-300 focus:scale-[1.02]"
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                setIsTyping(false);
              }}
              value={querry}
              onChange={(e) => setQuerry(e.target.value)}
            />
            <button
              className="mr-4 relative w-6 h-6 flex items-center justify-center"
              onClick={askQuerry}
            >
              <Send
                className={`absolute transition-all duration-300
                  ${isFocused || isTyping ? "text-blue-400 scale-110 animate-send" : "text-blue-200 scale-100"} 
                  cursor-pointer hover:scale-110 hover:text-blue-300 transition-all duration-200`}
              />
            </button>
          </div>
          {/* SearchBar End */}
        </div>
      </div>
    </>
  );
}

export default App;
