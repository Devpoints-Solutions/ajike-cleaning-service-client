import { useLocation } from "wouter";
import AppRoutes from "./app-routes";
import Header from "./header";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import PageMetadata from "@/components/common/page-metadata";

const pageMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Ajike Pest Control & Cleaning | Home",
    description:
      "Reliable pest control and cleaning for homes and businesses, with clear pricing and proof of the work when we are done.",
  },
  "/about": {
    title: "Ajike Pest Control & Cleaning | About",
    description:
      "Learn how Ajike brings pest control and cleaning together through a calm, careful, and transparent service process.",
  },
  "/services": {
    title: "Ajike Pest Control & Cleaning | Services",
    description:
      "Explore dependable pest control and cleaning services for homes, businesses, and the spaces that matter to you.",
  },
  "/pricing": {
    title: "Ajike Pest Control & Cleaning | Pricing",
    description:
      "See straightforward Ajike service pricing and request a clear quote before work begins.",
  },
  "/contact": {
    title: "Ajike Pest Control & Cleaning | Contact",
    description:
      "Get in touch with the Ajike team to discuss pest control, cleaning, and the right care for your space.",
  },
  "/terms": {
    title: "Ajike | Terms and Conditions",
    description:
      "Read the terms that apply when you use Ajike Pest Control and Cleaning Services.",
  },
  "/privacy-policy": {
    title: "Ajike | Privacy Policy",
    description:
      "Learn how Ajike collects, uses, and protects information for your account and services.",
  },
  "/auth/sign-in": {
    title: "Ajike | Sign In",
    description:
      "Sign in to your Ajike account to manage service requests, visits, and service records.",
  },
  "/auth/sign-up": {
    title: "Ajike | Sign Up",
    description:
      "Create an Ajike account to request services, manage recurring plans, and keep your service details together.",
  },
  "/auth/verify": {
    title: "Ajike | Verify Account",
    description:
      "Verify your Ajike account to keep your service requests and property details secure.",
  },
  "/auth/forgot-password": {
    title: "Ajike | Forgot Password",
    description:
      "Recover access to your Ajike account with a simple email verification process.",
  },
  "/auth/reset-password": {
    title: "Ajike | Reset Password",
    description:
      "Set a new password for your Ajike account and get back to managing your services.",
  },
  "/dashboard": {
    title: "Ajike | Dashboard",
    description:
      "Manage your Ajike service requests, upcoming visits, and service history.",
  },
  "/dashboard/profile": {
    title: "Ajike | Profile",
    description: "Review and update your Ajike account details.",
  },
  "/dashboard/services": {
    title: "Ajike | My Services",
    description:
      "View and manage your Ajike service requests and scheduled services.",
  },
  "/dashboard/payments": {
    title: "Ajike | Payment History",
    description: "Review your Ajike payment history and service transactions.",
  },
  "/admin/dashboard": {
    title: "Ajike | Admin Dashboard",
    description:
      "Manage Ajike services, customers, and operations from one dashboard.",
  },
  "/admin/dashboard/profile": {
    title: "Ajike | Admin Profile",
    description: "Profile details of admin user.",
  },
  "/admin/dashboard/messages": {
    title: "Ajike | Messages",
    description: "Manage customer conversations and support messages in Ajike.",
  },
  "/admin/dashboard/services": {
    title: "Ajike | Admin Services",
    description: "Manage the services offered through the Ajike platform.",
  },
  "/admin/dashboard/customers": {
    title: "Ajike | Customers",
    description: "View and manage Ajike customers and their service activity.",
  },

  "/admin/dashboard/reviews": {
    title: "Ajike | Customer Reviews",
    description:
      "View all what customers are saying about Ajike cleaning service",
  },

  "/dashboard/pending-reviews": {
    title: "Ajike | Pending Reviews",
    description:
      "Give your honest feedback on your overall experience with Aike pest control and cleaning service",
  },
};

function getPageMetadata(pathname: string) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const metadata = pageMetadata[normalizedPath];

  if (metadata) {
    return metadata;
  }

  const serviceMatch = normalizedPath.match(/^\/services\/([^/]+)$/);

  if (serviceMatch) {
    const serviceName = decodeURIComponent(serviceMatch[1])
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());

    return {
      title: `Ajike | ${serviceName}`,
      description: `Learn more about Ajike's ${serviceName.toLowerCase()} service and request dependable care for your space.`,
    };
  }

  if (normalizedPath.startsWith("/dashboard/services/")) {
    return {
      title: "Ajike | Service Details",
      description:
        "Review the details and status of your Ajike service request.",
    };
  }

  if (normalizedPath.startsWith("/admin/dashboard/services/")) {
    return {
      title: "Ajike | Admin Service Details",
      description: "Review and manage the details of an Ajike service request.",
    };
  }

  if (normalizedPath.startsWith("/admin/dashboard/messages/")) {
    return {
      title: "Ajike | Customer Conversation",
      description: "View and respond to an Ajike customer conversation.",
    };
  }

  if (normalizedPath.startsWith("/admin/dashboard/customers/")) {
    return {
      title: "Ajike | Customer Details",
      description: "Profile details of a customer",
    };
  }

  return {
    title: "Ajike | Page Not Found",
    description:
      "The Ajike page you are looking for could not be found. Return home to explore our services.",
  };
}

function Layout() {
  const [pathname] = useLocation();
  const metadata = getPageMetadata(pathname);

  return (
    <>
      <PageMetadata {...metadata} />
      {!["auth", "dashboard", "admin"].includes(pathname.split("/")[1]) && (
        <Header onRequest={() => {}} />
      )}

      <AppRoutes />

      {pathname === "/" ||
      pathname === "/services" ||
      pathname === "/pricing" ||
      pathname === "/about" ||
      pathname === "/contact" ||
      pathname === "/terms" ||
      pathname === "/privacy-policy" ||
      pathname === `/services/${pathname.split("/")[2]}` ? (
        <Footer />
      ) : null}

      <Toaster />
    </>
  );
}

export default Layout;
