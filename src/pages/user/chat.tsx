import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { useMessages } from "@/features/contexts/message-context";
import { useAuthContext } from "@/features/contexts/auth-context";
import { MarkdownRenderer } from "@/pages/admin/new-chat-ui/markdown-renderer";

function Chat() {
  const [message, setMessage] = useState("");
  const {
    socketMessages,
    sendMessage,
    showUserChat,
    toggleUserChat,
    setSocketMessage,
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
  const send = (text = message) => {
    if (!text.trim()) return;
    const starter = starters.find((label) => label === text);

    if (starter) {
      const userMessage = {
        _id: Date.now().toString(),
        sender: currentUser?._id!,
        room: currentUser?._id!?.slice(0, 6) + currentUser?._id!?.slice(-6),
        text: starter,
      };

      sendMessage("ai-message", userMessage);
      return setSocketMessage({ ...userMessage, sender: currentUser! });
    }

    const userMessage = {
      _id: Date.now().toString(),
      sender: currentUser?._id!,
      room: currentUser?._id!?.slice(0, 6) + currentUser?._id!?.slice(-6),
      text: text,
    };

    sendMessage("ai-message", userMessage);

    setSocketMessage({ ...userMessage, sender: currentUser! });

    setMessage("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [socketMessages]);

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
          <strong>Ask Mina</strong>
          <span>Ajike pest control concierge usually replies fast</span>
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
      <div className="chat-messages">
        {socketMessages.map((item, index) => (
          <>
            {item.sender &&
              typeof item?.sender === "string" &&
              item.sender === "Ajike AI" && (
                <div className="w-full rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3 text-sm text-foreground shadow-[0_12px_28px_rgba(18,37,96,0.06)]">
                  <MarkdownRenderer content={item?.text} />
                </div>
              )}

            {item.sender &&
              typeof item?.sender !== "string" &&
              item.sender?._id === currentUser?._id && (
                <div
                  className={`chat-message ${item?.sender?._id === currentUser?._id ? "user" : ""}`}
                  key={`${item._id}-${index}`}
                  data-testid={`chat-message-${index}`}
                >
                  {item.text}
                </div>
              )}
          </>
        ))}
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
          placeholder="Ask about your space..."
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
