import { Route, Switch, useLocation } from "wouter";
import { ErrorBoundary } from "@/components/error-boundary";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home/home-page";
import About from "@/pages/home/about-page";
import Services from "@/pages/home/services";
import Pricing from "@/pages/home/pricing";
import Dashboard from "@/pages/user/dashboard";
import AdminDashboard from "@/pages/admin/admin-dashboard";
import AdminChatPage from "@/pages/admin/chat-page";
import SignIn from "@/pages/auth/signin";
import SignUp from "@/pages/auth/signup";
import Verify from "@/pages/auth/verify";
import ForgotPassword from "@/pages/auth/forgot-password";
import ResetPassword from "@/pages/auth/reset-password";
import Chat from "@/pages/home/chat";

function AppRoutes() {
  const [location] = useLocation();
  return (
    <div className="app-shell">
      <ErrorBoundary resetKey={location}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/admin/chat" component={AdminChatPage} />
          <Route path="/auth/sign-in" component={SignIn} />
          <Route path="/auth/sign-up" component={SignUp} />
          <Route path="/auth/verify" component={Verify} />
          <Route path="/auth/forgot-password" component={ForgotPassword} />
          <Route path="/auth/reset-password" component={ResetPassword} />
          <Route component={NotFound} />
        </Switch>
      </ErrorBoundary>
      <Chat />
    </div>
  );
}

export default AppRoutes;
