import {
  ArrowRight,
  ClipboardList,
  Plus,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useServiceContext } from "@/features/contexts/service-context";
import { useMessages } from "@/features/contexts/message-context";
import { Link } from "wouter";

const quickActions = [
  {
    title: "Start a new request",
    description: "Tell us what service you need",
    icon: Plus,
  },
  {
    title: "View service history",
    description: "Review your previous requests",
    icon: ClipboardList,
  },
  {
    title: "Message the care team",
    description: "Get help from our support team",
    icon: MessageCircle,
  },
];

function QuickActions() {
  const { toggleNewModal } = useServiceContext();
  const { showUserChat, toggleUserChat } = useMessages();
  return (
    <div data-tour="quick-actions" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,22,37,0.03)] sm:p-6">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#1687b6]">
            Quick actions
          </p>

          <h3 className="mt-1 text-lg font-bold">What do you need today?</h3>
        </div>

        <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-[#eaf7fb] text-[#1687b6] sm:flex">
          <Sparkles size={18} />
        </div>
      </div>

      <div className="space-y-3">
        {quickActions.map((action) => {
          const Icon = action.icon;

          if (action?.title === "Message the care team") {
            return (
              <button
                key={action.title}
                onClick={() => {
                  if (showUserChat) return;
                  toggleUserChat();
                }}
                className="group flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left transition-all duration-200 hover:-translate-y-[1px] hover:border-[#1687b6]/40 hover:bg-[#f8fcfd] hover:shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7fb] text-[#1687b6] transition group-hover:bg-[#1687b6] group-hover:text-white">
                  <Icon size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{action.title}</p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {action.description}
                  </p>
                </div>

                <ArrowRight
                  size={17}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#1687b6]"
                />
              </button>
            );
          }

          if (action?.title === "View service history") {
            return (
              <Link
                key={action.title}
                href="/dashboard/services"
                className="group flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left transition-all duration-200 hover:-translate-y-[1px] hover:border-[#1687b6]/40 hover:bg-[#f8fcfd] hover:shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7fb] text-[#1687b6] transition group-hover:bg-[#1687b6] group-hover:text-white">
                  <Icon size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{action.title}</p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {action.description}
                  </p>
                </div>

                <ArrowRight
                  size={17}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#1687b6]"
                />
              </Link>
            );
          }

          if (action?.title === "Start a new request") {
            return (
              <button
                key={action.title}
                onClick={toggleNewModal}
                className="group flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left transition-all duration-200 hover:-translate-y-[1px] hover:border-[#1687b6]/40 hover:bg-[#f8fcfd] hover:shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7fb] text-[#1687b6] transition group-hover:bg-[#1687b6] group-hover:text-white">
                  <Icon size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{action.title}</p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {action.description}
                  </p>
                </div>

                <ArrowRight
                  size={17}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#1687b6]"
                />
              </button>
            );
          }
        })}
      </div>
    </div>
  );
}

export default QuickActions;
