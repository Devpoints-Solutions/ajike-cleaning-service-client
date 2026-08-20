import { RefreshCw, MessageSquare, ClipboardCheck } from "lucide-react";
import { Link } from "wouter";

function AdminTop() {
  return (
    <div className="admin-top">
      <div>
        <div className="eyebrow">Operations console / Tuesday 17 June</div>
        <h1>Keep the field moving.</h1>
        <p>
          Today\u2019s service board, coverage, and proof in one working view.
        </p>
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
