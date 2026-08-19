import Layout from "@/components/layout/layout";
import { MessageProvider } from "@/contexts/message-context";

function App() {
  return (
    <MessageProvider>
      <Layout />
    </MessageProvider>
  );
}

export default App;
