import NavItem from "./nav-item";
import {
  LayoutDashboard,
  Workflow,
  ClipboardList,
  Users,
  MessageSquare,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useAuthContext } from "@/features/contexts/auth-context";

const adminItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    label: "Services",
    icon: ClipboardList,
    href: "/dashboard/services",
  },
  {
    label: "Customers",
    icon: Users,
    href: "/dashboard/customers",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/admin/dashboard/messages",
    badge: 3,
  },
  {
    label: "Payments",
    icon: CreditCard,
    href: "/dashboard/payments",
  },
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
    label: "Payments",
    icon: CreditCard,
    href: "/dashboard/payments",
  },

  {
    label: "Request Service",
    icon: Workflow,
    href: "/dashboard/payments",
  },
];

const bottomItems = [
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    label: "Help & Support",
    icon: HelpCircle,
    href: "/dashboard/help",
  },
];

const NavContent = ({
  activeItem,
  onNavigate,
  collapsed,
}: {
  activeItem: string;
  onNavigate: (label: string) => void;
  collapsed: boolean;
}) => {
  const { isAuthenticated, currentUser, signout } = useAuthContext();

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
              const active = activeItem === item.label;

              return (
                <NavItem
                  key={item.label}
                  item={item}
                  Icon={Icon}
                  active={active}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                />
              );
            })}

          {isAuthenticated &&
            currentUser &&
            currentUser?.role === "user" &&
            userItems.map((item) => {
              const Icon = item.icon;
              const active = activeItem === item.label;

              return (
                <NavItem
                  key={item.label}
                  item={item}
                  Icon={Icon}
                  active={active}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                />
              );
            })}
        </div>
      </div>

      {/* ===================================================
          SUPPORT
      =================================================== */}
      <div className="mt-auto">
        {!collapsed && (
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Support
          </p>
        )}

        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const active = activeItem === item.label;

            return (
              <NavItem
                key={item.label}
                item={item}
                Icon={Icon}
                active={active}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            );
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
            font-medium
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
