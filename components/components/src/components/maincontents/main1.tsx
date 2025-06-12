"use client";
import { useEffect, useRef, useState } from "react";
import { FiHeart, FiUser, FiActivity, FiChevronDown, FiSmile } from "react-icons/fi";

// Dados
const ESPECIALIDADES = [
  {
    icon: <FiHeart />,
    title: "Cardiologia",
    desc: "Diagnóstico e tratamento de doenças do coração com tecnologia de ponta.",
  },
  {
    icon: <FiActivity />,
    title: "Clínica Geral",
    desc: "Atendimento completo e humanizado para todas as idades.",
  },
  {
    icon: <FiUser />,
    title: "Pediatria",
    desc: "Cuidado especial para crianças, do nascimento à adolescência.",
  },
  {
    icon: <FiHeart />,
    title: "Ortopedia",
    desc: "Tratamento de ossos, músculos e articulações com especialistas.",
  },
];

const DIFERENCIAIS = [
  {
    label: "Equipe médica experiente e humanizada",
    desc: "Nossa equipe é formada por profissionais renomados, sempre atentos ao cuidado humano e à atualização científica.",
  },
  {
    label: "Atendimento rápido e sem burocracia",
    desc: "Priorizamos o seu tempo, com processos ágeis e atendimento sem complicações.",
  },
  {
    label: "Ambiente moderno e confortável",
    desc: "Ambientes pensados para o seu conforto e bem-estar em todas as etapas do atendimento.",
  },
  {
    label: "Tecnologia de ponta em exames",
    desc: "Equipamentos modernos garantem diagnósticos precisos e seguros para você.",
  },
];

const DEPOIMENTOS = [
  {
    nome: "Maria S.",
    texto: "Fui muito bem atendida, equipe atenciosa e ambiente acolhedor.",
  },
  {
    nome: "Carlos P.",
    texto: "Consulta rápida, sem filas e com ótimos profissionais.",
  },
  {
    nome: "Juliana R.",
    texto: "Ambiente limpo, organizado e médicos excelentes!",
  },
];

