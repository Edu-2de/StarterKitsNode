"use client";
import { useEffect, useRef, useState } from "react";
import { FiHeart, FiUser, FiActivity, FiChevronDown, FiSmile, FiMessageCircle } from "react-icons/fi";

const ESPECIALIDADES = [
  {
    icon: <FiHeart className="text-2xl text-red-400" />,
    title: "Cardiologia",
    desc: "Diagnóstico e tratamento de doenças do coração com tecnologia de ponta.",
  },
  {
    icon: <FiActivity className="text-2xl text-blue-400" />,
    title: "Clínica Geral",
    desc: "Atendimento completo e humanizado para todas as idades.",
  },
  {
    icon: <FiUser className="text-2xl text-emerald-400" />,
    title: "Pediatria",
    desc: "Cuidado especial para crianças, do nascimento à adolescência.",
  },
  {
    icon: <FiHeart className="text-2xl text-pink-400" />,
    title: "Ortopedia",
    desc: "Tratamento de ossos, músculos e articulações com especialistas.",
  },
];

const DIFERENCIAIS = [
  "Equipe médica experiente e humanizada",
  "Atendimento rápido e sem burocracia",
  "Ambiente moderno e confortável",
  "Tecnologia de ponta em exames",
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

export default function Main1() {
  // Fade-in especialidades ao rolar
  const especialidadesRef = useRef<HTMLDivElement>(null);
  const [showEspecialidades, setShowEspecialidades] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (!especialidadesRef.current) return;
      const rect = especialidadesRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 120) setShowEspecialidades(true);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Diferenciais interativos
  const [openDiff, setOpenDiff] = useState<number | null>(null);

  // Depoimentos: carrossel simples com JS
  const [depoIndex, setDepoIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDepoIndex((i) => (i + 1) % DEPOIMENTOS.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [depoIndex]);

  // Efeito de hover nos cards: mostra botão de ação
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Efeito de mensagem animada para interação
  const [showMsg, setShowMsg] = useState(false);
  const handleMsg = () => {
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 2200);
  };

  return (
    <main className="relative bg-white min-h-[1200px] flex flex-col items-center px-4 py-20 md:py-32">
      {/* Sombra decorativa */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-32 bg-neutral-100 rounded-b-3xl blur-2xl opacity-60 pointer-events-none" />

      {/* Especialidades */}
      <section
        ref={especialidadesRef}
        className={`w-full max-w-5xl mx-auto mb-24 transition-all duration-700 ${
          showEspecialidades
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 text-center mb-10 tracking-tight">
          Especialidades em destaque
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {ESPECIALIDADES.map((esp, i) => (
            <div
              key={esp.title}
              className={`group bg-white border border-neutral-200 rounded-2xl p-7 flex flex-col items-center shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl`}
              style={{
                transitionDelay: `${i * 80}ms`,
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="mb-4">{esp.icon}</div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-blue-700 transition">
                {esp.title}
              </h3>
              <p className="text-neutral-500 text-sm text-center mb-3">{esp.desc}</p>
              {hoveredCard === i && (
                <button
                  className="mt-2 px-4 py-2 rounded-full bg-neutral-900 text-white font-medium text-sm shadow hover:bg-neutral-700 transition animate-fade-in"
                  onClick={handleMsg}
                  type="button"
                >
                  Quero saber mais
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Diferenciais */}
      <section className="w-full max-w-4xl mx-auto mb-24">
        <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 text-center mb-10 tracking-tight">
          Por que escolher nossa clínica?
        </h2>
        <ul className="space-y-5">
          {DIFERENCIAIS.map((dif, idx) => (
            <li
              key={dif}
              className={`bg-neutral-50 border border-neutral-200 rounded-xl px-6 py-5 flex items-center justify-between cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                openDiff === idx ? "bg-neutral-100" : ""
              }`}
              onClick={() => setOpenDiff(openDiff === idx ? null : idx)}
            >
              <span className="text-neutral-800 font-medium">{dif}</span>
              <FiChevronDown
                className={`ml-2 text-xl text-neutral-400 transition-transform ${
                  openDiff === idx ? "rotate-180" : ""
                }`}
              />
            </li>
          ))}
        </ul>
        {/* Efeito: texto extra ao expandir */}
        {openDiff !== null && (
          <div className="mt-4 px-6 py-4 bg-white border border-neutral-200 rounded-xl shadow animate-fade-in text-neutral-600 text-base">
            {openDiff === 0 && "Nossa equipe é formada por profissionais renomados, sempre atentos ao cuidado humano e à atualização científica."}
            {openDiff === 1 && "Priorizamos o seu tempo, com processos ágeis e atendimento sem complicações."}
            {openDiff === 2 && "Ambientes pensados para o seu conforto e bem-estar em todas as etapas do atendimento."}
            {openDiff === 3 && "Equipamentos modernos garantem diagnósticos precisos e seguros para você."}
          </div>
        )}
      </section>

      {/* Depoimentos carrossel */}
      <section className="w-full max-w-3xl mx-auto mb-24">
        <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 text-center mb-10 tracking-tight">
          O que nossos pacientes dizem
        </h2>
        <div className="relative flex flex-col items-center">
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl shadow-md px-8 py-8 w-full animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <FiSmile className="text-2xl text-emerald-400" />
              <span className="font-semibold text-neutral-800">{DEPOIMENTOS[depoIndex].nome}</span>
            </div>
            <p className="text-neutral-700 text-lg italic">"{DEPOIMENTOS[depoIndex].texto}"</p>
          </div>
          <div className="flex gap-2 mt-4">
            {DEPOIMENTOS.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full border border-neutral-300 transition-all ${
                  depoIndex === idx ? "bg-neutral-900" : "bg-neutral-200"
                }`}
                onClick={() => setDepoIndex(idx)}
                aria-label={`Ver depoimento ${idx + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
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

      {/* Mensagem animada ao clicar em "Quero saber mais" */}
      {showMsg && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-lg animate-fade-in">
          Em breve você poderá saber mais sobre esta especialidade!
        </div>
      )}

      {/* Animação fade-in */}
      <style>{`
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