import { useState } from "react";
import {
  Search,
  MessageCircle,
  CheckCheck,
  PanelLeftClose,
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useMessages, type IRoom } from "@/features/contexts/message-context";
import { Button } from "@/components/ui/button";
import { getChatTime } from "@/helpers/time";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

function SideBar({ isOpen, onToggle, isMobile }: SidebarProps) {
  const sidebarVariants = {
    open: {
      x: 0,
      width: isMobile ? "100%" : "300px",
      opacity: 1,
    },
    closed: {
      x: isMobile ? "-100%" : "-100%",
      width: isMobile ? "100%" : "0px",
      opacity: isMobile ? 0 : 1,
    },
  };

  const [selectedMessage, setSelectedMessage] = useState<IRoom | null>(null);
  const [search, setSearch] = useState("");

  const { rooms } = useMessages();
  const filteredMessages = rooms.filter((room) =>
    room.room.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    // <aside className="flex h-full w-full flex-col border-r border-slate-200 bg-white lg:w-[300px] lg:shrink-0">
    <motion.div
      variants={sidebarVariants}
      initial={isMobile ? "closed" : "open"}
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed md:relative z-50 h-[100dvh] bg-[#ffffff] flex flex-col bg-sidebar border-r border-slate-200 border-sidebar-border overflow-hidden shrink-0`}
    >
      <div className="border-b border-slate-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#1687b6]">
              Messages
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#001625]">
              Conversations
            </h2>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="ml-2 h-10 w-10"
          >
            <PanelLeftClose size={18} />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mt-5">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-[#001625] outline-none transition placeholder:text-slate-400 focus:border-[#1687b6] focus:bg-white focus:ring-2 focus:ring-[#1687b6]/10"
          />
        </div>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((room) => {
            const isSelected = selectedMessage?.room === room?.room;

            return (
              <Link
                href={`/admin/dashboard/messages/${room?.room}`}
                key={room?.room}
                onClick={() => setSelectedMessage(room)}
                className={`relative flex w-full gap-3 border-b border-slate-100 p-4 text-left transition ${
                  isSelected ? "bg-[#eaf7fb]" : "bg-white hover:bg-slate-50"
                }`}
              >
                {/* Active indicator */}
                {isSelected && (
                  <span className="absolute bottom-0 left-0 top-0 w-1 bg-[#1687b6]" />
                )}

                {/* Avatar */}
                <div className="relative shrink-0">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-xs font-bold ${
                      isSelected
                        ? "bg-[#1687b6] text-white"
                        : "bg-[#eaf7fb] text-[#1687b6]"
                    }`}
                  >
                    {room.initial}
                  </div>
                </div>

                {/* Message information */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`truncate text-sm ${
                        room?.lastMessage && room?.lastMessage?.isRead
                          ? "font-bold text-[#001625]"
                          : "font-semibold text-[#001625]"
                      }`}
                    >
                      {room?.user?.firstName} {room?.user?.lastName}
                    </p>

                    <span
                      className={`shrink-0 text-[10px] ${
                        room?.lastMessage && !room?.lastMessage?.isRead
                          ? "font-semibold text-[#1687b6]"
                          : "text-slate-400"
                      }`}
                    >
                      {getChatTime(room?.lastMessage?.createdAt!)}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p
                      className={`truncate text-xs ${
                        room?.lastMessage && !room?.lastMessage?.isRead
                          ? "font-medium text-slate-600"
                          : "text-slate-500"
                      }`}
                    >
                      {room?.lastMessage?.text}
                    </p>

                    {room?.lastMessage && !room?.lastMessage?.isRead && (
                      <span className="flex h-3 min-w-3 shrink-0 items-center justify-center rounded-full bg-[#122560] px-1.5 text-[10px] font-bold text-white"></span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf7fb] text-[#1687b6]">
              <MessageCircle size={21} />
            </div>

            <p className="mt-3 text-sm font-semibold text-[#001625]">
              No conversations found
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Try searching for a different conversation.
            </p>
          </div>
        )}
      </div>

      {/* Sidebar footer */}
      <div className="border-t border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#1687b6] shadow-sm">
            <CheckCheck size={17} />
          </div>

          <div>
            <p className="text-xs font-semibold text-[#001625]">
              You're all caught up
            </p>

            <p className="text-[11px] text-slate-500">
              Your messages are up to date.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SideBar;
