import { Link } from "wouter";
import { useDashboardContext } from "@/features/contexts/dashboard-context";

const NavItem = ({ item, Icon }: { item: any; Icon: any }) => {
  const { handleNavigation, activeItem, collapsed } = useDashboardContext();

  const active = activeItem === item.label;

  return (
    <Link
      href={item.href}
      onClick={() => handleNavigation(item.label)}
      title={collapsed ? item.label : undefined}
      className={`
        group
        flex
        items-center
        rounded-xl
        py-3
        text-sm
        transition-all
        duration-200
        font-bold
        ${collapsed ? "justify-center px-0" : "gap-3 px-3.5"}
        ${
          active
            ? "bg-[#122560] text-[#ffffff]"
            : "text-slate-600 hover:bg-[#dff3fa] hover:text-[#101827]"
        }
      `}
    >
      {/* Icon */}
      <Icon
        size={22}
        strokeWidth={active ? 2.2 : 1.8}
        className={`
          shrink-0
          ${
            active
              ? "text-[#1687b6]"
              : "text-slate-400 group-hover:text-slate-600"
          }
        `}
      />

      {/* Label */}
      {!collapsed && (
        <span className="flex-1 whitespace-nowrap">{item.label}</span>
      )}

      {/* Badge */}
      {!collapsed && item.badge && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#009b5a] px-1.5 text-[10px] font-bold text-white">
          {item.badge}
        </span>
      )}

      {/* Collapsed badge */}
      {collapsed && item.badge && (
        <span className="absolute ml-7 mt-[-20px] flex h-2 w-2 rounded-full bg-[#009b5a]" />
      )}
    </Link>
  );
};

export default NavItem;
