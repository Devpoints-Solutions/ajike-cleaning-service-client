import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import { MarkdownRenderer } from "./markdown-renderer";
import { useMessages } from "@/features/contexts/message-context";
import { useAuthContext } from "@/features/contexts/auth-context";
import { ChatInput } from "./chat-input";
import ChatWrapper from "./chat-wrapper";

export function ChatMessages() {
  const bottomRef = useRef<HTMLDivElement>(null);

  const [pathname] = useLocation();

  const { socketMessages, joinRoom, onGetMessagesByRoom } = useMessages();

  const { currentUser, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated && currentUser && pathname.split("/")[4]) {
      joinRoom({ user: currentUser?._id, room: pathname.split("/")[4] });
    }
  }, [currentUser, isAuthenticated, pathname]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [socketMessages]);

  useEffect(() => {
    if (pathname.split("/")[4]) {
      onGetMessagesByRoom(pathname.split("/")[4]);
    }
  }, [pathname]);

  return (
    <ChatWrapper>
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
        <div className="mx-auto max-w-full space-y-8 pb-12">
          <AnimatePresence initial={false}>
            {socketMessages?.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message?.sender?._id === currentUser?._id ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                    message?.sender?._id === currentUser?._id
                      ? "bg-primary/10 text-primary ring-1 ring-primary/15"
                      : "bg-primary text-primary-foreground shadow-sm"
                  }`}
                >
                  {message?.sender?._id === currentUser?._id ? (
                    `${currentUser?.firstName?.[0]?.toUpperCase() ?? "U"}${currentUser?.lastName?.[0]?.toUpperCase() ?? "S"}`
                  ) : (
                    <Bot size={18} />
                  )}
                </div>

                <div
                  className={`flex max-w-[85%] flex-col ${message?.sender?._id === currentUser?._id ? "items-end" : "items-start"}`}
                >
                  <div className="mb-1 px-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {message?.sender?._id &&
                    message?.sender?._id !== currentUser?._id
                      ? `${message?.sender?.firstName} ${message?.sender?.lastName}`
                      : ""}
                  </div>
                  {message?.sender?._id === currentUser?._id ? (
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
      <div className="bg-gradient-to-t from-background via-background/95 to-transparent pt-6">
        <ChatInput />
      </div>
    </ChatWrapper>
  );
}
