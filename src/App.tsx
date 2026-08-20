import Layout from "@/components/layout/layout";
import { MessageProvider } from "@/features/contexts/message-context";

function App() {
  return (
    <MessageProvider>
      <Layout />
    </MessageProvider>
  );
}

export default App;
