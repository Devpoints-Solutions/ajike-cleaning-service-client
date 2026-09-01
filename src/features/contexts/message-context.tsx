import { useRef, useState, useEffect, createContext, useContext } from "react";
import type { IUser } from "@/lib/types";
import {
  useGetAllRoomsMutation,
  useGetMessagesByRoomMutation,
} from "../apis/message-apis";
import { useAuthContext } from "./auth-context";
import { io } from "socket.io-client";

export type IMessage = {
  text: string;
  _id: string;
  sender: IUser;
  room: string;
  createdAt?: string;
  isRead?: boolean;
};

export type IRoom = {
  lastMessage: IMessage;
  room: string;
  user: IUser;
  initial: string;
};

type MessageContextType = {
  socketMessages: IMessage[];
  sendMessage: (messageData: {
    sender: string;
    room: string;
    text: string;
  }) => void;
  joinRoom: (userData: { room: string; user: string }) => void;
  leaveRoom?: (userData: any, room: string) => void;
  setSocketMessage: (messageData: IMessage) => void;
  isTyping: boolean;
  rooms: IRoom[];
  showUserChat: boolean;
  toggleUserChat: () => void;
  onGetMessagesByRoom: (room: string) => void;
};

export const MessageContext = createContext<MessageContextType>({
  socketMessages: [],
  sendMessage: () => {},
  joinRoom: () => {},
  leaveRoom: () => {},
  isTyping: false,
  setSocketMessage: () => {},
  rooms: [],
  showUserChat: false,
  toggleUserChat: () => {},
  onGetMessagesByRoom: () => {},
});

const API_URL = import.meta.env.VITE_APP_SOCKET_URL;

export const MessageProvider = ({ children }: React.PropsWithChildren<any>) => {
  // const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [socketMessages, setSocketMessages] = useState<IMessage[]>([]);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [showUserChat, setShowUserChat] = useState<boolean>(false);

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const socket = useRef(io(API_URL));

  const { isAuthenticated, currentUser } = useAuthContext();

  const [getAllRooms, { data, isSuccess }] = useGetAllRoomsMutation();

  const [getMessagesByRoom, { data: roomData, isSuccess: roomSuccess }] =
    useGetMessagesByRoomMutation();

  function joinRoom(roomData: { room: string; user: string }) {
    socket?.current?.emit("joinRoom", roomData);
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

  function sendMessage(messageData: {
    sender: string;
    room: string;
    text: string;
  }) {
    socket?.current?.emit("chatMessage", messageData);
  }

  // useEffect(() => {
  //   const handleMessage = (msg: IMessage) => {
  //     // Stop previous stream
  //     if (streamIntervalRef.current) {
  //       clearInterval(streamIntervalRef.current);
  //       streamIntervalRef.current = null;
  //     }

  //     const messageId = crypto.randomUUID();

  //     // Insert an empty AI message
  //     setSocketMessages((prev) => [
  //       ...prev,
  //       {
  //         ...msg,
  //         id: messageId,
  //         text: "",
  //         isStreaming: true,
  //       },
  //     ]);

  //     let charIndex = 0;

  //     streamIntervalRef.current = window.setInterval(() => {
  //       charIndex += 3;

  //       const revealed = msg.text.slice(0, charIndex);
  //       const done = charIndex >= msg.text.length;

  //       setSocketMessages((prev) =>
  //         prev.map((m) =>
  //           m.id === messageId
  //             ? {
  //                 ...m,
  //                 text: revealed,
  //                 isStreaming: !done,
  //               }
  //             : m,
  //         ),
  //       );

  //       if (done && streamIntervalRef.current) {
  //         clearInterval(streamIntervalRef.current);
  //         streamIntervalRef.current = null;
  //       }
  //     }, 1);
  //   };

  //   socket.current?.on("ai-message", handleMessage);

  //   return () => {
  //     socket.current?.off("ai-message", handleMessage);

  //     if (streamIntervalRef.current) {
  //       clearInterval(streamIntervalRef.current);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    const currentSocket = socket?.current;

    if (currentSocket) {
      currentSocket?.on("chatMessage", (msg: IMessage) => {
        setSocketMessages((prev) => [...prev, msg]);
      });
    }

    return () => {
      currentSocket?.off("chatMessage");
    };
  }, [socket]);

  useEffect(() => {
    if (isAuthenticated && currentUser && currentUser?.role === "admin") {
      getAllRooms(1);
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    if (!isSuccess || !data?.data?.rooms?.length) return;

    setRooms(
      data.data.rooms?.map((room: any) => ({
        lastMessage: {
          _id: room.lastMessage?._id,
          text: room.lastMessage?.text,
          sender: room.lastMessage?.sender,
          room: room.lastMessage?.room,
          isSender: room.lastMessage?.sender?._id === currentUser?._id,
          isRead: room.lastMessage?.isRead,
          createdAt: room.lastMessage?.createdAt,
        },
        room: room.room,
        user: room.user,
        initial: `${room.user?.firstName?.[0]?.toUpperCase() ?? "U"}${room.user?.lastName?.[0]?.toUpperCase() ?? "S"}`,
      })),
    );
  }, [data, isSuccess]);

  useEffect(() => {
    if (!roomSuccess || !roomData?.data?.messages?.length)
      return setSocketMessages([]);
    setSocketMessages(
      roomData.data.messages
        ?.map((msg: any) => ({
          id: msg._id,
          text: msg.text,
          sender: msg.sender,
          isSender: msg.sender?._id === currentUser?._id,
          createdAt: msg.createdAt,
        }))
        .reverse(),
    );
  }, [roomData, roomSuccess]);

  function toggleUserChat() {
    if (!showUserChat) {
      setShowUserChat(true);
      return joinRoom({
        user: currentUser?._id!,
        room: currentUser?._id!?.slice(0, 6) + currentUser?._id!?.slice(-6),
      });
    }
    return setShowUserChat(!showUserChat);
  }

  function onGetMessagesByRoom(room: string) {
    getMessagesByRoom({ room, page: 1 });
  }

  const value = {
    sendMessage,
    socketMessages,
    joinRoom,
    isTyping,
    setSocketMessage: (messageData: IMessage) =>
      setSocketMessages((socketMessage) => [...socketMessage, messageData]),
    rooms,
    showUserChat,
    toggleUserChat,
    onGetMessagesByRoom,
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export function useMessages() {
  return useContext(MessageContext);
}
