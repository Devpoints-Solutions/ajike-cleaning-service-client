import NavItem from "./nav-item";
import {
  LayoutDashboard,
  // Workflow,
  ClipboardList,
  Users,
  MessageSquare,
  // CreditCard,
  Settings,
  UserStar,
  UserRound,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useAuthContext } from "@/features/contexts/auth-context";
import { useDashboardContext } from "@/features/contexts/dashboard-context";

const adminItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    label: "Services",
    icon: ClipboardList,
    href: "/admin/dashboard/services",
  },
  {
    label: "Customers",
    icon: Users,
    href: "/admin/dashboard/customers",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/admin/dashboard/messages",
  },

  {
    label: "Customers Reviews",
    icon: UserStar,
    href: "/admin/dashboard/reviews",
  },
  // {
  //   label: "Payments",
  //   icon: CreditCard,
  //   href: "/admin/dashboard/payments",
  // },
];

const userItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Services",
    icon: ClipboardList,
    href: "/dashboard/services",
  },

  {
    label: "Pending reviews",
    icon: UserStar,
    href: "/dashboard/pending-reviews",
  },
  {
    label: "Profile",
    icon: UserRound,
    href: "/dashboard/profile",
  },
];

const userBottomItems = [
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/profile",
  },
  {
    label: "Help & Support",
    icon: HelpCircle,
    href: "#",
  },
];

const adminBottomItems = [
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/dashboard/profile",
  },
  {
    label: "Help & Support",
    icon: HelpCircle,
    href: "#",
  },
];

const NavContent = () => {
  const { isAuthenticated, currentUser, signout } = useAuthContext();
  const { collapsed } = useDashboardContext();

  return (
    <nav className="flex h-full flex-col">
      <div>
        {/* Section title */}
        {!collapsed && (
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Main menu
          </p>
        )}

        <div className="space-y-1">
          {isAuthenticated &&
            currentUser &&
            currentUser?.role === "admin" &&
            adminItems.map((item) => {
              const Icon = item.icon;

              return <NavItem key={item.label} item={item} Icon={Icon} />;
            })}

          {isAuthenticated &&
            currentUser &&
            currentUser?.role === "user" &&
            userItems.map((item) => {
              const Icon = item.icon;

              return <NavItem key={item.label} item={item} Icon={Icon} />;
            })}
        </div>
      </div>

      <div className="mt-auto">
        {!collapsed && (
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Support
          </p>
        )}

        <div className="space-y-1">
          {isAuthenticated &&
            currentUser &&
            currentUser?.role === "user" &&
            userBottomItems.map((item) => {
              const Icon = item.icon;

              return <NavItem key={item.label} item={item} Icon={Icon} />;
            })}

          {isAuthenticated &&
            currentUser &&
            currentUser?.role === "admin" &&
            adminBottomItems.map((item) => {
              const Icon = item.icon;

              return <NavItem key={item.label} item={item} Icon={Icon} />;
            })}
        </div>

        {/* Logout */}
        <button
          onClick={signout}
          type="button"
          className={`
            group
            mt-4
            flex
            w-full
            items-center
            rounded-xl
            px-3.5
            py-3
            text-sm
            font-bold
            text-slate-500
            transition
            hover:bg-red-50
            hover:text-red-600
            ${collapsed ? "justify-center" : "gap-3"}
          `}
          title={collapsed ? "Log out" : undefined}
        >
          <LogOut
            size={19}
            strokeWidth={1.8}
            className="shrink-0 text-slate-400 group-hover:text-red-500"
          />

          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </nav>
  );
};

export default NavContent;
