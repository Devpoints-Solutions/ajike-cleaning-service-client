import AdminDashboardLayout from "./admin-dashboard-layout";
import { useAuthContext } from "@/features/contexts/auth-context";

function AdminProfilePage() {
  const { currentUser, isAuthenticated } = useAuthContext();
  return (
    <AdminDashboardLayout>
      <h1>Admin profile</h1>
    </AdminDashboardLayout>
  );
}

export default AdminProfilePage;
