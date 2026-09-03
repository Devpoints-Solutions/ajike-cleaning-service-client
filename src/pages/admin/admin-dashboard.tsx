import AdminRecentServices from "./admin-recent-services";
import Visualizer from "./visualizer";
import AdminDashboardLayout from "./admin-dashboard-layout";

function AdminDashboard() {
  return (
    <AdminDashboardLayout>
      <div data-tour="admin-overview" className="admin-page">
        <AdminRecentServices />
        <Visualizer />
      </div>
    </AdminDashboardLayout>
  );
}

export default AdminDashboard;
