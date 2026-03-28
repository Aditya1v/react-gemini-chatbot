import Answers from "./Answers";
const QuerryAnswer = ({ item, index }) => {
  if (item.type === "loading") {
    return (
      <div className="flex justify-start">
        <div className="bg-zinc-800 px-4 py-2 rounded-2xl flex gap-1">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </div>
      </div>
    );
  }

  return (
    <div className={item.type === "q" ? "flex justify-end" : ""}>
      <li
        className={`p-2 max-w-xl ${
          item.type === "q"
            ? "text-right text-white border-8 dark:border-zinc-700 border-red-100 dark:bg-zinc-700 bg-red-100 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit ml-auto"
            : "text-left text-zinc-200 bg-zinc-800 rounded-2xl"
        }`}
      >
        <Answers ans={item.text} totalResult={1} type={item.type} />
      </li>
    </div>
  );
};

export default QuerryAnswer;