// COMPONENTES
function Especialidades({ onShowMsg }: { onShowMsg: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 120) setShow(true);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Efeito parallax
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  function handleParallax(e: React.MouseEvent, i: number) {
    if (hovered !== i) return;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setParallax({ x, y });
  }

  return (
    <section
      ref={ref}
      className={`w-full max-w-5xl mx-auto mb-24 transition-all duration-700 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <h2 className="section-title">Especialidades em destaque</h2>
      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded-full blur-sm opacity-70 pointer-events-none" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {ESPECIALIDADES.map((esp, i) => (
            <div
              key={esp.title}
              className={`group bg-white border border-neutral-200 rounded-2xl p-7 flex flex-col items-center shadow-md transition-all duration-500 cursor-pointer hover:-translate-y-4 hover:shadow-2xl hover:scale-105`}
              style={{
                boxShadow: hovered === i ? "0 8px 32px 0 rgba(30,30,30,0.10)" : undefined,
                zIndex: hovered === i ? 2 : 1,
                transform: hovered === i
                  ? `translateY(-16px) scale(1.05) translateX(${parallax.x}px) translateY(${parallax.y}px)`
                  : undefined,
                transitionDelay: `${i * 80}ms`,
              }}
              tabIndex={0}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onMouseMove={e => handleParallax(e, i)}
              aria-label={esp.title}
            >
              <div
                className={`mb-4 text-2xl text-neutral-700 transition-transform duration-300 ${
                  hovered === i ? "scale-125 rotate-6 text-neutral-900" : "group-hover:text-neutral-900"
                }`}
              >
                {esp.icon}
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-neutral-900 transition">
                {esp.title}
              </h3>
              <p className="text-neutral-500 text-sm text-center mb-3">{esp.desc}</p>
              <div className="h-8 flex items-center justify-center">
                {hovered === i && (
                  <button
                    className="px-4 py-2 rounded-full bg-neutral-900 text-white font-medium text-sm shadow hover:bg-neutral-700 transition animate-fade-in"
                    onClick={onShowMsg}
                    type="button"
                  >
                    Quero saber mais
                  </button>
                )}
              </div>
              <span
                className={`absolute left-1/2 top-0 -translate-x-1/2 w-2/3 h-1 rounded-full bg-gradient-to-r from-neutral-100 via-white to-neutral-100 blur-sm opacity-0 pointer-events-none transition-opacity duration-500 ${
                  hovered === i ? "opacity-80" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Diferenciais() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full max-w-4xl mx-auto mb-24">
      <h2 className="section-title">Por que escolher nossa clínica?</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-5">
          {DIFERENCIAIS.map((dif, idx) => (
            <div
              key={dif.label}
              className={`relative bg-neutral-50 border border-neutral-200 rounded-xl px-6 py-5 flex items-center cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg group ${
                open === idx ? "bg-neutral-100 scale-[1.03] shadow-md" : ""
              }`}
              onClick={() => setOpen(open === idx ? null : idx)}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") setOpen(open === idx ? null : idx);
              }}
              aria-expanded={open === idx}
            >
              <span className="text-neutral-800 font-medium flex-1">{dif.label}</span>
              <FiChevronDown
                className={`ml-2 text-xl text-neutral-400 transition-transform ${
                  open === idx ? "rotate-180" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-neutral-300 transition-all duration-500 ${
                  open === idx ? "bg-neutral-700 h-12" : ""
                }`}
              />
            </div>
          ))}
        </div>
        <div className="flex-1 flex items-center justify-center">
          {open !== null && (
            <div className="w-full animate-fade-in">
              <div className="px-8 py-8 bg-white border border-neutral-200 rounded-2xl shadow text-neutral-700 text-lg text-center">
                {DIFERENCIAIS[open].desc}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Depoimentos() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setIdx(i => (i + 1) % DEPOIMENTOS.length), 5000);
    return () => clearTimeout(timer);
  }, [idx]);
  return (
    <section className="w-full max-w-3xl mx-auto mb-24">
      <h2 className="section-title">O que nossos pacientes dizem</h2>
      <div className="relative flex flex-col items-center">
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl shadow-md px-8 py-8 w-full animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <FiSmile className="text-2xl text-neutral-700" />
            <span className="font-semibold text-neutral-800">{DEPOIMENTOS[idx].nome}</span>
          </div>
          <p className="text-neutral-700 text-lg italic">&quot;{DEPOIMENTOS[idx].texto}&quot;</p>
        </div>
        <div className="flex gap-2 mt-4">
          {DEPOIMENTOS.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full border border-neutral-300 transition-all ${
                idx === i ? "bg-neutral-900" : "bg-neutral-200"
              }`}
              onClick={() => setIdx(i)}
              aria-label={`Ver depoimento ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// PRINCIPAL
export default function Main1() {
  const [showMsg, setShowMsg] = useState(false);

  function handleShowMsg() {
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 2200);
  }

  return (
    <main className="relative bg-white min-h-[1200px] flex flex-col items-center px-4 py-20 md:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-32 bg-neutral-100 rounded-b-3xl blur-2xl opacity-60 pointer-events-none" />

      <Especialidades onShowMsg={handleShowMsg} />
      <Diferenciais />
      <Depoimentos />

      <section className="w-full max-w-3xl mx-auto text-center mt-16">
        <div className="bg-neutral-900 rounded-3xl py-12 px-6 md:px-16 shadow-xl flex flex-col items-center gap-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Pronto para cuidar da sua saúde?
          </h3>
          <p className="text-neutral-200 text-lg mb-4">
            Agende sua consulta ou tire dúvidas com nossa equipe. Atendimento rápido e humanizado.
          </p>
          <a
            href="#agendar"
            className="inline-block px-8 py-3 rounded-full bg-white hover:bg-neutral-100 text-neutral-900 font-semibold border border-neutral-200 transition shadow"
          >
            Agendar agora
          </a>
        </div>
      </section>

      {/* Mensagem animada */}
      {showMsg && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-lg animate-fade-in">
          Em breve você poderá saber mais sobre esta especialidade!
        </div>
      )}

      {/* CSS utilitário */}
      <style>{`
        .section-title {
          font-size: 2rem;
          font-weight: bold;
          color: #171717;
          text-align: center;
          margin-bottom: 2.5rem;
          letter-spacing: -0.03em;
          animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: none;}
        }
      `}</style>
    </main>
  );
}