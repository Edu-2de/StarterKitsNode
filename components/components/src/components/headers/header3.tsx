"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import classNames from "classnames";

// Menu principal com submenus
const menuItems = [
  {
    label: "Sobre",
    submenu: [
      { label: "Institucional", href: "#" },
      { label: "Histórico", href: "#" },
      { label: "Missão e Valores", href: "#" },
    ],
  },
  {
    label: "Cursos",
    submenu: [
      { label: "Graduação", href: "#" },
      { label: "Pós-graduação", href: "#" },
      { label: "Extensão", href: "#" },
    ],
  },
  {
    label: "Acadêmico",
    submenu: [
      { label: "Calendário", href: "#" },
      { label: "Biblioteca", href: "#" },
      { label: "Secretaria", href: "#" },
    ],
  },
  {
    label: "Contato",
    submenu: [
      { label: "Fale Conosco", href: "#" },
      { label: "Localização", href: "#" },
    ],
  },
];

// Botões à direita do header
const rightButtons = [
  {
    label: "Entrar",
    onClick: () => alert("Login..."),
    style: "outline",
  },
  {
    label: "Área do Aluno",
    onClick: () => alert("Área do Aluno..."),
    style: "solid",
  },
];

export default function AcademicHeader() {
  // Estado para submenus abertos (desktop e mobile)
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  // Estado para menu mobile aberto
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Header já está com fundo sólido?
  const [solid, setSolid] = useState(false);

  // Referência do header para detectar clique fora (desktop)
  const headerRef = useRef<HTMLDivElement>(null);

  // Fecha submenu ao clicar fora do header (apenas desktop)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Efeito do scroll para mudar o fundo do header
  useEffect(() => {
    function onScroll() {
      setSolid(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Funções para hover de submenu (desktop)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleMenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 100);
  };
  const handleMenuMouseEnter = (idx: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(idx);
  };
  const handleSubMenuMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
  const handleSubMenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 100);
  };

  // Funções para mobile: abrir/fechar submenus
  const [mobileOpenSubmenus, setMobileOpenSubmenus] = useState<{ [k: number]: boolean }>({});
  const handleMobileSubmenuToggle = (idx: number) => {
    setMobileOpenSubmenus((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <header
      ref={headerRef}
      className={classNames(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300",
        solid
          ? "bg-white/80 backdrop-blur-md shadow border-b border-gray-200"
          : "bg-transparent"
      )}
      style={{ backdropFilter: solid ? "blur(8px)" : undefined }}
    >
      {/* Linha superior */}
      <div className="max-w-7xl mx-auto flex items-center h-20 px-4 md:px-8">
        {/* Logo */}
        <div className="font-bold text-2xl text-gray-900 mr-6 md:mr-14 select-none tracking-tight flex-shrink-0">
          Logo
        </div>
        {/* Menu Desktop */}
        <nav className="flex-1 hidden md:block">
          <ul className="flex space-x-8">
            {menuItems.map((item, idx) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMenuMouseEnter(idx)}
                onMouseLeave={handleMenuMouseLeave}
              >
                <button
                  className={classNames(
                    "flex items-center gap-1 px-2 py-2 font-medium text-gray-800 hover:text-black transition-colors",
                    openMenu === idx && "text-black"
                  )}
                  type="button"
                  aria-haspopup={!!item.submenu}
                  aria-expanded={openMenu === idx}
                  onClick={() =>
                    setOpenMenu(openMenu === idx ? null : idx)
                  }
                >
                  {item.label}
                  {item.submenu && (
                    <svg
                      className={classNames(
                        "ml-1 w-4 h-4 text-gray-500 transform transition-transform duration-200",
                        openMenu === idx ? "-rotate-180 -translate-y-0.5" : "rotate-0"
                      )}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M19 9l-7 7-7-7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                {/* Submenu Desktop */}
                {item.submenu && openMenu === idx && (
                  <div
                    className="absolute left-0 top-full mt-2 z-30 bg-white border border-gray-200 rounded-md min-w-[180px] shadow-xl animate-fadein"
                    onMouseEnter={handleSubMenuMouseEnter}
                    onMouseLeave={handleSubMenuMouseLeave}
                  >
                    <ul>
                      {item.submenu.map((subitem) => (
                        <li key={subitem.label}>
                          <Link
                            href={subitem.href}
                            className="block px-5 py-2 text-gray-700 hover:bg-gray-100 hover:text-black text-sm transition-colors"
                            onClick={() => setOpenMenu(null)}
                          >
                            {subitem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Botões à direita - desktop */}
        <div className="hidden md:flex items-center space-x-4 ml-8">
          {rightButtons.map((btn, i) =>
            btn.style === "solid" ? (
              <button
                key={i}
                onClick={btn.onClick}
                className="px-5 py-2 rounded bg-gray-900 text-white font-semibold shadow hover:bg-gray-700 transition"
              >
                {btn.label}
              </button>
            ) : (
              <button
                key={i}
                onClick={btn.onClick}
                className="px-5 py-2 rounded border border-gray-900 text-gray-900 font-semibold hover:bg-gray-100 transition"
              >
                {btn.label}
              </button>
            )
          )}
        </div>
        {/* Botão menu mobile */}
        <button
          className="md:hidden ml-auto p-2 rounded hover:bg-gray-100 transition"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {/* Ícone do menu hamburguer ou X */}
          {mobileMenuOpen ? (
            <svg
              className="w-7 h-7 text-gray-900"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7 text-gray-900"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Menu Mobile - Drawer */}
      <nav
        className={classNames(
          "fixed inset-0 z-50 bg-black/40 transition-opacity",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Drawer lateral mobile */}
        <div
          className={classNames(
            "absolute top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-lg transform transition-transform duration-300",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100">
            <span className="font-bold text-xl text-gray-900 select-none tracking-tight">
              Logo
            </span>
            <button
              className="p-2 rounded hover:bg-gray-100 transition"
              aria-label="Fechar menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg
                className="w-7 h-7 text-gray-900"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {/* Menu Mobile */}
          <ul className="py-4 px-2">
            {menuItems.map((item, idx) => (
              <li key={item.label} className="mb-2">
                <button
                  className="flex items-center w-full justify-between px-3 py-3 text-base font-medium text-gray-800 hover:text-black rounded transition"
                  aria-haspopup={!!item.submenu}
                  aria-expanded={!!mobileOpenSubmenus[idx]}
                  onClick={() => handleMobileSubmenuToggle(idx)}
                  tabIndex={0}
                >
                  <span>{item.label}</span>
                  {item.submenu && (
                    <svg
                      className={classNames(
                        "ml-1 w-5 h-5 text-gray-500 transform transition-transform duration-200",
                        mobileOpenSubmenus[idx] ? "-rotate-180 -translate-y-0.5" : "rotate-0"
                      )}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M19 9l-7 7-7-7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                {/* Submenu Mobile */}
                {item.submenu && mobileOpenSubmenus[idx] && (
                  <ul className="pl-5 pr-3 pb-3 pt-1 animate-fadein">
                    {item.submenu.map((subitem) => (
                      <li key={subitem.label}>
                        <Link
                          href={subitem.href}
                          className="block py-2 text-gray-700 hover:bg-gray-100 hover:text-black rounded text-[15px] transition"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subitem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          {/* Botões mobile */}
          <div className="px-4 pb-6 pt-2 flex flex-col space-y-3">
            {rightButtons.map((btn, i) =>
              btn.style === "solid" ? (
                <button
                  key={i}
                  onClick={() => {
                    btn.onClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-5 py-3 rounded bg-gray-900 text-white font-semibold shadow hover:bg-gray-700 transition"
                >
                  {btn.label}
                </button>
              ) : (
                <button
                  key={i}
                  onClick={() => {
                    btn.onClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-5 py-3 rounded border border-gray-900 text-gray-900 font-semibold hover:bg-gray-100 transition"
                >
                  {btn.label}
                </button>
              )
            )}
          </div>
        </div>
      </nav>
      {/* Animação fade-in para submenu */}
      <style jsx>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadein {
          animation: fadein 0.20s ease;
        }
      `}</style>
    </header>
  );
}