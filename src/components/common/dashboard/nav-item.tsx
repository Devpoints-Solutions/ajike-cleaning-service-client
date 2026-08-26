import { Link } from "wouter";

const NavItem = ({
  item,
  Icon,
  active,
  collapsed,
  onNavigate,
}: {
  item: any;
  Icon: any;
  active: any;
  collapsed: boolean;
  onNavigate: (label: string) => void;
}) => {
  return (
    <Link
      href={item.href}
      onClick={() => onNavigate(item.label)}
      title={collapsed ? item.label : undefined}
      className={`
        group
        flex
        items-center
        rounded-xl
        py-3
        text-sm
        font-medium
        transition-all
        duration-200
        ${collapsed ? "justify-center px-0" : "gap-3 px-3.5"}
        ${
          active
            ? "bg-[#001625] text-[#1687b6]"
            : "text-slate-600 hover:bg-slate-50 hover:text-[#101827]"
        }
      `}
    >
      {/* Icon */}
      <Icon
        size={19}
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
