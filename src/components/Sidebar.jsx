import { AnimatePresence, motion } from "framer-motion";
import {
  History,
  Menu,
  MessageSquareText,
  MoonStar,
  Plus,
  Sparkles,
  SunMedium,
  Trash2,
  X,
} from "lucide-react";
import { useChat } from "../context/useChat";
import useTheme from "../hooks/useTheme";

const panelTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
};

const MotionAside = motion.aside;
const MotionButton = motion.button;
const MotionDiv = motion.div;
const MotionItem = motion.li;
const MotionSection = motion.section;

function SidebarBody({
  chats,
  currentChatId,
  createNewChat,
  deleteChat,
  loadChat,
  mobile = false,
  onClose,
  theme,
  toggleTheme,
}) {
  return (
    <div className="flex h-full flex-col gap-4 p-4 md:p-5">
      <div className="flex items-center justify-between md:hidden">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-sky-500" />
          Navigation
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/60 bg-white/75 text-slate-700 transition hover:scale-[1.03] dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100"
        >
          <X size={18} />
        </button>
      </div>

      <MotionDiv
        className="glass-panel-strong rounded-[28px] p-4 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)]"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={panelTransition}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] bg-slate-950/90 p-2 shadow-lg shadow-sky-500/10 dark:bg-white/10">
            <img
              src="/favicon.svg"
              alt="ChatLy"
              className="h-8 w-8 object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700 dark:bg-sky-400/10 dark:text-sky-200">
              <Sparkles className="h-3.5 w-3.5" />
              Pro Workspace
            </div>
            <h1 className="font-display mt-3 text-xl font-bold text-slate-950 dark:text-white">
              ChatLy
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              A focused chat surface for research, drafting, debugging, and
              structured conversations.
            </p>
          </div>
        </div>
      </MotionDiv>

      <MotionButton
        type="button"
        onClick={() => {
          createNewChat();
          onClose?.();
        }}
        className="group flex items-center justify-between rounded-[24px] bg-slate-950 px-4 py-4 text-left text-white shadow-[0_18px_50px_-24px_rgba(15,23,42,0.7)] transition dark:bg-white dark:text-slate-950"
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.2 }}
      >
        <div>
          <p className="text-sm font-semibold">Start a new conversation</p>
          <p className="mt-1 text-xs text-white/70 dark:text-slate-600">
            Clear the stage for a fresh question.
          </p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 transition group-hover:bg-white/15 dark:bg-slate-950/8 dark:group-hover:bg-slate-950/12">
          <Plus size={18} />
        </div>
      </MotionButton>

      <MotionSection
        className="glass-panel flex min-h-0 flex-1 flex-col rounded-[28px] p-3"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...panelTransition, delay: 0.06 }}
      >
        <div className="flex items-center justify-between px-2 pb-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
              History
            </p>
            <h2 className="font-display mt-1 text-sm font-semibold text-slate-900 dark:text-white">
              Recent conversations
            </h2>
          </div>
          <div className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm dark:bg-slate-900/70 dark:text-slate-200">
            {chats.length}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {chats.length > 0 ? (
            <ul className="space-y-2">
              {chats.map((chat, index) => {
                const active = chat.id === currentChatId;

                return (
                  <MotionItem
                    key={chat.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.28 }}
                  >
                    <div
                      className={`group flex w-full items-center gap-3 rounded-[22px] border px-3 py-3 text-left transition ${
                        active
                          ? "border-sky-500/35 bg-sky-500/10 shadow-[0_18px_40px_-28px_rgba(14,165,233,0.6)] dark:border-sky-400/30 dark:bg-sky-400/10"
                          : "border-transparent bg-white/65 hover:border-white/70 hover:bg-white/90 dark:bg-slate-900/45 dark:hover:border-white/10 dark:hover:bg-slate-900/70"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          loadChat(chat.id);
                          onClose?.();
                        }}
                        className="flex min-w-0 flex-1 items-center gap-3 text-left"
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                            active
                              ? "bg-sky-500 text-white"
                              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                        >
                          <MessageSquareText size={17} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate text-sm font-semibold ${
                              active
                                ? "text-slate-950 dark:text-white"
                                : "text-slate-800 dark:text-slate-100"
                            }`}
                          >
                            {chat.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {active ? "Current conversation" : "Open chat"}
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        aria-label={`Delete ${chat.title}`}
                        onClick={() => deleteChat(chat.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </MotionItem>
                );
              })}
            </ul>
          ) : (
            <div className="flex h-full flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-200/80 px-5 py-10 text-center dark:border-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-300">
                <History size={18} />
              </div>
              <h3 className="font-display mt-4 text-base font-semibold text-slate-900 dark:text-white">
                No chats yet
              </h3>
              <p className="mt-2 max-w-[16rem] text-sm leading-6 text-slate-500 dark:text-slate-400">
                Start a conversation and your recent work will appear here for
                quick access.
              </p>
            </div>
          )}
        </div>
      </MotionSection>

      <MotionDiv
        className="grid gap-3"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...panelTransition, delay: 0.12 }}
      >
        <button
          type="button"
          onClick={toggleTheme}
          className="glass-panel flex items-center justify-between rounded-[24px] px-4 py-4 text-left transition hover:-translate-y-0.5"
        >
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Adjust the workspace to your environment.
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
            {theme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
          </div>
        </button>

        {!mobile && (
          <div className="glass-panel rounded-[24px] px-4 py-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Sparkles className="h-4 w-4 text-sky-500" />
              <span className="font-semibold">Smooth by design</span>
            </div>
            <p className="mt-2">
              Motion softens navigation, message flow, and state changes so the
              interface feels deliberate end to end.
            </p>
          </div>
        )}
      </MotionDiv>
    </div>
  );
}

function Sidebar({ isOpen, setIsOpen }) {
  const { chats, currentChatId, loadChat, createNewChat, deleteChat } = useChat();
  const { theme, toggleTheme } = useTheme();

  const sidebarProps = {
    chats,
    currentChatId,
    createNewChat,
    deleteChat,
    loadChat,
    theme,
    toggleTheme,
  };

  return (
    <>
      <MotionButton
        type="button"
        onClick={() => setIsOpen(true)}
        className="glass-panel fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-2xl text-slate-700 shadow-lg md:hidden dark:text-slate-100"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu size={18} />
      </MotionButton>

      <aside className="hidden w-[340px] shrink-0 border-r border-white/45 md:flex dark:border-white/8">
        <SidebarBody {...sidebarProps} />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <MotionDiv
              className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <MotionAside
              className="fixed inset-y-0 left-0 z-50 flex w-[88vw] max-w-sm md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={panelTransition}
            >
              <div className="app-shell w-full rounded-none rounded-r-[28px]">
                <SidebarBody
                  {...sidebarProps}
                  mobile
                  onClose={() => setIsOpen(false)}
                />
              </div>
            </MotionAside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
