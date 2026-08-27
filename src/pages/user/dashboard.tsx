import DashboardLayout from "./dashboard-layout";
import QuickActions from "./quick-actions";
import RecurringPlanCard from "./re-occurring-plancard";
import NextVisitCard from "./next-visitcard";
import RecentActivity from "./recent-activitycard";
import SupportCta from "./support-cta";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#f6f9fb] text-[#001625]">
        <main className="mx-auto max-w-[1500px] py-6 lg:py-8">
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <QuickActions />
            <RecurringPlanCard />
            <NextVisitCard />
            <RecentActivity />
          </section>
          <SupportCta />
        </main>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
