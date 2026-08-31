import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import { MarkdownRenderer } from "./markdown-renderer";
import { useMessages } from "@/features/contexts/message-context";
import { useAuthContext } from "@/features/contexts/auth-context";

export function ChatMessages() {
  const bottomRef = useRef<HTMLDivElement>(null);

  const { socketMessages, sendMessage, setSocketMessage } = useMessages();

  const { currentUser } = useAuthContext();

  const handleSend = (content: string) => {
    sendMessage({
      id: Date.now().toString(),
      sender: currentUser?.email!,
      room: currentUser?.email!,
      text: content,
      isSender: true,
    });

    const userMessage = {
      id: Date.now().toString(),
      sender: currentUser?.email!,
      room: currentUser?.email!,
      text: content,
      isSender: true,
    };

    setSocketMessage(userMessage);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [socketMessages]);

  if (!socketMessages || socketMessages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/10">
          <Bot size={32} className="stroke-[1.5]" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">
          What can I help you with today?
        </h2>
        <p className="mb-8 max-w-md text-sm text-muted-foreground">
          I can explain complex topics, write code, or help you brainstorm
          ideas.
        </p>

        <div className="grid w-full max-w-2xl grid-cols-1 gap-3 md:grid-cols-2">
          <button
            onClick={() =>
              handleSend?.("Explain quantum computing in simple terms")
            }
            className="flex flex-col rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted"
          >
            <span className="mb-1 text-sm font-medium text-foreground">
              Explain quantum computing
            </span>
            <span className="text-xs text-muted-foreground">in simple terms</span>
          </button>
          <button
            onClick={() =>
              handleSend?.("Write a Python script to scrape a website")
            }
            className="flex flex-col rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted"
          >
            <span className="mb-1 text-sm font-medium text-foreground">
              Write a Python script
            </span>
            <span className="text-xs text-muted-foreground">
              to scrape a website
            </span>
          </button>
          <button
            onClick={() =>
              handleSend?.("Draft an email to decline a meeting politely")
            }
            className="flex flex-col rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted"
          >
            <span className="mb-1 text-sm font-medium text-foreground">
              Draft an email
            </span>
            <span className="text-xs text-muted-foreground">
              to decline a meeting politely
            </span>
          </button>
          <button
            onClick={() => handleSend?.("Help me debug a React useEffect loop")}
            className="flex flex-col rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted"
          >
            <span className="mb-1 text-sm font-medium text-foreground">
              Help me debug
            </span>
            <span className="text-xs text-muted-foreground">
              a React useEffect loop
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
      <div className="mx-auto max-w-3xl space-y-8 pb-12">
        <AnimatePresence initial={false}>
          {socketMessages?.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message?.isSender ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                  message?.isSender
                    ? "bg-primary/10 text-primary ring-1 ring-primary/15"
                    : "bg-primary text-primary-foreground shadow-sm"
                }`}
              >
                {message?.isSender ? (
                  `${currentUser?.firstName?.[0]?.toUpperCase() ?? "U"}${currentUser?.lastName?.[0]?.toUpperCase() ?? "S"}`
                ) : (
                  <Bot size={18} />
                )}
              </div>

              <div
                className={`flex max-w-[85%] flex-col ${message?.isSender ? "items-end" : "items-start"}`}
              >
                <div className="mb-1 px-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {!message?.isSender && "Assistant"}
                </div>
                {message?.isSender ? (
                  <div className="whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground shadow-[0_12px_28px_rgba(18,37,96,0.12)]">
                    {message?.text}
                  </div>
                ) : (
                  <div className="w-full rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3 text-sm text-foreground shadow-[0_12px_28px_rgba(18,37,96,0.06)]">
                    <MarkdownRenderer content={message?.text} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
