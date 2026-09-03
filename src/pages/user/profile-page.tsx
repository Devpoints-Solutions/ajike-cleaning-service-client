import DashboardLayout from "./dashboard-layout";
import { useAuthContext } from "@/features/contexts/auth-context";

function ProfilePage() {
  const { currentUser, isAuthenticated } = useAuthContext();
  return (
    <DashboardLayout>
      <h1>User profile</h1>
    </DashboardLayout>
  );
}

export default ProfilePage;
