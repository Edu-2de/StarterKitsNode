"use client";
import React, { useState, useEffect, useRef } from "react";

const phrases = [
  "Descubra experiências incríveis.",
  "Conecte-se com o que importa.",
  "Transforme seu dia com um clique.",
  "Tecnologia feita para você.",
];

export default function Hero3() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typing, setTyping] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [bgColor, setBgColor] = useState("#f5f5f5");
  const [hovered, setHovered] = useState(false);
  const [input, setInput] = useState("");
  const [greeting, setGreeting] = useState("");
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  // Typing animation effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    if (!isDeleting && typing.length < currentPhrase.length) {
      typingRef.current = setTimeout(() => {
        setTyping(currentPhrase.slice(0, typing.length + 1));
      }, 60);
    } else if (isDeleting && typing.length > 0) {
      typingRef.current = setTimeout(() => {
        setTyping(currentPhrase.slice(0, typing.length - 1));
      }, 30);
    } else if (!isDeleting && typing.length === currentPhrase.length) {
      typingRef.current = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && typing.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }
    return () => {
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, [typing, isDeleting, phraseIndex]);

  // Background color animation on hover
  useEffect(() => {
    if (hovered) {
      setBgColor("#e5e7eb");
    } else {
      setBgColor("#f5f5f5");
    }
  }, [hovered]);

  // Função para saudar o usuário
  const handleGreet = () => {
    if (input.trim()) {
      setGreeting(`Olá, ${input.trim()}! Seja bem-vindo(a)!`);
      setInput("");
    }
  };

  // Função para mudar cor do banner ao clicar
  const handleBannerClick = () => {
    setBgColor(
      `hsl(${Math.floor(Math.random() * 360)}, 20%, 95%)`
    );
  };

  return (
    <section
      className="w-screen min-h-[70vh] flex items-center justify-center transition-colors duration-500"
      style={{ backgroundColor: bgColor, marginTop: "5rem" }}
    >
      <div
        className="w-full max-w-5xl mx-auto rounded-3xl shadow-2xl border border-neutral-200 bg-white/80 overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-8 transition-all duration-500"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleBannerClick}
        style={{ cursor: "pointer" }}
        title="Clique para mudar a cor do banner"
      >
        {/* Texto principal com animação de digitação */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 mb-4 tracking-tight">
            <span className="inline-block min-h-[3.5rem]">
              {typing}
              <span className="animate-pulse text-neutral-400">|</span>
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-neutral-700 mb-8 max-w-xl">
            Explore recursos avançados, navegue com facilidade e personalize sua experiência.
          </p>
          <div className="flex gap-2 w-full max-w-xs">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleGreet()}
              placeholder="Digite seu nome..."
              className="flex-1 px-4 py-2 rounded-l-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 bg-white/90"
            />
            <button
              onClick={handleGreet}
              className="px-4 py-2 rounded-r-lg bg-neutral-900 text-white font-semibold hover:bg-neutral-700 transition"
            >
              Entrar
            </button>
          </div>
          {greeting && (
            <div className="mt-4 text-neutral-800 text-lg font-medium animate-fade-in">
              {greeting}
            </div>
          )}
        </div>
        {/* Imagem ilustrativa ou ícone animado */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-100 flex items-center justify-center shadow-lg relative overflow-hidden">
            <svg
              className="w-32 h-32 animate-spin-slow text-neutral-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray="60 40"
              />
            </svg>
            <span className="relative z-10 text-6xl text-neutral-400 select-none">🚀</span>
          </div>
        </div>
      </div>
      <style>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </section>
  );
}