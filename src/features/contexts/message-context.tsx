import { useRef, useState, useEffect, createContext, useContext } from "react";
import { io } from "socket.io-client";

export type IMessage = {
  text: string;
  id: string;
  sender: string;
  room: string;
  isSender: boolean;
};

type MessageContextType = {
  socketMessages: IMessage[];
  sendMessage: (messageData: IMessage) => void;
  joinRoom: (userData: any, room: string) => void;
  leaveRoom?: (userData: any, room: string) => void;
  setSocketMessage: (messageData: IMessage) => void;
  isTyping: boolean;
};

export const MessageContext = createContext<MessageContextType>({
  socketMessages: [],
  sendMessage: () => {},
  joinRoom: () => {},
  leaveRoom: () => {},
  isTyping: false,
  setSocketMessage: () => {},
});

const API_URL = import.meta.env.VITE_APP_SOCKET_URL;

export const MessageProvider = ({ children }: React.PropsWithChildren<any>) => {
  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [socketMessages, setSocketMessages] = useState<IMessage[]>([]);

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const socket = useRef(io(API_URL));

  function joinRoom(userData: any, room: string) {
    socket?.current?.emit("joinRoom", { ...userData, room });
  }

  useEffect(() => {
    socket?.current?.on("typing", () => {
      setIsTyping(true);
    });

    socket?.current?.on("stopTyping", () => {
      setIsTyping(false);
    });

    return () => {
      socket?.current?.off("typing");
      socket?.current?.off("stopTyping");
    };
  }, [socket]);

  function sendMessage(messageData: IMessage) {
    socket?.current?.emit("chatMessage", messageData);
  }

  useEffect(() => {
    const handleMessage = (msg: IMessage) => {
      // Stop previous stream
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
        streamIntervalRef.current = null;
      }

      const messageId = crypto.randomUUID();

      // Insert an empty AI message
      setSocketMessages((prev) => [
        ...prev,
        {
          ...msg,
          id: messageId,
          text: "",
          isStreaming: true,
        },
      ]);

      let charIndex = 0;

      streamIntervalRef.current = window.setInterval(() => {
        charIndex += 3;

        const revealed = msg.text.slice(0, charIndex);
        const done = charIndex >= msg.text.length;

        setSocketMessages((prev) =>
          prev.map((m) =>
            m.id === messageId
              ? {
                  ...m,
                  text: revealed,
                  isStreaming: !done,
                }
              : m,
          ),
        );

        if (done && streamIntervalRef.current) {
          clearInterval(streamIntervalRef.current);
          streamIntervalRef.current = null;
        }
      }, 1);
    };

    socket.current?.on("message", handleMessage);

    return () => {
      socket.current?.off("message", handleMessage);

      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, []);

  const value = {
    sendMessage,
    socketMessages,
    joinRoom,
    isTyping,
    setSocketMessage: (messageData: IMessage) =>
      setSocketMessages((socketMessage) => [...socketMessage, messageData]),
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export function useMessages() {
  return useContext(MessageContext);
}
