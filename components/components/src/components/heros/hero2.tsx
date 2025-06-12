"use client";
import React, { useState } from "react";

export default function Hero2() {
  const carrouselItems = [
    {
      title: "Bem-vindo ao nosso site",
      description: "Descubra nossos serviços e agende uma consulta facilmente.",
      backgroundColor: "#f0f0f0",
    },
    {
      title: "Atendimento de qualidade",
      description: "Nossa equipe está pronta para atender você com excelência.",
      backgroundColor: "#f0f0f0",
    },
    {
      title: "Agendamento online",
      description: "Agende sua consulta de forma rápida e prática.",
      backgroundColor: "#f0f0f0",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = carrouselItems[currentIndex];

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? carrouselItems.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === carrouselItems.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="relative bg-neutral-50 min-h-[520px] flex items-center justify-center px-4 pt-40 pb-16 md:pt-56 md:pb-28">
      <div className="relative w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-lg">
        {/* Banner principal */}
        <div
          className="flex flex-col items-center justify-center py-20 px-8 md:px-16 transition-all duration-500"
          style={{ backgroundColor: currentItem.backgroundColor, minHeight: 320 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 text-center drop-shadow">
            {currentItem.title}
          </h2>
          <p className="mt-2 text-lg md:text-xl text-neutral-700 text-center max-w-xl">
            {currentItem.description}
          </p>
        </div>
        {/* Controles */}
        <div className="absolute top-1/2 left-0 w-full flex justify-between items-center px-4 -translate-y-1/2 pointer-events-none">
          <div className="pointer-events-auto">
            <button
              onClick={prevSlide}
              className="bg-white/80 hover:bg-white text-neutral-700 border border-neutral-200 rounded-full w-12 h-12 flex items-center justify-center shadow transition"
              aria-label="Anterior"
            >
              <span className="text-2xl font-bold">&lt;</span>
            </button>
          </div>
          <div className="pointer-events-auto">
            <button
              onClick={nextSlide}
              className="bg-white/80 hover:bg-white text-neutral-700 border border-neutral-200 rounded-full w-12 h-12 flex items-center justify-center shadow transition"
              aria-label="Próximo"
            >
              <span className="text-2xl font-bold">&gt;</span>
            </button>
          </div>
        </div>
        {/* Indicadores */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {carrouselItems.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-neutral-900"
                  : "bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}