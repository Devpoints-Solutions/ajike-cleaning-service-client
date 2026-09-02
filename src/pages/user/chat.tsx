import { useState, useEffect, useRef } from "react";
import { Bot, Headphones, MessageCircle, Send, X } from "lucide-react";
import { useMessages } from "@/features/contexts/message-context";
import { useAuthContext } from "@/features/contexts/auth-context";
import ChatBubble from "@/components/common/chat-bubble";
import { MarkdownRenderer } from "@/pages/admin/new-chat-ui/markdown-renderer";

function Chat() {
  const [message, setMessage] = useState("");
  const [supportMode, setSupportMode] = useState<"ai" | "human">("ai");
  const messageIdRef = useRef(0);
  const {
    socketMessages,
    sendMessage,
    showUserChat,
    toggleUserChat,
    setSocketMessage,
    isTyping,
    emitIsTyping,
    emitStopTyping,
  } = useMessages();

  const bottomRef = useRef<HTMLDivElement>(null);

  const { currentUser } = useAuthContext();

  const starters = [
    "I need help with a pest problem",
    "What cleaning services can I book?",
    "Can someone inspect my property?",
    "How much will the service cost?",
    "Do you offer recurring services?",
    "Which areas do you serve?",
    "What service is right for my property?",
    "I'd like to request a quote",
  ];

  const room =
    currentUser && `${currentUser._id.slice(0, 6)}${currentUser._id.slice(-6)}`;

  const send = (text = message) => {
    if (!room) return;
    if (!text.trim() || !currentUser) return;
    const starter = starters.find((label) => label === text);
    const event = supportMode === "ai" ? "ai-message" : "chatMessage";
    messageIdRef.current += 1;

    if (starter) {
      const userMessage = {
        _id: `local-${messageIdRef.current}`,
        sender: currentUser._id,
        room,
        text: starter,
      };

      sendMessage(event, userMessage);
      setSocketMessage({ ...userMessage, sender: currentUser });
      setMessage("");
      return;
    }

    const userMessage = {
      _id: `local-${messageIdRef.current}`,
      sender: currentUser._id,
      room,
      text: text,
    };

    sendMessage(event, userMessage);

    setSocketMessage({ ...userMessage, sender: currentUser });

    setMessage("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [socketMessages]);

  useEffect(() => {
    if (!room) return;
    const timer = setTimeout(() => {
      emitStopTyping(room);
    }, 300);

    return () => {
      clearTimeout(timer);
      emitIsTyping(room);
    };
  }, [message]);

  if (!showUserChat)
    return (
      <button
        className="chat-launcher"
        onClick={toggleUserChat}
        aria-label="Open Ajike customer support chat"
        data-testid="button-open-chat"
      >
        <MessageCircle size={22} />
      </button>
    );

  return (
    <section
      className="chat-window"
      aria-label="Ajike customer support chat"
      data-testid="chat-window"
    >
      <div className="chat-head">
        <div>
          <strong>
            {supportMode === "ai" ? "Ask Ajike AI" : "Talk to a human"}
          </strong>
          <span>
            {supportMode === "ai"
              ? "AI concierge · instant answers"
              : "Ajike support team · replies during business hours"}
          </span>
        </div>
        <button
          className="icon-button"
          onClick={toggleUserChat}
          aria-label="Close support chat"
          data-testid="button-close-chat"
        >
          <X size={17} />
        </button>
      </div>
      <div
        className="flex items-center gap-1 border-b border-[#d3e7ee] bg-white px-3 py-2"
        role="tablist"
        aria-label="Choose your support"
      >
        <button
          type="button"
          role="tab"
          aria-selected={supportMode === "ai"}
          onClick={() => setSupportMode("ai")}
          data-testid="button-chat-ai-mode"
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[0.65rem] font-bold transition ${
            supportMode === "ai"
              ? "bg-[#e3f6fc] text-[#135578] shadow-sm"
              : "text-[#6d8999] hover:bg-[#f2f9fb]"
          }`}
        >
          <Bot size={14} />
          Ajike AI
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={supportMode === "human"}
          onClick={() => setSupportMode("human")}
          data-testid="button-chat-human-mode"
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[0.65rem] font-bold transition ${
            supportMode === "human"
              ? "bg-[#fff0dc] text-[#8a4b17] shadow-sm"
              : "text-[#6d8999] hover:bg-[#f2f9fb]"
          }`}
        >
          <Headphones size={14} />
          Human support
        </button>
      </div>
      <div className="chat-messages">
        {socketMessages.map((item, index) => {
          const isSender =
            item.sender &&
            typeof item.sender !== "string" &&
            String(item.sender._id) === String(currentUser?._id);

          return (
            <div key={`${item._id}-${index}`}>
              {item.sender &&
                typeof item?.sender === "string" &&
                item.sender === "Ajike AI" && (
                  <div className="w-full rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3 text-sm text-foreground shadow-[0_12px_28px_rgba(18,37,96,0.06)]">
                    <MarkdownRenderer content={item?.text} />
                  </div>
                )}

              {item.sender &&
                typeof item?.sender === "string" &&
                item.sender !== currentUser?._id && (
                  <div className="w-full rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3 text-sm text-foreground shadow-[0_12px_28px_rgba(18,37,96,0.06)]">
                    <MarkdownRenderer content={item?.text} />
                  </div>
                )}

              {isSender && (
                <div
                  className={`chat-message user w-full rounded-2xl ml-auto rounded-tl-sm border border-border px-4 py-3 text-sm shadow-[0_12px_28px_rgba(18,37,96,0.06)]`}
                  data-testid={`chat-message-${index}`}
                >
                  <span className="mb-1 block text-[0.9rem] font-bold text-[#122560]">
                    {item?.text}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {!socketMessages ||
          (socketMessages?.length <= 0 && (
            <div className="chat-suggestions">
              <span className="chat-suggestions-label">Try asking about</span>
              {starters.map((label, index) => (
                <button
                  className="chat-suggestion"
                  key={label}
                  onClick={() => send(label)}
                  data-testid={`button-chat-starter-${index}`}
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        <div ref={bottomRef} />
      </div>

      {isTyping && (
        <div className="mr-auto mb-2 max-w-2xl pl-2">
          <ChatBubble />
        </div>
      )}
      <form
        className="chat-form"
        onSubmit={(event) => {
          event.preventDefault();
          send();
        }}
      >
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={
            supportMode === "ai"
              ? "Ask Ajike AI about your space..."
              : "Message the Ajike support team..."
          }
          aria-label="Chat message"
          data-testid="input-chat-message"
        />
        <button
          type="submit"
          aria-label="Send chat message"
          data-testid="button-send-chat"
        >
          <Send size={15} />
        </button>
      </form>
    </section>
  );
}

export default Chat;
