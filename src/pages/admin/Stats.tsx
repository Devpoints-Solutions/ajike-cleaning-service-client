import {
  TrendingUp,
  Activity,
  CircleDollarSign,
  UserCheck,
} from "lucide-react";

function Stats() {
  return (
    <section
      className="admin-kpi-grid w-full self-start lg:sticky lg:top-[0] lg:self-start bg-[#ffffff] z-50 py-5 px-5 rounded-2xl"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <article className="admin-kpi kpi-navy">
        <span>Today's visits</span>
        <strong>08</strong>
        <small>
          <TrendingUp size={12} /> 2 ahead of yesterday
        </small>
      </article>
      <article className="admin-kpi">
        <span>Open requests</span>
        <strong>17</strong>
        <small>
          <Activity size={12} /> 5 need a response
        </small>
      </article>
      <article className="admin-kpi">
        <span>Quote value</span>
        <strong>$4,860</strong>
        <small>
          <CircleDollarSign size={12} /> $1,240 awaiting reply
        </small>
      </article>
      <article className="admin-kpi kpi-sky">
        <span>Coverage today</span>
        <strong>92%</strong>
        <small>
          <UserCheck size={12} /> 11 of 12 routes staffed
        </small>
      </article>
    </section>
  );
}

export default Stats;
