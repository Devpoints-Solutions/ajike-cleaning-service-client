import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "@/features/redux/store.tsx";
import { Router as WouterRouter } from "wouter";
import { AuthContextProvider } from "@/features/contexts/auth-context.tsx";
import { ServiceContextProvider } from "./features/contexts/service-context.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AdminContextProvider } from "./features/contexts/admin-service-context.tsx";

import { TooltipProvider } from "@/components/ui/tooltip";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <AdminContextProvider>
          <ServiceContextProvider>
            <TooltipProvider>
              <GoogleOAuthProvider
                clientId={import.meta.env.VITE_APP_GOOGLE_OAUTH_CLIENT_ID!}
              >
                <WouterRouter
                  base={import.meta.env.BASE_URL.replace(/\/$/, "")}
                >
                  <App />
                </WouterRouter>
              </GoogleOAuthProvider>
            </TooltipProvider>
          </ServiceContextProvider>
        </AdminContextProvider>
      </AuthContextProvider>
    </Provider>
  </StrictMode>,
);
