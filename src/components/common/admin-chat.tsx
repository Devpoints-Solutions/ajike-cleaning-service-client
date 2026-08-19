import { useState } from "react";
import { MessageCircle, Send, X, MessageSquare, User, Bot } from "lucide-react";
import { useMessages } from "@/contexts/message-context";

export function AdminChat() {
  const [open, setOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const { messages, addMessage } = useMessages();

  const userMessages = messages.filter(
    (msg) => msg.sender === "user" || msg.sender === "bot"
  );

  const sendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    addMessage({ text: replyMessage, sender: "admin", userName: "Admin" });
    setReplyMessage("");
  };

  if (!open)
    return (
      <button
        className="chat-launcher admin-chat-launcher"
        onClick={() => setOpen(true)}
        aria-label="Open admin chat"
        data-testid="button-open-admin-chat"
      >
        <MessageSquare size={22} />
        {userMessages.length > 0 && (
          <span className="admin-chat-badge">{userMessages.length}</span>
        )}
      </button>
    );

  return (
    <section
      className="chat-window admin-chat-window"
      aria-label="Admin chat"
      data-testid="admin-chat-window"
    >
      <div className="chat-head admin-chat-head">
        <div>
          <strong>Customer Messages</strong>
          <span>All user conversations in one place</span>
        </div>
        <button
          className="icon-button"
          onClick={() => setOpen(false)}
          aria-label="Close admin chat"
          data-testid="button-close-admin-chat"
        >
          <X size={17} />
        </button>
      </div>
      <div className="chat-messages admin-chat-messages">
        {messages.length === 0 ? (
          <div className="admin-chat-empty">
            <MessageCircle size={40} />
            <p>No messages yet</p>
            <p>User messages will appear here</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              className={`admin-chat-message ${msg.sender}`}
              key={`${msg.id}-${index}`}
              data-testid={`admin-chat-message-${index}`}
            >
              <div className="admin-chat-sender">
                {msg.sender === "user" && <User size={14} />}
                {msg.sender === "admin" && <User size={14} />}
                {msg.sender === "bot" && <Bot size={14} />}
                <span>
                  {msg.userName || msg.sender}
                  <small>
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>
                </span>
              </div>
              <div className="admin-chat-text">{msg.text}</div>
            </div>
          ))
        )}
      </div>
      <form
        className="chat-form admin-chat-form"
        onSubmit={sendReply}
      >
        <input
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          placeholder="Reply to customer..."
          aria-label="Admin reply message"
          data-testid="input-admin-chat-reply"
        />
        <button
          type="submit"
          aria-label="Send admin reply"
          data-testid="button-send-admin-chat"
        >
          <Send size={15} />
        </button>
      </form>
    </section>
  );
}

export default AdminChat;
