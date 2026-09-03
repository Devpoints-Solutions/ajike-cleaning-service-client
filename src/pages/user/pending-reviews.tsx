import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Star,
} from "lucide-react";
import DashboardLayout from "./dashboard-layout";
import { useServiceContext } from "@/features/contexts/service-context";
import type { IService } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const ratingLabels = ["Poor", "Fair", "Good", "Very good", "Excellent"];

function PendingReviews() {
  const { services } = useServiceContext();
  const [reviewedServiceIds, setReviewedServiceIds] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [rating, setRating] = useState<string>("");
  const [review, setReview] = useState("");

  const completedServices = useMemo(
    () =>
      services.filter(
        (service) =>
          service.status.toLowerCase() === "completed" &&
          !reviewedServiceIds.includes(service._id),
      ),
    [services, reviewedServiceIds],
  );

  const openReview = (service: IService) => {
    setSelectedService(service);
    setRating("");
    setReview("");
  };

  const closeReview = () => {
    setSelectedService(null);
    setRating("");
    setReview("");
  };

  const submitReview = () => {
    if (!selectedService || !rating || !review.trim()) return;

    setReviewedServiceIds((previous) => [...previous, selectedService._id]);
    closeReview();
  };

  return (
    <DashboardLayout>
      <main className="dashboard-wrap">
        <section className="mb-8 overflow-hidden rounded-3xl bg-[#122560] px-6 py-8 text-white shadow-lg sm:px-10 sm:py-10">
          <div className="max-w-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <MessageCircle size={24} />
            </div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
              Your feedback matters
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How did we do?
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
              Share a quick note about your completed service. Your feedback
              helps us keep raising the bar for every home we care for.
            </p>
          </div>
        </section>

        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Completed services</p>
            <h2 className="text-2xl font-bold text-[#122560]">
              Leave a review
            </h2>
          </div>
          {completedServices.length > 0 && (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
              {completedServices.length} awaiting feedback
            </span>
          )}
        </div>

        {completedServices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
            <CheckCircle2 className="mx-auto mb-4 text-emerald-500" size={42} />
            <h3 className="text-lg font-bold text-slate-900">
              You&apos;re all caught up
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Reviews for completed services will appear here when they are
              ready.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {completedServices.map((service) => (
              <article
                key={service._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="mb-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                      Completed
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {service.category} service
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                    <Star size={20} fill="currentColor" />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <CalendarDays size={15} className="text-slate-400" />
                    <span>
                      {service.visitCompleted || service.preferredDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin size={15} className="text-slate-400" />
                    <span className="truncate">
                      {service.serviceCity}, {service.serviceState}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="primary-button mt-5 w-full justify-center"
                  onClick={() => openReview(service)}
                  data-testid={`button-review-${service._id}`}
                >
                  <MessageCircle size={16} />
                  Tell us what you think
                </button>
              </article>
            ))}
          </div>
        )}
      </main>

      <Dialog
        open={selectedService !== null}
        onOpenChange={(open) => !open && closeReview()}
      >
        <DialogContent className="max-w-lg rounded-3xl border-0 p-0">
          <div className="bg-[#122560] px-6 py-7 text-white sm:px-8">
            <DialogHeader className="text-left">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
                Service feedback
              </p>
              <DialogTitle className="mt-2 text-2xl text-white">
                Tell us what you think
              </DialogTitle>
              <DialogDescription className="mt-2 text-blue-100">
                {selectedService?.title}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-6 px-6 py-6 sm:px-8">
            <div>
              <p className="mb-3 text-sm font-bold text-slate-800">
                How would you rate this service?
              </p>
              <div
                className="flex items-center justify-between gap-1"
                role="radiogroup"
                aria-label="Service rating"
              >
                {[1, 2, 3, 4, 5].map((value) => {
                  const valueString = String(value);
                  const isSelected = rating === valueString;

                  return (
                    <button
                      key={valueString}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={`${value} out of 5 stars`}
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${
                        isSelected
                          ? "border-amber-400 bg-amber-50 text-amber-500"
                          : "border-slate-200 text-slate-300 hover:border-amber-300 hover:text-amber-400"
                      }`}
                      onClick={() => setRating(valueString)}
                      data-testid={`button-rating-${value}`}
                    >
                      <Star
                        size={24}
                        fill={isSelected ? "currentColor" : "none"}
                      />
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-center text-xs font-medium text-slate-500">
                {rating ? ratingLabels[Number(rating) - 1] : "Select a rating"}
              </p>
            </div>

            <div>
              <label
                htmlFor="service-review"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                What stood out about your experience?
              </label>
              <Textarea
                id="service-review"
                value={review}
                onChange={(event) => setReview(event.target.value)}
                placeholder="Share your thoughts with us..."
                rows={5}
                className="resize-none border-slate-200 bg-slate-50 focus-visible:ring-[#122560]"
                data-testid="textarea-review"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 border-t border-slate-100 px-6 py-5 sm:px-8">
            <button
              type="button"
              className="secondary-button"
              onClick={closeReview}
            >
              Cancel
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={submitReview}
              disabled={!rating || !review.trim()}
              data-testid="button-submit-review"
            >
              Submit review
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

export default PendingReviews;
