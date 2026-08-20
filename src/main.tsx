import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "@/features/redux/store.tsx";
import { Router as WouterRouter } from "wouter";
import { AuthContextProvider } from "@/features/contexts/auth-context.tsx";

import { TooltipProvider } from "@/components/ui/tooltip";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <App />
          </WouterRouter>
        </TooltipProvider>
      </AuthContextProvider>
    </Provider>
  </StrictMode>,
);
