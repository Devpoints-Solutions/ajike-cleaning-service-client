import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

function Chat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi, I’m Mina from Ajike. Tell me what is happening in your space and I will help you find the right next step.",
      user: false,
    },
  ]);
  const starters = [
    [
      "Book an inspection",
      "I can help with that. Start with a service request and tell us what you noticed. A coordinator will confirm a visit window and pricing before work begins.",
    ],
    [
      "Help identify a pest",
      "Describe what you saw, where you saw it, and when it started. A photo is helpful but never required — our technician can inspect it in person.",
    ],
    [
      "Ask about cleaning",
      "We offer standard home, deep, office, restaurant, and move-in/out cleaning. Tell me about the space and your preferred timing.",
    ],
    [
      "Set up recurring care",
      "After your first visit, we can recommend a recurring schedule based on the property and the issue — every 30, 60, or 90 days.",
    ],
    [
      "What areas do you serve?",
      "Ajike serves homes and businesses across the local metro area. Send a request with your address and we will confirm coverage.",
    ],
  ];
  const send = (text = message) => {
    if (!text.trim()) return;
    const starter = starters.find(([label]) => label === text);
    const reply =
      starter?.[1] ||
      "I can help you get oriented. You can ask about an inspection, pest identification, cleaning, recurring maintenance, pricing, or service areas.";
    setMessages((current) => [
      ...current,
      { text, user: true },
      { text: reply, user: false },
    ]);
    setMessage("");
  };
  if (!open)
    return (
      <button
        className="chat-launcher"
        onClick={() => setOpen(true)}
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
          <span>Ajike service concierge · usually replies fast</span>
        </div>
        <button
          className="icon-button"
          onClick={() => setOpen(false)}
          aria-label="Close support chat"
          data-testid="button-close-chat"
        >
          <X size={17} />
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((item, index) => (
          <div
            className={`chat-message ${item.user ? "user" : ""}`}
            key={`${item.text}-${index}`}
            data-testid={`chat-message-${index}`}
          >
            {item.text}
          </div>
        ))}
        <div className="chat-suggestions">
          <span className="chat-suggestions-label">Try asking about</span>
          {starters.map(([label], index) => (
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
