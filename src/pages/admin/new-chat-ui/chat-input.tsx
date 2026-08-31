import React, { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMessages } from "@/features/contexts/message-context";
import { useAuthContext } from "@/features/contexts/auth-context";
import ChatBubble from "./chat-bubble";

export function ChatInput() {
  const [input, setInput] = React.useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { currentUser } = useAuthContext();
  const { isTyping, sendMessage, setSocketMessage } = useMessages();

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (input.trim() && !isTyping) {
      const createdAt = Date.now();

      sendMessage({
        id: createdAt.toString(),
        sender: currentUser?.email!,
        room: currentUser?.email!,
        text: input,
        isSender: true,
        createdAt,
      });

      const userMessage = {
        id: createdAt.toString(),
        sender: currentUser?.email!,
        room: currentUser?.email!,
        text: input,
        isSender: true,
        createdAt,
      };

      setSocketMessage(userMessage);

      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <div className="p-4 bg-background">
      {true && (
        <div className="max-w-3xl mx-auto mb-5">
          <ChatBubble />
        </div>
      )}
      <div className="max-w-3xl mx-auto relative flex items-end shadow-sm border border-border bg-card rounded-2xl p-2 transition-shadow focus-within:ring-1 focus-within:ring-ring focus-within:border-ring">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Assistant..."
          className="flex-1 max-h-[200px] min-h-[40px] resize-none bg-transparent px-3 py-2.5 text-sm focus:outline-none custom-scrollbar m-0 placeholder:text-muted-foreground/60"
          rows={1}
          disabled={isTyping}
        />

        <Button
          onClick={handleSend}
          disabled={isTyping || !input.trim()}
          size="icon"
          className="shrink-0 h-10 w-10 rounded-xl transition-all"
          variant={input.trim() ? "default" : "secondary"}
        >
          <Send size={18} className={input.trim() ? "translate-x-0.5" : ""} />
        </Button>
      </div>
      <div className="text-center mt-2">
        <span className="text-[10px] text-muted-foreground/60 font-sans">
          Assistant can make mistakes. Consider verifying important information.
        </span>
      </div>
    </div>
  );
}
