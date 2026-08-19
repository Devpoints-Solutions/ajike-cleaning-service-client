import { createContext, useContext, useState, ReactNode } from "react";

export type Message = {
  id: string;
  text: string;
  sender: "user" | "admin" | "bot";
  timestamp: Date;
  userId?: string;
  userName?: string;
};

type MessageContextType = {
  messages: Message[];
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  clearMessages: () => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi, I'm Mina from Ajike. Tell me what is happening in your space and I will help you find the right next step.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
}
