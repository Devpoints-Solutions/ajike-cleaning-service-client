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
      sendMessage({
        id: Date.now().toString(),
        sender: currentUser?.email!,
        room: currentUser?.email!,
        text: input,
        isSender: true,
      });

      const userMessage = {
        id: Date.now().toString(),
        sender: currentUser?.email!,
        room: currentUser?.email!,
        text: input,
        isSender: true,
      };

      setSocketMessage(userMessage);

      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <div className="bg-background p-4">
      {isTyping && (
        <div className="mx-auto mb-5 max-w-3xl">
          <ChatBubble />
        </div>
      )}
      <div className="relative mx-auto flex max-w-full items-end rounded-2xl border border-border bg-card p-2 shadow-[0_12px_28px_rgba(18,37,96,0.05)] transition-shadow focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Assistant..."
          className="m-0 max-h-[200px] min-h-[40px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none custom-scrollbar"
          rows={1}
          disabled={isTyping}
        />

        <Button
          onClick={handleSend}
          disabled={isTyping || !input.trim()}
          size="icon"
          className="h-10 w-10 shrink-0 rounded-xl transition-all"
          variant={input.trim() ? "default" : "secondary"}
        >
          <Send size={18} className={input.trim() ? "translate-x-0.5" : ""} />
        </Button>
      </div>
    </div>
  );
}
