import { Star } from "lucide-react";

export function RatingBar({
  rating,
  count,
  totalReviews,
}: {
  rating: number;
  count: number;
  totalReviews: number;
}) {
  return (
    <div key={rating} className="flex items-center gap-2 text-xs">
      <span className="flex w-7 items-center gap-1 font-bold text-[#678391]">
        {rating}{" "}
        <Star size={11} className="text-[#f0b341]" fill="currentColor" />
      </span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#e6f0f3]">
        {count > 0 ? (
          <div
            className="h-full rounded-full bg-[#51bfd0]"
            style={{ width: `${(count / totalReviews) * 100}%` }}
          />
        ) : (
          <div
            className="h-full rounded-full bg-[#51bfd0]"
            style={{ width: "0%" }}
          />
        )}
      </div>
      <span className="w-5 text-right font-bold text-[#123f5d]">{count}</span>
    </div>
  );
}

export function Metrics({
  label,
  color,
  Icon,
  value,
}: {
  label: string;
  color: string;
  Icon: any;
  value: number | string;
}) {
  return (
    <article
      key={String(label)}
      className="rounded-2xl border border-[#cce2e9] bg-white p-4 shadow-sm"
    >
      <div
        className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${color}`}
      >
        <Icon size={17} />
      </div>
      <strong className="block text-xl font-bold text-[#123f5d]">
        {value}
      </strong>
      <span className="mt-1 block text-[0.65rem] font-bold uppercase tracking-wide text-[#7893a0]">
        {label}
      </span>
    </article>
  );
}
