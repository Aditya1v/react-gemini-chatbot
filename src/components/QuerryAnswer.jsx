import { motion } from "framer-motion";
import { Bot, UserRound } from "lucide-react";
import Answers from "./Answers";
import Loader from "./Loader";
import { getBubbleSizing } from "../utils/messageSizing";

const messageTransition = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1],
};

const MotionItem = motion.li;

const QuerryAnswer = ({ item }) => {
  const isQuestion = item.type === "q";
  const bubbleStyle = getBubbleSizing(
    item.loading ? "Thinking through it" : item.text,
    isQuestion ? "question" : "answer",
  );

  return (
    <MotionItem
      layout
      className={`flex w-full ${isQuestion ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={messageTransition}
    >
      <div
        className={`flex w-full max-w-3xl gap-3 ${
          isQuestion ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-[20px] shadow-sm ${
            isQuestion
              ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
              : "bg-sky-500 text-white"
          }`}
        >
          {isQuestion ? <UserRound size={18} /> : <Bot size={18} />}
        </div>

        <div
          className={`min-w-0 flex flex-1 flex-col ${
            isQuestion ? "items-end text-right" : "items-start text-left"
          }`}
        >
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            {isQuestion ? "You" : "ChatLy"}
          </p>

          <div
            style={bubbleStyle}
            className={`overflow-hidden rounded-[26px] border ${
              isQuestion
                ? "bubble-shell ml-auto border-slate-950/10 bg-slate-950 px-5 py-4 text-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.7)] dark:border-white/8 dark:bg-white dark:text-slate-950"
                : "bubble-shell glass-panel-strong px-5 py-4 text-slate-900 dark:text-white"
            }`}
          >
            {isQuestion ? (
              <p className="bubble-copy whitespace-pre-wrap text-[15px] leading-7">
                {item.text}
              </p>
            ) : item.loading ? (
              <Loader />
            ) : (
              <Answers ans={item.text} />
            )}
          </div>
        </div>
      </div>
    </MotionItem>
  );
};

export default QuerryAnswer;
