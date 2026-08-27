function StatCard({ icon: Icon, label, value, description }: any) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,22,37,0.03)] transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf7fb] text-[#1687b6]">
          <Icon size={18} />
        </div>

        <span className="text-xs font-medium text-slate-400">Overview</span>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <span className="mt-1 block text-2xl font-bold tracking-tight">
          {value}
        </span>

        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

export default StatCard;
