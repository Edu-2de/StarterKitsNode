"use client";
import { useState, useEffect } from "react";

const slides = [
  { bg: "#f3e9dc" }, // bege claro
  { bg: "#e9dcc9" }, // bege médio
  { bg: "#d6cfc2" }, // bege escuro
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  function nextSlide() {
    setCurrent((prev) => (prev + 1) % slides.length);
  }

  function prevSlide() {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }

  // Troca automática de slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); // 4 segundos
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  return (
    <section className="banner" style={{ minHeight: 380, position: "relative" }}>
      <div
        className="banner-carousel-slide"
        style={{
          background: slides[current].bg,
          width: "100%",
          height: 340,
          borderRadius: 32,
          transition: "background 0.5s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Slide visual, vazio para personalizar depois */}
      </div>
      <button
        className="banner-carousel-btn"
        style={{
          position: "absolute",
          left: 32,
          top: "50%",
          transform: "translateY(-50%)",
          background: "#fff8",
          border: "none",
          borderRadius: "50%",
          width: 40,
          height: 40,
          cursor: "pointer",
        }}
        onClick={prevSlide}
        aria-label="Anterior"
      >
        &#8592;
      </button>
      <button
        className="banner-carousel-btn"
        style={{
          position: "absolute",
          right: 32,
          top: "50%",
          transform: "translateY(-50%)",
          background: "#fff8",
          border: "none",
          borderRadius: "50%",
          width: 40,
          height: 40,
          cursor: "pointer",
        }}
        onClick={nextSlide}
        aria-label="Próximo"
      >
        &#8594;
      </button>
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
        }}
      >
        {slides.map((_, idx) => (
          <span
            key={idx}
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: idx === current ? "#8d775f" : "#e0dedb",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
    </section>
  );
}