"use client";
import React, { useState, useEffect } from "react";

export default function Hero2() {
  const carrouselItems = [
    {
      title: "Bem-vindo ao nosso site",
      description: "Descubra nossos serviços e agende uma consulta facilmente.",
      backgroundColor: "#f5f5f5",
    },
    {
      title: "Atendimento de qualidade",
      description: "Nossa equipe está pronta para atender você com excelência.",
      backgroundColor: "#f5f5f5",
    },
    {
      title: "Agendamento online",
      description: "Agende sua consulta de forma rápida e prática.",
      backgroundColor: "#f5f5f5",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = carrouselItems[currentIndex];

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? carrouselItems.length - 1 : prev - 1
    );
  }, [carrouselItems.length]);

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) =>
      prev === carrouselItems.length - 1 ? 0 : prev + 1
    );
  }, [carrouselItems.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === carrouselItems.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [carrouselItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  return (
    <section className="relative w-screen min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-neutral-100 px-0 py-0 mt-24 md:mt-30">
      <div className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-white/90">
        {/* Banner principal */}
        <div
          className="flex flex-col items-center justify-center h-[40vh] md:h-[60vh] px-6 md:px-24 transition-all duration-500"
          style={{
            backgroundColor: currentItem.backgroundColor,
            minHeight: 320,
          }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-6 text-center drop-shadow-sm tracking-tight">
            {currentItem.title}
          </h2>
          <p className="mt-2 text-2xl md:text-2xl text-neutral-700 text-center max-w-2xl font-medium">
            {currentItem.description}
          </p>
        </div>
        {/* Controles */}
        <div className="absolute top-1/2 left-0 w-full flex justify-between items-center px-6 -translate-y-1/2 pointer-events-none">
          <div className="pointer-events-auto">
            <button
              onClick={prevSlide}
              className="bg-white/90 hover:bg-neutral-200 text-neutral-700 border border-neutral-300 rounded-full w-14 h-14 flex items-center justify-center shadow transition"
              aria-label="Anterior"
            >
              <span className="text-3xl font-bold">&lt;</span>
            </button>
          </div>
          <div className="pointer-events-auto">
            <button
              onClick={nextSlide}
              className="bg-white/90 hover:bg-neutral-200 text-neutral-700 border border-neutral-300 rounded-full w-14 h-14 flex items-center justify-center shadow transition"
              aria-label="Próximo"
            >
              <span className="text-3xl font-bold">&gt;</span>
            </button>
          </div>
        </div>
        {/* Indicadores */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {carrouselItems.map((_, idx) => (
            <div
              key={idx}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
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