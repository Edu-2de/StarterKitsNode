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
    <section className="w-full bg-gradient-to-b from-neutral-50 via-neutral-100 to-neutral-50 py-20">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-700 mb-14 text-center tracking-tight">
          O que nossos clientes dizem
        </h2>
        <div className="relative w-full flex justify-center">
          <div
            className={`
              bg-white/90 border border-neutral-100 rounded-3xl shadow-lg
              px-4 sm:px-16 md:px-32 py-16 flex flex-col items-center
              transition-all duration-700 min-h-[320px] w-full max-w-6xl
              ${fade ? "opacity-100" : "opacity-0"}
              backdrop-blur-[2px]
            `}
            key={current}
          >
            <div className="flex items-center justify-center mb-8">
              <span className="inline-flex items-center justify-center rounded-full bg-neutral-100 border border-neutral-200 shadow w-16 h-16">
                <Quote className="w-9 h-9 text-neutral-300" />
              </span>
            </div>
            <p className="text-neutral-700 text-2xl sm:text-3xl text-center mb-8 font-medium leading-relaxed max-w-3xl">
              &quot;{testimonials[current].text}&quot;
            </p>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-neutral-800 text-lg sm:text-xl">{testimonials[current].name}</span>
              <span className="text-neutral-400 text-base">{testimonials[current].role}</span>
            </div>
          </div>
          {/* Barra de progresso animada */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1.5 bg-neutral-200 rounded-full overflow-hidden shadow-inner">
            <div
              key={current}
              className="h-full bg-neutral-400 transition-all duration-[4800ms]"
              style={{ width: "100%", animation: "progressBar 5s linear" }}
            />
          </div>
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