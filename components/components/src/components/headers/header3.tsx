import React, { useEffect, useRef, useState } from "react";

// Links do menu
const navLinks = [
  { name: "Início", href: "#" },
  { name: "Cursos", href: "#" },
  { name: "Professores", href: "#" },
  { name: "Eventos", href: "#" },
  { name: "Contato", href: "#" },
];

export default function Header3() {
  const underlineRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Efeito underline animado no menu (desktop)
  useEffect(() => {
    if (mobileOpen) return;
    const nav = document.getElementById("main-nav");
    const underline = underlineRef.current;
    if (!nav || !underline) return;

    function moveUnderline(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName !== "A") return;
      if (!underlineRef.current) return;
      const rect = target.getBoundingClientRect();
      underlineRef.current.style.width = `${rect.width}px`;
      underlineRef.current.style.left = `${target.offsetLeft}px`;
      underlineRef.current.style.opacity = "1";
    }

    function resetUnderline() {
      if (underline) {
        underline.style.opacity = "0";
      }
    }

    nav.addEventListener("mouseover", moveUnderline);
    nav.addEventListener("mouseleave", resetUnderline);

    return () => {
      nav.removeEventListener("mouseover", moveUnderline);
      nav.removeEventListener("mouseleave", resetUnderline);
    };
  }, [mobileOpen]);

  // Efeito de header "glass" ao rolar
  useEffect(() => {
    function onScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Efeito de animação 3D no logo com JS (parallax + hover)
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    function handleMouseMove(e: MouseEvent) {
      if (!logo) return;
      const rect = logo.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 12;
      const rotateY = (x / rect.width) * 12;
      logo.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.07,1.07,1.07)`;
      logo.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 32px 0 rgba(30,64,175,0.10)`;
    }
    function handleMouseLeave() {
      if (!logo) return;
      logo.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
      logo.style.boxShadow = "";
    }
    logo.addEventListener("mousemove", handleMouseMove);
    logo.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      logo.removeEventListener("mousemove", handleMouseMove);
      logo.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Efeito de menu sticky com sombra dinâmica
  const headerClass =
    "fixed top-0 left-0 w-full z-30 transition-all duration-300 " +
    (scrollY > 10
      ? "bg-white/80 backdrop-blur-lg shadow-xl border-b border-slate-200"
      : "bg-white/60 backdrop-blur-md shadow-none border-b border-transparent");

  function handleActive(name: string) {
    setActive(name);
    setMobileOpen(false);
  }

  function isActive(name: string) {
    return active === name;
  }

  function ripple(e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) {
    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
    circle.className =
      "absolute bg-blue-200 opacity-40 rounded-full animate-[ripple_0.6s_linear] pointer-events-none";
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  }

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        {/* Logo minimalista com efeito JS */}
        <div
          ref={logoRef}
          className="flex items-center gap-3 select-none transition-transform duration-300 will-change-transform cursor-pointer"
          style={{ perspective: 600 }}
          tabIndex={0}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-slate-900 to-slate-600 flex items-center justify-center shadow-lg transition-all duration-300">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <rect x={3} y={7} width={18} height={10} rx={3} fill="#fff" opacity={0.9} />
              <rect x={7} y={3} width={10} height={18} rx={3} fill="#fff" opacity={0.7} />
            </svg>
          </div>
          <span className="text-xl font-semibold text-slate-900 tracking-tight">
            Logo
          </span>
        </div>
        {/* Desktop nav */}
        <nav
          id="main-nav"
          className="relative hidden md:flex gap-2 md:gap-4 font-medium text-slate-700"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={
                "relative px-3 py-1 rounded transition-colors duration-200 hover:text-blue-700 focus:text-blue-700 overflow-hidden" +
                (isActive(link.name) ? " text-blue-700 font-bold" : "")
              }
              tabIndex={0}
              onClick={(e) => {
                handleActive(link.name);
                ripple(e);
              }}
            >
              {link.name}
              {/* Indicador ativo */}
              {isActive(link.name) && (
                <span className="absolute left-1/2 -bottom-1 w-3 h-1 bg-blue-600 rounded-full -translate-x-1/2 animate-pulse" />
              )}
            </a>
          ))}
          {/* Underline animado */}
          <div
            ref={underlineRef}
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-slate-700 rounded transition-all duration-300 pointer-events-none opacity-0"
            style={{ transitionProperty: "width,left,opacity" }}
          />
        </nav>
        {/* Botão de ação com ripple (desktop) */}
        <a
          href="#"
          className="hidden md:inline-block ml-4 px-4 py-1.5 rounded-md bg-slate-900 text-white font-medium shadow hover:bg-blue-700 transition-colors duration-200 relative overflow-hidden"
          onClick={ripple}
        >
          Área do Aluno
        </a>
        {/* Botão menu mobile */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-200 transition relative overflow-hidden"
          aria-label="Abrir menu"
          onClick={(e) => {
            setMobileOpen((v) => !v);
            ripple(e);
          }}
        >
          <span className="sr-only">Abrir menu</span>
          <svg width={26} height={26} fill="none" viewBox="0 0 24 24">
            <rect x={4} y={7} width={16} height={2} rx={1} fill="#222" />
            <rect x={4} y={15} width={16} height={2} rx={1} fill="#222" />
          </svg>
        </button>
      </div>
      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />
      {/* Mobile menu drawer */}
      <aside
        className={`md:hidden fixed top-0 right-0 z-50 h-full w-[90vw] max-w-xs bg-white shadow-2xl border-l border-slate-200 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Menu mobile"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
          <span className="text-lg font-semibold text-slate-900">Menu</span>
          <button
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 transition relative overflow-hidden"
            aria-label="Fechar menu"
            onClick={(e) => {
              setMobileOpen(false);
              ripple(e);
            }}
          >
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
              <line x1="6" y1="6" x2="18" y2="18" stroke="#222" strokeWidth={2} />
              <line x1="18" y1="6" x2="6" y2="18" stroke="#222" strokeWidth={2} />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-4 py-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={
                "px-3 py-2 rounded text-base font-medium transition-colors duration-200 relative overflow-hidden " +
                (isActive(link.name)
                  ? "bg-blue-50 text-blue-700 font-bold"
                  : "text-slate-700 hover:bg-slate-100")
              }
              onClick={(e) => {
                handleActive(link.name);
                ripple(e);
              }}
            >
              {link.name}
              {isActive(link.name) && (
                <span className="absolute left-1/2 -bottom-1 w-3 h-1 bg-blue-600 rounded-full -translate-x-1/2 animate-pulse" />
              )}
            </a>
          ))}
          <a
            href="#"
            className="mt-4 px-4 py-2 rounded-md bg-slate-900 text-white font-medium shadow hover:bg-blue-700 transition-colors duration-200 relative overflow-hidden"
            onClick={ripple}
          >
            Área do Aluno
          </a>
        </nav>
      </aside>
    </header>
  );
}

/*
Adicione ao seu Tailwind CSS:
@layer utilities {
  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2.5);
    }
  }
}
*/