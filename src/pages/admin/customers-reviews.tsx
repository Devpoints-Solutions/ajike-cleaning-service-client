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
import { Link } from "wouter";
import AdminDashboardLayout from "./admin-dashboard-layout";
import { useReviewContext } from "@/features/contexts/review-context";
import { getIsoFullDate } from "@/helpers/time";
import { Metrics, RatingBar } from "./review-components";
import { Loader } from "@/components/common/loader";

function CustomersReviews() {
  const [ratingFilter, setRatingFilter] = useState<"All" | number>("All");
  const [search, setSearch] = useState("");

  const {
    customersReviews,
    reviewStats,
    hasMore,
    onFetchMoreFeedback,
    feedbackIsLoading,
  } = useReviewContext();

  const shownReviews = useMemo(() => {
    const query = search.trim().toLowerCase();
    return customersReviews.filter(
      (review) =>
        (ratingFilter === "All" ||
          review.rating?.toString() === ratingFilter.toString()) &&
        (!query ||
          `${review.user} ${review.service} ${review.text}`
            .toLowerCase()
            .includes(query)),
    );
  }, [ratingFilter, search, customersReviews]);

  return (
    <AdminDashboardLayout>
      <main className="dashboard-wrap">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
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
                    {reviewStats?.averageRating?.toFixed(1)}
                  </strong>
                  <span className="mb-2 text-sm text-[#b8dfeb]">
                    out of {reviewStats?.totalFeedbacks}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[#ffd36a]">
                  {Array.from(
                    { length: Math.ceil(reviewStats?.averageRating) },
                    (_, index) => (
                      <Star key={index} size={16} fill="currentColor" />
                    ),
                  )}
                  <span className="ml-2 text-xs text-[#b8dfeb]">
                    {reviewStats?.totalFeedbacks} verified reviews
                  </span>
                </div>
              </div>
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-[#1d3a73]">
                <div
                  className="absolute inset-2 rounded-full"
                  style={{
                    background: `conic-gradient(#52c7d8 ${Math.ceil(reviewStats?.averageRating) * 20}%, #315187 0)`,
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
              <RatingBar
                rating={5}
                count={reviewStats?.totalFiveStars}
                totalReviews={reviewStats?.totalFeedbacks}
              />

              <RatingBar
                rating={4}
                count={reviewStats?.totalFourStars}
                totalReviews={reviewStats?.totalFeedbacks}
              />

              <RatingBar
                rating={3}
                count={reviewStats?.totalThreeStars}
                totalReviews={reviewStats?.totalFeedbacks}
              />

              <RatingBar
                rating={2}
                count={reviewStats?.totalTwoStars}
                totalReviews={reviewStats?.totalFeedbacks}
              />

              <RatingBar
                rating={1}
                count={reviewStats?.totalOneStar}
                totalReviews={reviewStats?.totalFeedbacks}
              />
            </div>
          </article>
        </section>

        <section
          className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4 dmin-kpi-grid w-full self-start lg:sticky lg:top-[0] lg:self-start bg-[#ffffff] z-50 py-5 px-5 rounded-2xl"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
        >
          <Metrics
            label="total reviews"
            value={reviewStats?.totalFeedbacks}
            Icon={MessageCircle}
            color="bg-[#e3f5f8] text-[#1687b6]"
          />
          <Metrics
            label="5-star moments"
            value={reviewStats?.totalFiveStars}
            Icon={Star}
            color="bg-[#fff2d9] text-[#b77a19]"
          />
          <Metrics
            label="Response rate"
            value={
              reviewStats?.completedServices > 0
                ? Math.ceil(
                    (reviewStats?.totalFeedbacks /
                      reviewStats?.completedServices) *
                      100,
                  ) + "%"
                : "0%"
            }
            Icon={CheckCircle2}
            color="bg-[#e3f3eb] text-[#14745e]"
          />
          <Metrics
            label="This month"
            value={
              reviewStats?.completedServices > 0
                ? "+" +
                  Math.ceil(
                    (reviewStats?.totalFeedbacks /
                      reviewStats?.completedServices) *
                      100,
                  ) +
                  "%"
                : "+0%"
            }
            Icon={Sparkles}
            color="bg-[#eee8fa] text-[#665099]"
          />
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
              {(["All", 5, 4, 3, 2, 1] as const).map((item) => (
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
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7893a0]"
              />
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
              <article
                key={review._id}
                className="rounded-xl border border-[#dcebef] bg-white p-4 transition-shadow hover:shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold bg-[#d9f2ed] text-[#14745e]"`}
                    >
                      {review?.user?.firstName[0]}
                      {review?.user?.lastName[0]}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#123f5d]">
                        {review?.user?.firstName} {review?.user?.lastName}
                      </h3>
                      <p className="mt-1 text-xs text-[#7893a0]">
                        {review?.service?.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:text-right">
                    <div className="flex gap-0.5 text-[#f0b341]">
                      {Array.from(
                        { length: Number(review?.rating) },
                        (_, index) => (
                          <Star
                            key={index}
                            size={14}
                            fill={
                              index < review.rating ? "currentColor" : "none"
                            }
                            className={
                              index < review.rating ? "" : "text-[#c9dce2]"
                            }
                          />
                        ),
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-[0.65rem] text-[#7893a0]">
                      <CalendarDays size={12} />{" "}
                      {getIsoFullDate(review?.updatedAt)}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#4d6d7d]">
                  &ldquo;{review?.text}&rdquo;
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[#edf3f5] pt-3">
                  <span
                    className={`flex items-center gap-1 text-[0.65rem] font-bold ${review?.user?.serviceCount ? "text-[#168d68]" : "text-[#a16b1d]"}`}
                  >
                    <CheckCircle2 size={13} />
                    {review?.user?.serviceCount} Completed services
                  </span>
                  <Link
                    href={`/admin/dashboard/services/${review?.service?._id}`}
                    className="text-button text-xs"
                  >
                    View service
                  </Link>
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

          {hasMore && (
            <div
              className="flex mt-10 items-center justify-center"
              onClick={onFetchMoreFeedback}
            >
              <button type="button" className="secondary-button button-small">
                {feedbackIsLoading && <Loader />}
                Load more
              </button>
            </div>
          )}
        </section>
      </main>
    </AdminDashboardLayout>
  );
}

export default CustomersReviews;
