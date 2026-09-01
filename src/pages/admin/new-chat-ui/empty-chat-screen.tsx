import { Bot } from "lucide-react";
import ChatWrapper from "./chat-wrapper";

function EmptyChatScreen() {
  return (
    <ChatWrapper>
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/10">
          <Bot size={32} className="stroke-[1.5]" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">
          No active message
        </h2>
        <p className="mb-8 max-w-md text-sm text-muted-foreground">
          Select from the list of active messages to reach out to your customers
        </p>
      </div>
    </ChatWrapper>
  );
}

export default EmptyChatScreen;
