import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Danielle M.",
    service: "Roach Treatment",
    location: "Jersey City, NJ",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=47",
    text: "The technician found a roach entry point two other companies missed. Photo proof of every treated area — finally a company that shows its work.",
  },
  {
    name: "Marcus T.",
    service: "Bed Bug + Deep Cleaning",
    location: "Brooklyn, NY",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=12",
    text: "Booked pest control and added a deep clean in the same request. Two teams, one coordinator, spotless apartment. Worth every dollar.",
  },
  {
    name: "Priya S.",
    service: "Restaurant Pest Control",
    location: "Newark, NJ",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=32",
    text: "Our restaurant passed inspection with zero issues after switching to Helena. Their preventive schedule is reliable and discreet.",
  },
  {
    name: "Aaron W.",
    service: "Move-out Cleaning",
    location: "Hoboken, NJ",
    rating: 4,
    image: "https://i.pravatar.cc/100?img=11",
    text: "Easy request form, clear pricing, and the cleaners arrived right in the window. Before/after photos were a nice touch.",
  },
];

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={15}
          strokeWidth={1.5}
          className={
            star <= rating
              ? "fill-[#f9a825] text-[#f9a825]"
              : "fill-[#e2e8f0] text-[#e2e8f0]"
          }
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="w-full container bg-[#f7f9fa] py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Section Heading */}
        <div className="mb-14">
          <p className="eyebrow">Loved by clients</p>

          <h2 className="text-[38px] font-bold leading-[1.1] tracking-[-0.035em] text-[#122560] sm:text-[46px] lg:text-[50px]">
            What customers across NJ &amp; NY say
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((testimonial, index: number) => (
            <article
              key={index}
              className="flex min-h-[200px] flex-col rounded-[22px] border border-[#dce3e9] bg-white p-7 shadow-[0_8px_25px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(15,23,42,0.1)]"
            >
              {/* Rating */}
              <Rating rating={testimonial.rating} />

              {/* Testimonial */}
              <p className="mt-5 text-[13px] font-normal leading-[1.6] text-[#122560]">
                “{testimonial.text}”
              </p>

              {/* Bottom Content */}
              <div className="mt-auto">
                <div className="my-2 h-px w-full bg-[#dce3e9]" />

                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHT9AzDJrgdZBGM9hR4nILN8rWEl8tsnhsV33iNSNK-I8144nGj-QR6dk&s=10"
                    alt="image_of_testonials"
                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                  />

                  {/* User Details */}
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-bold leading-tight text-[#172033]">
                      {/* {testimonial.name} */}
                      Anonymous
                    </h3>

                    <p className="mt-1 text-[12px] leading-[1.25] text-[#526174]">
                      {testimonial.service} · {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
