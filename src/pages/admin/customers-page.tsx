import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Mail,
  Phone,
  Search,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import { useAdminServiceContext } from "@/features/contexts/admin-service-context";
import AdminDashboardLayout from "./admin-dashboard-layout";

function CustomersPage() {
  const { users, services } = useAdminServiceContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | "user" | "admin">("All");

  const filteredUsers = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesRole =
        roleFilter === "All" || (user.role || "user") === roleFilter;
      const matchesSearch =
        value.length === 0 ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.phoneNumber.toLowerCase().includes(value);

      return matchesRole && matchesSearch;
    });
  }, [roleFilter, searchTerm, users]);

  const totalAdmins = users.filter(
    (user) => (user.role || "user") === "admin",
  ).length;
  const totalCustomers = users.filter(
    (user) => (user.role || "user") !== "admin",
  ).length;
  const totalServiceRequests = services.length;

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();

  const getServiceCount = (email: string) =>
    services.filter(
      (service) =>
        service?.user?.email === email || service?.customer?.email === email,
    ).length;

  return (
    <AdminDashboardLayout>
      <main className="dashboard-wrap">
        <div className="active-schedules-header">
          <div>
            <div className="eyebrow">Customer directory</div>
            <p className="font-semibold text-[#122560]">
              Manage all registered users and review their account details.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="admin-panel rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="panel-label">Total users</span>
              <Users size={16} className="text-[#1687b6]" />
            </div>
            <h3 className="mt-4 text-3xl font-extrabold text-[#001625]">
              {users.length}
            </h3>
            <p className="mt-1 text-sm text-[#587285]">
              All registered accounts
            </p>
          </article>

          <article className="admin-panel rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="panel-label">Customers</span>
              <UserRound size={16} className="text-[#1687b6]" />
            </div>
            <h3 className="mt-4 text-3xl font-extrabold text-[#001625]">
              {totalCustomers}
            </h3>
            <p className="mt-1 text-sm text-[#587285]">
              Standard customer accounts
            </p>
          </article>

          <article className="admin-panel rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="panel-label">Admins</span>
              <ShieldCheck size={16} className="text-[#1687b6]" />
            </div>
            <h3 className="mt-4 text-3xl font-extrabold text-[#001625]">
              {totalAdmins}
            </h3>
            <p className="mt-1 text-sm text-[#587285]">
              Account administrators
            </p>
          </article>

          <article className="admin-panel rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="panel-label">Service requests</span>
              <ArrowUpRight size={16} className="text-[#1687b6]" />
            </div>
            <h3 className="mt-4 text-3xl font-extrabold text-[#001625]">
              {totalServiceRequests}
            </h3>
            <p className="mt-1 text-sm text-[#587285]">Across all users</p>
          </article>
        </div>

        <section className="admin-panel mt-6">
          <div className="admin-panel-head">
            <div>
              <span className="panel-label">Accounts</span>
              <h2>Users overview</h2>
            </div>
            <span className="rounded-full bg-[#eaf7fb] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1687b6]">
              {filteredUsers.length} results
            </span>
          </div>

          <div className="admin-filter-row">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#d7ebf5] bg-[#f8fcff] px-3 py-2.5 text-[#587285] shadow-[0_2px_10px_rgba(8,52,80,0.02)]">
              <Search size={16} className="text-[#1687b6]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, email or phone"
                className="w-full bg-transparent text-sm text-[#173f5b] placeholder:text-[#6d8699] focus:outline-none"
                aria-label="Search users"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(event) =>
                setRoleFilter(event.target.value as "All" | "user" | "admin")
              }
              className="min-w-[150px] rounded-xl border border-[#d7ebf5] bg-[#f8fcff] px-3 py-2.5 text-sm font-medium text-[#173f5b] outline-none"
            >
              <option value="All">All roles</option>
              <option value="user">Customers</option>
              <option value="admin">Admins</option>
            </select>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="active-schedules-empty my-5 rounded-2xl border border-dashed border-[#cfe3ef] bg-[#f8fbfd]">
              <UserRound size={40} />
              <h3>No users found</h3>
              <p>Try another search term or switch role filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-separate border-spacing-y-3 pt-2 text-left">
                <thead>
                  <tr className="text-xs font-bold uppercase tracking-[0.12em] text-[#587285]">
                    <th className="px-3 pb-2">User</th>
                    <th className="px-3 pb-2">Email</th>
                    <th className="px-3 pb-2">Phone</th>
                    <th className="px-3 pb-2">Role</th>
                    <th className="px-3 pb-2">Requests</th>
                    <th className="px-3 pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => {
                    const role = user.role || "user";
                    const status = role === "admin" ? "Admin" : "Active";
                    const initials = getInitials(user.firstName, user.lastName);
                    const serviceCount = getServiceCount(user.email);

                    return (
                      <tr
                        key={`${user.email}-${index}`}
                        className="rounded-2xl bg-[#f9fbfd] shadow-[0_8px_18px_rgba(9,51,80,0.04)]"
                      >
                        <td className="rounded-l-2xl px-3 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dff5ff] text-sm font-extrabold text-[#0d5576]">
                              {initials}
                            </div>
                            <div>
                              <p className="font-bold text-[#001625]">
                                {user.firstName} {user.lastName}
                              </p>
                              <p className="text-xs text-[#587285]">
                                Customer #{String(index + 1).padStart(3, "0")}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-4 align-middle text-sm text-[#244d68]">
                          <span className="inline-flex items-center gap-2">
                            <Mail size={14} className="text-[#1687b6]" />
                            {user.email}
                          </span>
                        </td>

                        <td className="px-3 py-4 align-middle text-sm text-[#244d68]">
                          <span className="inline-flex items-center gap-2">
                            <Phone size={14} className="text-[#1687b6]" />
                            {user.phoneNumber}
                          </span>
                        </td>

                        <td className="px-3 py-4 align-middle">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                              role === "admin"
                                ? "bg-[#eaf7fb] text-[#0f6d90]"
                                : "bg-[#edf9f0] text-[#206c4d]"
                            }`}
                          >
                            {role === "admin" ? (
                              <ShieldCheck size={12} />
                            ) : (
                              <UserRound size={12} />
                            )}
                            {role}
                          </span>
                        </td>

                        <td className="px-3 py-4 align-middle text-sm font-semibold text-[#173f5b]">
                          {serviceCount}
                        </td>

                        <td className="rounded-r-2xl px-3 py-4 align-middle">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                              status === "Admin"
                                ? "bg-[#edf7ff] text-[#1d5b8f]"
                                : "bg-[#eafbf0] text-[#236c47]"
                            }`}
                          >
                            <BadgeCheck size={12} />
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </AdminDashboardLayout>
  );
}

export default CustomersPage;
