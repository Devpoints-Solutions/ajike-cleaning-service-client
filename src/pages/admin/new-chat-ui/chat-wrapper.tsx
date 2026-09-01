import { useState, type ReactNode } from "react";
import { PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import AdminDashboardLayout from "../admin-dashboard-layout";
import SideBar from "./side-bar";

export default function ChatWrapper({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile] = useState(false);

  return (
    <AdminDashboardLayout>
      <div className="flex h-[100dvh] w-full bg-background overflow-hidden">
        <SideBar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          isMobile={isMobile}
        />

        <main className="flex-1 flex flex-col relative min-w-0">
          <header className="absolute top-0 left-0 right-0 z-10 p-2 flex items-center bg-gradient-to-b from-background via-background/90 to-transparent pb-6 pointer-events-none">
            <div className="pointer-events-auto">
              <AnimatePresence>
                {!sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSidebarOpen(true)}
                      className="h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl bg-background/50 backdrop-blur-sm"
                    >
                      <PanelLeftOpen size={18} />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </header>

          {children}
        </main>
      </div>
    </AdminDashboardLayout>
  );
}
