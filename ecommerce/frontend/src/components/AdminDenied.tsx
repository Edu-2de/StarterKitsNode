import React, { useEffect, useRef, useState } from "react";

export default function AdminDenied() {
  const messageRef = useRef<HTMLDivElement>(null);
  const [shake, setShake] = useState(false);
  const [lockOpen, setLockOpen] = useState(false);
  const [hint, setHint] = useState("Dica: Peça acesso ao administrador ou tente novamente mais tarde.");
  const [lockColor, setLockColor] = useState("#334155");

  // Fade-in, shake e cadeado animado ao montar
  useEffect(() => {
    const el = messageRef.current;
    if (el) {
      el.classList.add("fade-in");
      setTimeout(() => setShake(true), 700);
    }
    // Cadeado abre após 2.2s
    const lockTimeout = setTimeout(() => setLockOpen(true), 2200);
    // Troca cor do cadeado para vermelho se tentar "hackear"
    const colorTimeout = setTimeout(() => setLockColor("#ef4444"), 3500);
    return () => {
      clearTimeout(lockTimeout);
      clearTimeout(colorTimeout);
    };
  }, []);

  // Efeito de shake ao passar mouse no botão
  function handleBtnHover() {
    setShake(true);
    setTimeout(() => setShake(false), 600);
    setHint("Acesso restrito! Só admin mesmo. 😉");
    setTimeout(() => setHint("Dica: Peça acesso ao administrador ou tente novamente mais tarde."), 2500);
    setLockColor("#f59e42");
  }

  // Efeito de "tentar hackear" ao clicar no cadeado
  function handleLockClick() {
    setLockColor("#ef4444");
    setHint("Tentativa de hack detectada! 😅");
    setTimeout(() => setHint("Dica: Peça acesso ao administrador ou tente novamente mais tarde."), 2000);
    setShake(true);
    setTimeout(() => setShake(false), 700);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div
        ref={messageRef}
        className={`
          relative w-full max-w-md text-center
          bg-white border border-slate-200 rounded-2xl shadow-2xl
          px-8 py-10 overflow-hidden
          transition-all duration-300
          ${shake ? "animate-shake" : ""}
        `}
      >
        {/* Cadeado animado e interativo */}
        <div
          className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-2 z-10 select-none cursor-pointer group"
          onClick={handleLockClick}
          title="Tentar hackear"
        >
          <div
            className={`
              w-10 h-10 rounded-t-full border-4 border-b-0
              ${lockOpen ? "animate-unlock" : "animate-lock"}
              bg-transparent
              transition-colors
            `}
            style={{
              borderColor: `${lockColor} transparent transparent transparent`,
              marginBottom: "-8px",
            }}
          />
          <div
            className="w-14 h-10"
            style={{
              background: lockColor,
              borderRadius: "0.75rem 0.75rem 1.25rem 1.25rem",
              boxShadow: "0 2px 8px #0002",
              position: "relative",
              transition: "background 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="w-3 h-3 bg-white rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mt-16 mb-4 tracking-tight">
          Acesso não autorizado
        </h2>
        <p className="text-base text-slate-500 mb-8 leading-relaxed">
          Você não tem permissão para acessar esta página.<br />
          Apenas administradores podem visualizar este conteúdo.
        </p>
        <button
          onClick={() => (window.location.href = "/login")}
          onMouseEnter={handleBtnHover}
          className={`
            px-6 py-3 rounded-lg bg-slate-800 text-white font-semibold
            shadow hover:bg-slate-700 transition-all duration-200
            hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400
          `}
        >
          Voltar para o login
        </button>
        <div className="mt-8 text-xs text-slate-400 italic animate-pulse min-h-[1.5em]">
          {hint}
        </div>
        <style jsx>{`
          .fade-in {
            animation: fadeIn 0.8s cubic-bezier(.4,2,.6,.9) both;
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(32px) scale(0.97);}
            100% { opacity: 1; transform: translateY(0) scale(1);}
          }
          .animate-shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
          }
          @keyframes shake {
            10%, 90% { transform: translateX(-1px);}
            20%, 80% { transform: translateX(2px);}
            30%, 50%, 70% { transform: translateX(-4px);}
            40%, 60% { transform: translateX(4px);}
          }
          .animate-lock {
            animation: lockBounce 2.2s infinite cubic-bezier(.6,.05,.2,.95);
          }
          .animate-unlock {
            animation: unlock 1.2s cubic-bezier(.4,2,.6,.9) forwards;
          }
          @keyframes lockBounce {
            0%, 100% { transform: translateY(0);}
            10% { transform: translateY(-4px);}
            20% { transform: translateY(-8px);}
            30% { transform: translateY(-4px);}
            40%, 90% { transform: translateY(0);}
          }
          @keyframes unlock {
            0% { transform: rotate(0deg);}
            60% { transform: rotate(-30deg);}
            100% { transform: rotate(-60deg);}
          }
        `}</style>
      </div>
    </div>
  );
}