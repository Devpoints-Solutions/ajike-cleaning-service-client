import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  MessageCircle,
  Search,
  Sparkles,
  Star,
  ThumbsUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import AdminDashboardLayout from "./admin-dashboard-layout";

type Review = {
  id: number;
  customer: string;
  initials: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  responded: boolean;
  accent: string;
};

const reviews: Review[] = [
  {
    id: 1,
    customer: "Amelia Hart",
    initials: "AH",
    service: "Deep home cleaning",
    rating: 5,
    date: "Aug 28, 2025",
    comment:
      "The team was thoughtful, thorough, and left every room feeling brand new. I especially appreciated the care around the small details.",
    responded: true,
    accent: "bg-[#d9f2ed] text-[#14745e]",
  },
  {
    id: 2,
    customer: "Marcus Okafor",
    initials: "MO",
    service: "Pest control visit",
    rating: 5,
    date: "Aug 24, 2025",
    comment:
      "Super clear communication from booking to completion. The technician arrived on time and explained what had been done before leaving.",
    responded: true,
    accent: "bg-[#dcecf8] text-[#14638a]",
  },
  {
    id: 3,
    customer: "Sofia Bennett",
    initials: "SB",
    service: "Move-out cleaning",
    rating: 4,
    date: "Aug 19, 2025",
    comment:
      "Really happy with the result and the friendly service. A couple of spots needed a second look, but the team resolved it quickly.",
    responded: true,
    accent: "bg-[#fff0d8] text-[#9b6414]",
  },
  {
    id: 4,
    customer: "Daniel Reed",
    initials: "DR",
    service: "Recurring home cleaning",
    rating: 5,
    date: "Aug 14, 2025",
    comment:
      "Our weekly visits have made such a difference. The quality is consistent and the whole experience feels wonderfully effortless.",
    responded: false,
    accent: "bg-[#e7e0f7] text-[#665099]",
  },
  {
    id: 5,
    customer: "Priya Shah",
    initials: "PS",
    service: "Kitchen deep clean",
    rating: 3,
    date: "Aug 08, 2025",
    comment:
      "The main areas looked good. I would have liked a little more detail in the corners and around the appliances.",
    responded: false,
    accent: "bg-[#f8dfe4] text-[#a64c63]",
  },
];

const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
  rating,
  count: reviews.filter((review) => review.rating === rating).length,
}));

const metricCards: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}[] = [
  { label: "Total reviews", value: reviews.length, icon: MessageCircle, color: "bg-[#e3f5f8] text-[#1687b6]" },
  { label: "5-star moments", value: ratingDistribution[0].count, icon: Star, color: "bg-[#fff2d9] text-[#b77a19]" },
  {
    label: "Response rate",
    value: `${(reviews.filter((review) => review.responded).length / reviews.length) * 100}%`,
    icon: CheckCircle2,
    color: "bg-[#e3f3eb] text-[#14745e]",
  },
  { label: "This month", value: "+18%", icon: Sparkles, color: "bg-[#eee8fa] text-[#665099]" },
];

