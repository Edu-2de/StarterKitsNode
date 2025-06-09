"use client";
import React, { useRef, useState, useEffect } from "react";

const banners = [
  {
    id: 1,
    bg: "bg-gradient-to-br from-blue-100 via-white to-blue-50",
    border: "border-transparent",
    title: "Ofertas imperdíveis",
    subtitle: "Os melhores produtos com descontos exclusivos para você!",
    cta: "Ver ofertas",
    ctaColor: "bg-yellow-400 text-blue-900 hover:bg-yellow-300",
  },
  {
    id: 2,
    bg: "bg-gradient-to-br from-blue-100 via-white to-blue-50",
    border: "border-transparent",
    title: "Novidades da semana",
    subtitle: "Confira os lançamentos e fique por dentro das tendências.",
    cta: "Ver novidades",
    ctaColor: "bg-blue-700 text-white hover:bg-blue-800",
  },
  {
    id: 3,
    bg: "bg-gradient-to-br from-white via-blue-50 to-blue-100",
    border: "border-transparent",
    title: "Frete grátis acima de R$199",
    subtitle: "Aproveite para economizar ainda mais nas suas compras.",
    cta: "Comprar agora",
    ctaColor: "bg-blue-700 text-white hover:bg-blue-800",
  },
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
    <section className="relative w-full flex items-stretch justify-center min-h-[320px] sm:min-h-[420px] md:min-h-[520px] p-0 m-0">
      {/* Banner principal ocupa toda a área, sem margem */}
      <div className="relative w-full flex-1 flex items-stretch justify-center">
        {banners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`
              absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center
              border ${banner.border} rounded-none shadow-none px-4 sm:px-8
              transition-all duration-500
              ${banner.bg}
              ${idx === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"}
            `}
          >
            <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-12 sm:py-20">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-blue-900 mb-3 text-center drop-shadow">
                {banner.title}
              </h2>
              <p className="text-lg sm:text-2xl text-blue-800 mb-7 text-center max-w-xl drop-shadow">
                {banner.subtitle}
              </p>
              <a
                href="#"
                className={`inline-block px-8 py-3 rounded-full font-bold text-lg shadow transition ${banner.ctaColor}`}
              >
                {banner.cta}
              </a>
            </div>
          </div>
        ))}
        {/* Carousel Controls */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow px-2 py-2 rounded-full border border-blue-200 transition z-20"
          onClick={prevBanner}
          aria-label="Anterior"
          type="button"
        >
          <svg width={22} height={22} fill="none" stroke="#888" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow px-2 py-2 rounded-full border border-blue-200 transition z-20"
          onClick={nextBanner}
          aria-label="Próximo"
          type="button"
        >
          <svg width={22} height={22} fill="none" stroke="#888" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, idx) => (
            <button
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200
                ${idx === current ? "bg-blue-500" : "bg-blue-200"}
              `}
              onClick={() => setCurrent(idx)}
              aria-label={`Ir para banner ${idx + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}