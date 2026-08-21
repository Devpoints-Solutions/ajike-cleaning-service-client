import {
  RefreshCw,
  MessageSquare,
  ClipboardCheck,
  CalendarClock,
  ClockFading,
} from "lucide-react";
import { useTime } from "@/features/hooks/use-time";
import { getGreeting } from "@/helpers/time";
import { useAuthContext } from "@/features/contexts/auth-context";
import { Link } from "wouter";

function AdminTop() {
  const { isAuthenticated, currentUser } = useAuthContext();
  const { date, seconds, minute, hour } = useTime();

  return (
    <div className="admin-top">
      <div>
        <div className="eyebrow">Operations console</div>
        {isAuthenticated && currentUser && (
          <h1>
            {getGreeting()}, {currentUser?.firstName}
          </h1>
        )}
        <p>Today service board, coverage, and proof in one working view.</p>

        <div className="quick-actions grid-cols-2 mt-5">
          <button className="quick-action">
            <CalendarClock size={16} />
            <p className="font-bold">{date}</p>
          </button>

          <button className="quick-action">
            <ClockFading size={16} />{" "}
            <p className="font-bold">{`${hour}:${minute}:${seconds}`}</p>
          </button>
        </div>
      </div>

      <div className="admin-top-actions">
        <button
          className="secondary-button button-small"
          //   onClick={handleRefresh}
          data-testid="button-refresh-admin"
        >
          <RefreshCw size={14} /> Refresh board
        </button>
        <Link
          href="/admin/chat"
          className="primary-button button-small"
          data-testid="button-view-chats"
        >
          <MessageSquare size={14} /> View Chats
        </Link>
        <button
          className="primary-button button-small"
          //   onClick={() => notify("New request form opened")}
          data-testid="button-admin-new-request"
        >
          <ClipboardCheck size={14} /> New request
        </button>
      </div>
    </div>
  );
}

export default AdminTop;
