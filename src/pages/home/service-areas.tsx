import { MapPinPen } from "lucide-react";
import { NY_CITIES, NJ_CITIES } from "@/lib/dummy-data";
import { useState } from "react";
import { Link } from "wouter";

const ServiceAreas = () => {
  const [selectedCity, setSelectedCity] = useState("nj");

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-8 lg:px-20 my-20">
      <div className="max-w-7xl mx-auto  p-10 rounded-[1.45rem] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text & Controls */}
        <div>
          {/* Section Label */}
          <p className="text-sm font-bold tracking-widest uppercase mb-4 text-[#086287]">
            Service Areas
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#122560] leading-tight mb-6">
            Cleaning & pest control <br className="hidden sm:block" /> across NJ
            and NY
          </h1>

          {/* Description */}
          <p className="text-lg text-[#086287] opacity-80 mb-10 max-w-xl">
            We currently serve communities throughout New Jersey and New York,
            with more cities rolling out. Check your ZIP in seconds.
          </p>

          {/* City Pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {selectedCity === "nj"
              ? NJ_CITIES.slice(0, 10).map((city) => (
                  <span
                    key={city}
                    className="px-4 py-1.5 flex items-center gap-1 rounded-full border-2 border-[#001625] text-sm font-medium text-[#086287] bg-transparent"
                  >
                    <MapPinPen size={15} /> {city}
                  </span>
                ))
              : NY_CITIES.slice(0, 10).map((city) => (
                  <span
                    key={city}
                    className="px-4 py-1.5 flex items-center gap-1 rounded-full border-2 border-[#001625] text-sm font-medium text-[#086287] bg-transparent"
                  >
                    <MapPinPen size={15} /> {city}
                  </span>
                ))}
          </div>

          {/* Toggle Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedCity("nj")}
              className="px-8 py-3 rounded-full primary-button font-bold text-white shadow-md hover:opacity-90 transition"
            >
              New Jersey
            </button>
            <button
              className="secondary-button "
              onClick={() => setSelectedCity("ny")}
            >
              New York
            </button>
          </div>
        </div>

        {/* Right Column: Cards Container */}
        <div className="bg-[#f4f5f7] rounded-3xl p-6 sm:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1: New Jersey */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-8 h-8 mb-4 flex items-center justify-center">
                {/* Simple SVG location pin icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#086287"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#001625] mb-1">
                New Jersey
              </h3>
              <p className="text-[#086287] font-bold mb-3">12+ counties</p>
              <p className="text-sm text-[#001625] opacity-60">
                Bergen · Essex · Hudson · Union
              </p>
            </div>

            {/* Card 2: New York */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-8 h-8 mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#086287"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#001625] mb-1">
                New York
              </h3>
              <p className="text-[#086287] font-bold mb-3">10+ counties</p>
              <p className="text-sm text-[#001625] opacity-60">
                NYC · Westchester · Nassau
              </p>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="mt-6 text-right">
            <p className="text-sm text-[#001625] opacity-70">
              Your city is not listed?{" "}
              <span className="text-[#086287] font-semibold cursor-pointer hover:underline">
                <Link href="/contact">Let us know</Link>
              </span>
              — we're expanding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
