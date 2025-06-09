"use client";

import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana Souza",
    text: "Ótima experiência! Entrega rápida e atendimento excelente. Recomendo para todos.",
    role: "Cliente",
  },
  {
    name: "Carlos Lima",
    text: "Produtos de qualidade e site fácil de navegar. Voltarei a comprar com certeza.",
    role: "Cliente",
  },
  {
    name: "Juliana Alves",
    text: "Fiquei impressionada com o suporte. Resolveram minha dúvida em minutos!",
    role: "Cliente",
  },
  {
    name: "Pedro Martins",
    text: "A entrega foi antes do prazo e tudo veio bem embalado. Muito satisfeito.",
    role: "Cliente",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  // Efeito de fade para transição suave
  const [fade, setFade] = useState(true);
  useEffect(() => {
    setFade(false);
    const fadeTimeout = setTimeout(() => setFade(true), 100);
    return () => clearTimeout(fadeTimeout);
  }, [current]);

  return (
    <section className="w-full bg-neutral-50 py-20">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-14 text-center tracking-tight drop-shadow-sm">
          O que nossos clientes dizem
        </h2>
        <div className="relative w-full flex justify-center">
          <div
            className={`
              bg-white border border-blue-100 rounded-3xl shadow-2xl
              px-4 sm:px-12 md:px-24 py-14 flex flex-col items-center
              transition-all duration-700 min-h-[320px] w-full max-w-4xl
              ${fade ? "opacity-100" : "opacity-0"}
              backdrop-blur-[2px] relative
              after:absolute after:inset-0 after:rounded-3xl after:pointer-events-none
              after:bg-yellow-50 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
            `}
            key={current}
          >
            <div className="flex items-center justify-center mb-8 relative z-10">
              <span className="inline-flex items-center justify-center rounded-full bg-blue-50 border-2 border-blue-100 shadow w-16 h-16">
                <Quote className="w-9 h-9 text-yellow-400" />
              </span>
            </div>
            <p className="text-blue-900 text-2xl sm:text-3xl text-center mb-8 font-medium leading-relaxed max-w-2xl relative z-10">
              &quot;{testimonials[current].text}&quot;
            </p>
            <div className="flex flex-col items-center relative z-10">
              <span className="font-semibold text-blue-900 text-lg sm:text-xl">{testimonials[current].name}</span>
              <span className="text-yellow-600 text-base">{testimonials[current].role}</span>
            </div>
            {/* Sutil linha decorativa */}
            <span className="block mt-8 h-1 w-16 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 opacity-80" />
          </div>
          {/* Barra de progresso animada */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1.5 bg-yellow-100 rounded-full overflow-hidden shadow-inner">
            <div
              key={current}
              className="h-full bg-yellow-400 transition-all duration-[4800ms]"
              style={{ width: "100%", animation: "progressBar 5s linear" }}
            />
          </div>
        </div>
        {/* Navegação manual */}
        <div className="flex gap-2 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border-2 border-blue-200 transition
                ${current === idx ? "bg-yellow-400 border-yellow-400 scale-110 shadow" : "bg-white hover:bg-yellow-100"}
              `}
              aria-label={`Ver depoimento ${idx + 1}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
      {/* Animation keyframes */}
      <style>{`
        @keyframes progressBar {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </section>
  );
}