function CustomersReviews() {
  const [ratingFilter, setRatingFilter] = useState<"All" | number>("All");
  const [search, setSearch] = useState("");

  const averageRating =
    reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
  const shownReviews = useMemo(() => {
    const query = search.trim().toLowerCase();
    return reviews.filter(
      (review) =>
        (ratingFilter === "All" || review.rating === ratingFilter) &&
        (!query ||
          `${review.customer} ${review.service} ${review.comment}`
            .toLowerCase()
            .includes(query)),
    );
  }, [ratingFilter, search]);

  return (
    <AdminDashboardLayout>
      <main className="dashboard-wrap">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="eyebrow">Customer voice</div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#122560]">
              Customers reviews
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[#678391]">
              A pulse check on the care your team delivers, one visit at a time.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start rounded-full bg-[#e2f5f8] px-3 py-2 text-xs font-bold text-[#167798] sm:self-auto">
            <Sparkles size={14} />
            Live customer pulse
          </div>
        </div>

        <section className="mb-5 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="overflow-hidden rounded-2xl bg-[#122560] p-5 text-white shadow-sm sm:p-6">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#a3dced]">
                  Overall experience
                </span>
                <div className="mt-2 flex items-end gap-3">
                  <strong className="text-5xl font-bold tracking-tight">
                    {averageRating.toFixed(1)}
                  </strong>
                  <span className="mb-2 text-sm text-[#b8dfeb]">out of 5</span>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[#ffd36a]">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} size={16} fill="currentColor" />
                  ))}
                  <span className="ml-2 text-xs text-[#b8dfeb]">
                    {reviews.length} verified reviews
                  </span>
                </div>
              </div>
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-[#1d3a73]">
                <div
                  className="absolute inset-2 rounded-full"
                  style={{
                    background: `conic-gradient(#52c7d8 ${averageRating * 20}%, #315187 0)`,
                  }}
                />
                <div className="relative flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[#122560]">
                  <ThumbsUp size={17} className="text-[#a3dced]" />
                  <span className="mt-1 text-[0.62rem] font-bold text-[#b8dfeb]">
                    Excellent
                  </span>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-[#cce2e9] bg-[#fbfdfe] p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="panel-label">Rating spread</span>
                <h3 className="mt-2 text-base font-bold text-[#123f5d]">
                  Where the stars land
                </h3>
              </div>
              <Star size={18} className="text-[#f0b341]" fill="currentColor" />
            </div>
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count }) => (
                <div key={rating} className="flex items-center gap-2 text-xs">
                  <span className="flex w-7 items-center gap-1 font-bold text-[#678391]">
                    {rating} <Star size={11} className="text-[#f0b341]" fill="currentColor" />
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#e6f0f3]">
                    <div
                      className="h-full rounded-full bg-[#51bfd0]"
                      style={{ width: `${(count / reviews.length) * 100}%` }}
                    />
                  </div>
                  <span className="w-5 text-right font-bold text-[#123f5d]">{count}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metricCards.map(({ label, value, icon: Icon, color }) => (
            <article key={String(label)} className="rounded-2xl border border-[#cce2e9] bg-white p-4 shadow-sm">
              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
                <Icon size={17} />
              </div>
              <strong className="block text-xl font-bold text-[#123f5d]">{value}</strong>
              <span className="mt-1 block text-[0.65rem] font-bold uppercase tracking-wide text-[#7893a0]">
                {label}
              </span>
            </article>
          ))}
        </section>

        <section className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <span className="panel-label">Feedback inbox</span>
              <h2>Recent customer notes</h2>
            </div>
            <span className="live-dot">Updated today</span>
          </div>

          <div className="admin-filter-row flex-col items-stretch sm:flex-row">
            <div className="admin-filter-tabs">
              {(["All", 5, 4, 3] as const).map((item) => (
                <button
                  key={item}
                  className={ratingFilter === item ? "active" : ""}
                  onClick={() => setRatingFilter(item)}
                >
                  {item === "All" ? "All reviews" : `${item} stars`}
                </button>
              ))}
            </div>
            <label className="relative block sm:w-56">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7893a0]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search feedback"
                className="w-full rounded-lg border border-[#c8dfe8] bg-white py-2 pl-9 pr-3 text-xs text-[#123f5d] outline-none focus:border-[#4db6ca]"
              />
            </label>
          </div>

          <div className="grid gap-3 pt-3">
            {shownReviews.map((review) => (
              <article key={review.id} className="rounded-xl border border-[#dcebef] bg-white p-4 transition-shadow hover:shadow-sm sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${review.accent}`}>
                      {review.initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#123f5d]">{review.customer}</h3>
                      <p className="mt-1 text-xs text-[#7893a0]">{review.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:text-right">
                    <div className="flex gap-0.5 text-[#f0b341]">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star key={index} size={14} fill={index < review.rating ? "currentColor" : "none"} className={index < review.rating ? "" : "text-[#c9dce2]"} />
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-[0.65rem] text-[#7893a0]">
                      <CalendarDays size={12} /> {review.date}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#4d6d7d]">&ldquo;{review.comment}&rdquo;</p>
                <div className="mt-4 flex items-center justify-between border-t border-[#edf3f5] pt-3">
                  <span className={`flex items-center gap-1 text-[0.65rem] font-bold ${review.responded ? "text-[#168d68]" : "text-[#a16b1d]"}`}>
                    {review.responded ? <CheckCircle2 size={13} /> : <MessageCircle size={13} />}
                    {review.responded ? "Responded" : "Needs a response"}
                  </span>
                  <button className="text-button text-xs">View conversation</button>
                </div>
              </article>
            ))}
            {shownReviews.length === 0 && (
              <div className="admin-empty">
                <Search size={19} />
                <strong>No reviews match those filters.</strong>
                <span>Try another rating or search term.</span>
              </div>
            )}
          </div>
        </section>
      </main>
    </AdminDashboardLayout>
  );
}

export default CustomersReviews;
