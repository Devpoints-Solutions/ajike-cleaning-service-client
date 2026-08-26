import ServiceIcon from "../service-icon";

function ServiceSelector({ item, selected, onClick }: any) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-4 rounded-[20px] border px-4 py-4 text-left transition-all duration-200 sm:px-5 ${
        selected
          ? "border-[#1687b6] bg-[#1687b6]/5 shadow-sm"
          : "border-[#cbd7e3] bg-white hover:border-[#1687b6]/60"
      }`}
    >
      {/* Icon */}
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors ${
          selected
            ? "bg-[#1687b6]/10 text-[#1687b6]"
            : "bg-[#f3f6f8] text-[#53657a] group-hover:text-[#1687b6]"
        }`}
      >
        {typeof Icon === "string" ? (
          <ServiceIcon kind={Icon} size={21} />
        ) : (
          <Icon size={21} strokeWidth={1.8} />
        )}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-semibold leading-5 text-[#001625]">
          {item.name}
        </h3>

        <p className="mt-0.5 text-[13px] leading-5 text-[#53657a]">
          {item.detail}
        </p>
      </div>

      {/* Radio */}
      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
          selected
            ? "border-[#1687b6]"
            : "border-[#8fa4b8] group-hover:border-[#1687b6]"
        }`}
      >
        {selected && <div className="h-2.5 w-2.5 rounded-full bg-[#1687b6]" />}
      </div>
    </button>
  );
}

export default ServiceSelector;
