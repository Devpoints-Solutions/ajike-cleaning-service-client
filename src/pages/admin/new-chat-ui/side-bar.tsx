import { motion, AnimatePresence } from "framer-motion";

import { Plus, PanelLeftClose, Bot, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
  onNewChat?: () => void;
}

export function Sidebar({
  isOpen,
  onToggle,
  isMobile,
  onNewChat,
}: SidebarProps) {
  const sidebarVariants = {
    open: {
      x: 0,
      width: isMobile ? "100%" : "260px",
      opacity: 1,
    },
    closed: {
      x: isMobile ? "-100%" : "-100%",
      width: isMobile ? "100%" : "0px",
      opacity: isMobile ? 0 : 1,
    },
  };

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={sidebarVariants}
        initial={isMobile ? "closed" : "open"}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-50 h-[100dvh] shrink-0 overflow-hidden border-r border-border bg-card/90 backdrop-blur-sm md:relative"
      >
        <div className="flex items-center justify-between p-3 pb-2">
          <Button
            variant="outline"
            onClick={onNewChat}
            className="h-10 flex-1 cursor-pointer justify-start gap-2 rounded-lg border-border bg-card px-3 text-foreground hover:bg-muted"
          >
            <Bot size={18} className="text-primary" />
            <span className="text-sm font-medium">New Chat</span>
            <Plus size={16} className="ml-auto text-muted-foreground" />
          </Button>

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="ml-2 h-10 w-10 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <PanelLeftClose size={18} />
            </Button>
          )}
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto overflow-x-hidden p-3 pt-4"></div>

        <div className="space-y-1 border-t border-border p-3">
          <Button
            variant="ghost"
            // onClick={logout}
            className="h-10 w-full cursor-pointer justify-start gap-3 rounded-lg px-3 text-foreground hover:bg-muted"
          >
            <LogOut size={16} />
            <span className="text-sm">Logout</span>
          </Button>
        </div>
      </motion.div>
    </>
  );
}
