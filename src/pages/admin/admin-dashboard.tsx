import AdminTop from "./admin-top";
import Schedules from "./schedules";
import Stats from "./Stats";
import Visualizer from "./visualizer";

function AdminDashboard() {
  return (
    <div className="admin-page">
      <main className="container admin-wrap">
        <AdminTop />
        <Stats />
        <Schedules />
        <Visualizer />
      </main>
    </div>
  );
}

export default AdminDashboard;
