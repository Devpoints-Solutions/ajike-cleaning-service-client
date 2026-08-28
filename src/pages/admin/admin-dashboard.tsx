import AdminServices from "./admin-services";
import Stats from "./Stats";
import Visualizer from "./visualizer";
import AdminDashboardLayout from "./admin-dashboard-layout";

function AdminDashboard() {
  return (
    <AdminDashboardLayout>
      <div className="admin-page">
        <Stats />
        <AdminServices />
        <Visualizer />
      </div>
    </AdminDashboardLayout>
  );
}

export default AdminDashboard;
