import { Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-row items-start gap-3"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm ring-4 ring-primary/10">
        <Bot size={18} />
      </div>

      <div className="flex flex-col items-start">
        <div className="mb-1 px-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Assistant
        </div>
        <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3 shadow-[0_10px_25px_rgba(18,37,96,0.06)]">
          <motion.div
            className="h-2.5 w-2.5 rounded-full bg-primary/45"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              times: [0, 0.5, 1],
            }}
          />
          <motion.div
            className="h-2.5 w-2.5 rounded-full bg-primary/70"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              times: [0, 0.5, 1],
              delay: 0.2,
            }}
          />
          <motion.div
            className="h-2.5 w-2.5 rounded-full bg-primary"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              times: [0, 0.5, 1],
              delay: 0.4,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
