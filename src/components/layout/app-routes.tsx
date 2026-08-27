import { Route, Switch, useLocation } from "wouter";
import { ErrorBoundary } from "@/components/error-boundary";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home/home-page";
import About from "@/pages/about/about-page";
import Services from "@/pages/services/services";
import Pricing from "@/pages/pricing/pricing-page";
import Dashboard from "@/pages/user/dashboard";
import UserActiveSchedules from "@/pages/user/user-active-schedules";
import AdminDashboard from "@/pages/admin/admin-dashboard";
import AdminChatPage from "@/pages/admin/chat-page";
import AdminScheduleDetails from "@/pages/admin/admin-schedule-details";
import UserServiceDetails from "@/pages/user/user-service-details";
import SignIn from "@/pages/auth/signin";
import SignUp from "@/pages/auth/signup";
import Verify from "@/pages/auth/verify";
import ForgotPassword from "@/pages/auth/forgot-password";
import ResetPassword from "@/pages/auth/reset-password";
import Chat from "@/pages/user/chat";
import ContactPage from "@/pages/contact/contact-page";
import { RequireAuth } from "@/features/contexts/auth-context";
import { useAuthContext } from "@/features/contexts/auth-context";
import { useServiceContext } from "@/features/contexts/service-context";
import ServiceDetails from "@/pages/services/service-details";
import PaymentHistory from "@/pages/user/payments-history";
import NewRequestModal from "../common/request-modal/new-request-modal";
import { DashboardContextProvider } from "@/features/contexts/dashboard-context";
import ScrollToTop from "./scroll-to-top";

function AppRoutes() {
  const [location] = useLocation();

  const { isAuthenticated, currentUser } = useAuthContext();
  const { newModalIsOpen } = useServiceContext();

  return (
    <div className="app-shell">
      <ScrollToTop />
      <ErrorBoundary resetKey={location}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="services/:title" component={ServiceDetails} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/auth/sign-in" component={SignIn} />
          <Route path="/auth/sign-up" component={SignUp} />
          <Route path="/auth/verify" component={Verify} />
          <Route path="/auth/forgot-password" component={ForgotPassword} />
          <Route path="/auth/reset-password" component={ResetPassword} />

          <RequireAuth>
            <DashboardContextProvider>
              <Route path="/dashboard" component={Dashboard} />
              <Route
                path="/dashboard/services"
                component={UserActiveSchedules}
              />

              <Route path="/dashboard/payments" component={PaymentHistory} />
              <Route
                path="/dashboard/services/:id"
                component={UserServiceDetails}
              />

              <Route path="/admin/dashboard" component={AdminDashboard} />

              <Route
                path="/admin/dashboard/messages"
                component={AdminChatPage}
              />
              <Route
                path="/admin/dashboard/schedules/:id"
                component={AdminScheduleDetails}
              />
            </DashboardContextProvider>
          </RequireAuth>
          <Route component={NotFound} />
        </Switch>
      </ErrorBoundary>
      {isAuthenticated && currentUser && currentUser?.role === "user" && (
        <>
          <Chat />

          {newModalIsOpen && <NewRequestModal />}
        </>
      )}
    </div>
  );
}

export default AppRoutes;
