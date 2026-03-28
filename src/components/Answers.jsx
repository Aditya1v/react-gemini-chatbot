import ReactMarkdown from "react-markdown";

const Answers = ({ ans }) => {
  return (
    <div className="text-zinc-200 whitespace-pre-wrap leading-relaxed text-sm">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="text-zinc-200 mb-2">{children}</p>,
          strong: ({ children }) => (
            <strong className="text-white font-semibold">{children}</strong>
          ),
          li: ({ children }) => (
            <li className="ml-4 list-disc">{children}</li>
          ),
        }}
      >
        {ans}
      </ReactMarkdown>
    </div>
  );
};

export default Answers;