import { motion } from "framer-motion";
import { PanelLeftClose, HatGlasses } from "lucide-react";
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
      <motion.div
        variants={sidebarVariants}
        initial={isMobile ? "closed" : "open"}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed md:relative z-50 h-[100dvh] bg-[#ffffff] flex flex-col bg-sidebar border-r border-sidebar-border overflow-hidden shrink-0`}
      >
        <div className="p-3 pb-2 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onNewChat}
            className="flex-1 cursor-pointer justify-start gap-2 h-10 px-3 bg-sidebar border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg no-default-hover-elevate"
          >
            <span className="font-medium text-sm">Active messages</span>
            <HatGlasses size={16} className="ml-auto text-muted-foreground" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="ml-2 h-10 w-10"
          >
            <PanelLeftClose size={18} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 pt-4 custom-scrollbar"></div>
      </motion.div>
    </>
  );
}
