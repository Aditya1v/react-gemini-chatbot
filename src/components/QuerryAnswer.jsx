import Answers from "./Answers";

const QuerryAnswer = ({ item }) => {
  // Loader
  // if (item.type === "loading") {
  //   return (
  //     <div className="flex justify-start animate-slideUp">
  //       <div className="bg-zinc-800 px-4 py-2 rounded-2xl flex gap-1">
  //         <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
  //         <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
  //         <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full flex animate-slideUp">
      <div
        className={`max-w-xl ${
          item.type === "q" ? "ml-auto text-right" : "mr-auto text-left"
        }`}
      >
        <div
          className={`p-3 transition-all duration-300 ${
            item.type === "q"
              ? "bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-br-sm"
              : "bg-white text-black dark:bg-zinc-800 dark:text-white rounded-2xl"
          }`}
        >
          {item.type === "q" ? (
  item.text
) : item.loading ? (
  <span className="typing">
    {item.text}
    <span className="dots"></span>
  </span>
) : (
  <Answers ans={item.text} />
)}
        </div>
      </div>
    </div>
  );
};

export default QuerryAnswer;
