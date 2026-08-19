import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowLeft,
  MessageCircle,
  Send,
  User,
  Bot,
  Clock,
  Search,
} from "lucide-react";
import { useMessages } from "@/contexts/message-context";

export function AdminChatPage() {
  const [replyMessage, setReplyMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const { messages, addMessage } = useMessages();

  // Group messages by conversation/session
  const conversations = messages.reduce((acc, msg) => {
    const sessionId = msg.userId || "general";
    if (!acc[sessionId]) {
      acc[sessionId] = [];
    }
    acc[sessionId].push(msg);
    return acc;
  }, {} as Record<string, typeof messages>);

  const conversationList = Object.entries(conversations).map(
    ([sessionId, msgs]) => ({
      id: sessionId,
      messages: msgs,
      latestMessage: msgs[msgs.length - 1],
      unreadCount: msgs.filter(
        (m) => m.sender === "user" || m.sender === "bot"
      ).length,
    })
  );

  const filteredConversations = conversationList.filter((conv) => {
    const latestMsg = conv.latestMessage.text.toLowerCase();
    const userName = conv.latestMessage.userName || "Unknown";
    return (
      latestMsg.includes(searchQuery.toLowerCase()) ||
      userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const activeConversation = activeChatId
    ? conversationList.find((c) => c.id === activeChatId)
    : null;

  const sendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    addMessage({
      text: replyMessage,
      sender: "admin",
      userName: "Admin",
      userId: activeChatId || "general",
    });
    setReplyMessage("");
  };

  return (
    <div className="admin-page">
      <main className="container admin-wrap">
        <div className="admin-chat-header">
          <div className="admin-chat-back">
            <Link
              href="/admin/dashboard"
              className="text-button"
              data-testid="button-back-to-dashboard"
            >
              <ArrowLeft size={18} /> Back to Dashboard
            </Link>
          </div>
          <div>
            <div className="eyebrow">Admin Console</div>
            <h1>Customer Chat Center</h1>
            <p>Manage all customer conversations in one place</p>
          </div>
        </div>

        <div className="admin-chat-layout">
          {/* Conversation List Sidebar */}
          <aside className="admin-chat-sidebar">
            <div className="admin-chat-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-conversations"
              />
            </div>

            <div className="admin-chat-list">
              {filteredConversations.length === 0 ? (
                <div className="admin-chat-empty-state">
                  <MessageCircle size={48} />
                  <h3>No conversations found</h3>
                  <p>
                    {searchQuery
                      ? "No conversations match your search"
                      : "No customer messages yet"}
                  </p>
                </div>
              ) : (
                filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    className={`admin-chat-item ${
                      activeChatId === conv.id ? "active" : ""
                    }`}
                    onClick={() => setActiveChatId(conv.id)}
                    data-testid={`button-conversation-${conv.id}`}
                  >
                    <div className="admin-chat-avatar">
                      {conv.latestMessage.sender === "user" ? (
                        <User size={18} />
                      ) : (
                        <Bot size={18} />
                      )}
                    </div>
                    <div className="admin-chat-preview">
                      <div className="admin-chat-meta">
                        <span className="admin-chat-sender">
                          {conv.latestMessage.userName || "Customer"}
                        </span>
                        <span className="admin-chat-time">
                          {conv.latestMessage.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="admin-chat-text-preview">
                        {conv.latestMessage.text.length > 50
                          ? conv.latestMessage.text.substring(0, 50) + "..."
                          : conv.latestMessage.text}
                      </p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <span className="admin-chat-unread-badge">
                        {conv.unreadCount}
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          </aside>

          {/* Chat Messages Area */}
          <section className="admin-chat-main">
            {activeConversation ? (
              <>
                <div className="admin-chat-toolbar">
                  <div className="admin-chat-info">
                    <h3>
                      {activeConversation.latestMessage.userName || "Customer"}
                    </h3>
                    <span className="admin-chat-status">
                      <Clock size={12} />
                      {activeConversation.messages.length} messages
                    </span>
                  </div>
                </div>

                <div className="admin-chat-messages-container">
                  {activeConversation.messages.map((msg, index) => (
                    <div
                      className={`admin-chat-message-full ${
                        msg.sender === "admin" ? "admin" : "customer"
                      }`}
                      key={`${msg.id}-${index}`}
                      data-testid={`admin-full-chat-message-${index}`}
                    >
                      <div className="admin-chat-message-header">
                        <span className="admin-chat-message-sender">
                          {msg.userName || msg.sender}
                        </span>
                        <span className="admin-chat-message-time">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="admin-chat-message-content">
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  className="admin-chat-reply-form"
                  onSubmit={sendReply}
                >
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply..."
                    aria-label="Admin reply message"
                    data-testid="input-admin-reply"
                  />
                  <button
                    type="submit"
                    className="primary-button"
                    disabled={!replyMessage.trim()}
                    data-testid="button-send-admin-reply"
                  >
                    <Send size={16} /> Send
                  </button>
                </form>
              </>
            ) : (
              <div className="admin-chat-welcome">
                <MessageCircle size={64} />
                <h2>Welcome to Chat Center</h2>
                <p>Select a conversation from the left to start chatting</p>
                <p className="muted">
                  All customer messages from the chat widget will appear here
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminChatPage;
