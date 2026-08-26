import Schedules from "./schedules";
import Stats from "./Stats";
import Visualizer from "./visualizer";
import AdminDashboardLayout from "./admin-dashboard-layout";

function AdminDashboard() {
  return (
    <AdminDashboardLayout>
      <div className="admin-page">
        <Stats />
        <Schedules />
        <Visualizer />
      </div>
    </AdminDashboardLayout>
  );
}

export default AdminDashboard;
