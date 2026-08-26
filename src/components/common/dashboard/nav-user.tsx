import { ChevronDown } from "lucide-react";
import { useAuthContext } from "@/features/contexts/auth-context";

function NavUser({ collapsed }: { collapsed: boolean }) {
  const { isAuthenticated, currentUser } = useAuthContext();

  return (
    <div
      className={`
            border-t
            border-slate-100
            p-3
            transition-all
            duration-300
            ${collapsed ? "flex justify-center" : ""}
          `}
    >
      <button
        type="button"
        className={`
              flex
              items-center
              rounded-xl
              p-2.5
              text-left
              transition
              hover:bg-slate-50
              ${collapsed ? "justify-center" : "w-full gap-3"}
            `}
      >
        {/* Avatar */}
        <img
          src={
            currentUser?.picture
              ? currentUser?.picture
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHT9AzDJrgdZBGM9hR4nILN8rWEl8tsnhsV33iNSNK-I8144nGj-QR6dk&s=10"
          }
          alt="John Doe"
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />

        {/* User details */}
        <div
          className={`
                min-w-0
                flex-1
                transition-all
                duration-200
                ${collapsed ? "hidden" : "block"}
              `}
        >
          <p className="truncate text-sm font-semibold text-[#101827]">
            {currentUser?.firstName} {currentUser?.lastName}
          </p>

          <p className="truncate text-xs text-slate-500">
            {currentUser?.role === "admin"
              ? "Administrator"
              : currentUser?.email}
          </p>
        </div>

        {!collapsed && (
          <ChevronDown size={17} className="shrink-0 text-slate-400" />
        )}
      </button>
    </div>
  );
}

export default NavUser;
