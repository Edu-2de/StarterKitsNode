"use client";
import React, { useRef, useState, useEffect } from "react";

const banners = [
  { id: 1, color: "bg-neutral-100", border: "border-neutral-200" },
  { id: 2, color: "bg-neutral-200", border: "border-neutral-300" },
  { id: 3, color: "bg-neutral-50", border: "border-neutral-100" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide
  function nextBanner() {
    setCurrent((prev) => (prev + 1) % banners.length);
  }
  function prevBanner() {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }

  // Auto play
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <section className="relative flex items-center justify-center min-h-[60vh] w-full bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute -top-32 -left-40 w-[38rem] h-[28rem] rounded-full blur-3xl pointer-events-none z-0 bg-neutral-200" />
      <div className="absolute top-32 right-0 w-[28rem] h-[20rem] rounded-full blur-2xl pointer-events-none z-0 bg-neutral-100" />
      <div className="absolute bottom-0 left-0 w-[18rem] h-[13rem] rounded-full blur-2xl pointer-events-none z-0 bg-neutral-300" />
      <div className="absolute bottom-0 right-0 w-[15rem] h-[10rem] rounded-full blur-2xl pointer-events-none z-0 bg-neutral-50" />

      {/* Banner principal ocupando toda a área */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        <div
          className={`
            relative w-full h-[340px] sm:h-[400px] flex items-center justify-center
            transition-all duration-500
            rounded-none
            overflow-hidden
          `}
        >
          {banners.map((banner, idx) => (
            <div
              key={banner.id}
              className={`
                absolute top-0 left-0 w-full h-full
                border
                transition-all duration-500
                ${banner.color} ${banner.border}
                ${idx === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"}
              `}
              style={{ boxShadow: "0 2px 24px 0 #e0e0e0a8" }}
            />
          ))}
          {/* Carousel Controls */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow px-2 py-2 rounded-full border border-neutral-200 transition z-20"
            onClick={prevBanner}
            aria-label="Anterior"
            type="button"
          >
            <svg width={22} height={22} fill="none" stroke="#888" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow px-2 py-2 rounded-full border border-neutral-200 transition z-20"
            onClick={nextBanner}
            aria-label="Próximo"
            type="button"
          >
            <svg width={22} height={22} fill="none" stroke="#888" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {/* Dots por cima do banner */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {banners.map((_, idx) => (
              <button
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200
                  ${idx === current ? "bg-neutral-500" : "bg-neutral-300"}
                `}
                onClick={() => setCurrent(idx)}
                aria-label={`Ir para banner ${idx + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}