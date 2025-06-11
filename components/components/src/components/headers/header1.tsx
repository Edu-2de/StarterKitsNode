'use client';
import { useState } from "react";
import React from "react";

export default function Header1() {
  const [itemMenu, setItemMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);
  const [dropdownHover, setDropdownHover] = useState(false);

  // Fecha dropdown ao clicar fora (desktop)
  React.useEffect(() => {
    if (!itemMenu) return;
    const close = () => setItemMenu(false);
    window.addEventListener("scroll", close);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("resize", close);
    };
  }, [itemMenu]);

  // Mantém hover no botão enquanto mouse está no dropdown
  const isDropdownActive = itemMenu || dropdownHover;

  return (
    <header
      className="fixed left-1/2 top-6 z-50 w-[95vw] max-w-4xl -translate-x-1/2 bg-[#f8fafc] border border-blue-900/20 shadow-xl rounded-2xl transition-all duration-300"
      style={{
        boxShadow: "0 8px 32px 0 rgba(30,41,59,0.10), 0 1.5px 8px 0 rgba(30,41,59,0.08)",
        filter: "drop-shadow(0 8px 24px rgba(30,41,59,0.08))",
      }}
    >
      <div className="px-7">
        <div className="flex items-center justify-between py-3">
          <h1 className="text-2xl font-extrabold text-blue-900 tracking-tight select-none">Brand</h1>
          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 justify-center">
            <ul className="flex space-x-7 items-center">
              <NavLink href="#home" label="Home" />
              <NavLink href="#about" label="About" />
              <NavLink href="#contact" label="Contact" />
              {/* Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setItemMenu(true)}
                onMouseLeave={() => {
                  setItemMenu(false);
                  setSubmenuOpen(null);
                  setDropdownHover(false);
                }}
              >
                <button
                  className={`transition px-5 py-2 rounded-xl font-semibold flex items-center gap-2
                    ${isDropdownActive ? "bg-blue-900/90 text-white shadow-md" : "text-blue-900 hover:bg-blue-900/10"}
                  `}
                  aria-haspopup="true"
                  aria-expanded={itemMenu}
                  style={{
                    transition: "box-shadow 0.2s, background 0.2s, color 0.2s",
                    boxShadow: isDropdownActive
                      ? "0 4px 16px 0 rgba(30,41,59,0.13)"
                      : undefined,
                  }}
                >
                  Explorar
                  <svg className={`w-4 h-4 ml-1 transition-transform ${isDropdownActive ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Ponte invisível para hover perfeito */}
                {itemMenu && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full"
                    style={{ height: 32, width: 320, pointerEvents: "auto" }}
                    onMouseEnter={() => setDropdownHover(true)}
                    onMouseLeave={() => setDropdownHover(false)}
                  />
                )}
                {/* Dropdown Menu */}
                {itemMenu && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-4 min-w-[500px] bg-white text-blue-900 shadow-xl rounded-2xl flex p-6 gap-10 z-50 border border-blue-900/10
                      transition-all duration-300"
                    style={{
                      boxShadow: "0 12px 32px 0 rgba(30,41,59,0.13), 0 2px 8px 0 rgba(30,41,59,0.10)",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                    onMouseEnter={() => setDropdownHover(true)}
                    onMouseLeave={() => setDropdownHover(false)}
                  >
                    {/* Coluna 1 */}
                    <div className="flex flex-col gap-1 min-w-[180px]">
                      <DropdownItem
                        label="Produtos"
                        onMouseEnter={() => setSubmenuOpen("produtos")}
                        onMouseLeave={() => setSubmenuOpen(null)}
                        submenuOpen={submenuOpen === "produtos"}
                        submenu={[
                          { href: "#produto-a", label: "Produto A" },
                          { href: "#produto-b", label: "Produto B" },
                          { href: "#produto-c", label: "Produto C" },
                        ]}
                      />
                      <DropdownItem
                        label="Serviços"
                        onMouseEnter={() => setSubmenuOpen("servicos")}
                        onMouseLeave={() => setSubmenuOpen(null)}
                        submenuOpen={submenuOpen === "servicos"}
                        submenu={[
                          { href: "#consultoria", label: "Consultoria" },
                          { href: "#suporte", label: "Suporte" },
                          { href: "#treinamento", label: "Treinamento" },
                        ]}
                      />
                      <DropdownItem
                        label="Sobre nós"
                        href="#sobre"
                      />
                    </div>
                    {/* Coluna 2 */}
                    <div className="flex flex-col gap-1 min-w-[180px]">
                      <DropdownItem
                        label="Minha Conta"
                        onMouseEnter={() => setSubmenuOpen("conta")}
                        onMouseLeave={() => setSubmenuOpen(null)}
                        submenuOpen={submenuOpen === "conta"}
                        submenu={[
                          { href: "#perfil", label: "Perfil" },
                          { href: "#pedidos", label: "Pedidos" },
                          { href: "#configuracoes", label: "Configurações" },
                        ]}
                      />
                      <DropdownItem
                        label="Ajuda"
                        href="#ajuda"
                      />
                      <DropdownItem
                        label="Blog"
                        href="#blog"
                      />
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </nav>
          {/* Actions */}
          <div className="ml-4 gap-3 flex items-center">
            <button className="text-blue-900 bg-blue-100/70 hover:bg-blue-200 transition px-4 py-2 rounded-xl font-semibold shadow-sm border border-blue-100 hidden md:block">Contato</button>
            <button className="text-white bg-blue-900 hover:bg-blue-800 transition px-5 py-2 rounded-xl font-bold shadow hidden md:block">Login</button>
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-xl bg-blue-100 hover:bg-blue-200 border border-blue-100"
              onClick={() => setMobileMenu((open) => !open)}
              aria-label="Abrir menu"
            >
              <svg className="w-7 h-7 text-blue-900" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Nav */}
      {mobileMenu && (
        <MobileFullScreenMenu onClose={() => setMobileMenu(false)} />
      )}
    </header>
  );
}

// NOVO: Menu mobile fullscreen com dropdown animado
function MobileFullScreenMenu({ onClose }: { onClose: () => void }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fecha dropdown ao clicar fora
  React.useEffect(() => {
    if (!dropdownOpen) return;
    const close = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("#mobile-dropdown-panel")) return;
      setDropdownOpen(false);
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [dropdownOpen]);

  return (
    <div className="fixed inset-0 z-[999] bg-blue-900/95 flex flex-col md:hidden transition-all">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5">
        <span className="text-xl font-bold text-white tracking-widest select-none">Brand</span>
        <button
          className="p-2 rounded-full bg-blue-800 hover:bg-blue-700 transition"
          onClick={onClose}
          aria-label="Fechar menu"
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* Main menu or Dropdown */}
      {!dropdownOpen ? (
        <nav className="flex-1 flex flex-col gap-2 px-6 pt-2">
          <a href="#home" className="text-blue-900 hover:bg-blue-100/90   rounded-xl px-4 py-3 font-semibold transition text-lg ">Home</a>
          <a href="#about" className="text-blue-900 hover:bg-blue-100/90  rounded-xl px-4 py-3 font-semibold transition text-lg ">About</a>
          <a href="#contact" className="text-blue-900 hover:bg-blue-100/90 rounded-xl px-4 py-3 font-semibold transition text-lg ">Contact</a>
          <button
            className="flex items-center justify-between w-full hover:bg-blue-900 hover:text-white/90  rounded-xl px-4 py-3 font-semibold transition text-lg text-blue-900"
            onClick={() => setDropdownOpen(true)}
            aria-expanded={dropdownOpen}
            aria-controls="mobile-dropdown-panel"
          >
            Explorar
            <span className={`ml-2 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          <div className="flex flex-col gap-3 mt-6">
            <button className="text-blue-900 bg-white hover:bg-blue-100 rounded-xl px-4 py-3 font-semibold transition border border-blue-100 shadow">Contato</button>
            <button className="text-white bg-blue-800 hover:bg-blue-700 transition px-4 py-3 rounded-xl font-bold shadow">Login</button>
          </div>
        </nav>
      ) : (
        <div
          id="mobile-dropdown-panel"
          className="absolute inset-0 bg-white z-[1000] flex flex-col p-0 animate-fadeIn"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-blue-100">
            <span className="text-xl font-bold text-blue-900 tracking-widest select-none">Explorar</span>
            <button
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 border border-blue-100 shadow transition"
              onClick={() => setDropdownOpen(false)}
              aria-label="Fechar menu"
            >
              <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-4 px-6 py-8">
            <details open className="group">
              <summary className="cursor-pointer hover:bg-blue-50 rounded-xl px-3 py-2 font-medium transition select-none text-lg text-blue-900">Produtos</summary>
              <div className="pl-4 flex flex-col gap-1">
                <a href="#produto-a" className="hover:underline text-blue-900 px-2 py-1 rounded transition">Produto A</a>
                <a href="#produto-b" className="hover:underline text-blue-900 px-2 py-1 rounded transition">Produto B</a>
                <a href="#produto-c" className="hover:underline text-blue-900 px-2 py-1 rounded transition">Produto C</a>
              </div>
            </details>
            <details className="group">
              <summary className="cursor-pointer hover:bg-blue-50 rounded-xl px-3 py-2 font-medium transition select-none text-lg text-blue-900">Serviços</summary>
              <div className="pl-4 flex flex-col gap-1">
                <a href="#consultoria" className="hover:underline text-blue-900 px-2 py-1 rounded transition">Consultoria</a>
                <a href="#suporte" className="hover:underline text-blue-900 px-2 py-1 rounded transition">Suporte</a>
                <a href="#treinamento" className="hover:underline text-blue-900 px-2 py-1 rounded transition">Treinamento</a>
              </div>
            </details>
            <a href="#sobre" className="hover:underline text-blue-900 px-3 py-2 rounded transition text-lg">Sobre nós</a>
            <details className="group">
              <summary className="cursor-pointer hover:bg-blue-50 rounded-xl px-3 py-2 font-medium transition select-none text-lg text-blue-900">Minha Conta</summary>
              <div className="pl-4 flex flex-col gap-1">
                <a href="#perfil" className="hover:underline text-blue-900 px-2 py-1 rounded transition">Perfil</a>
                <a href="#pedidos" className="hover:underline text-blue-900 px-2 py-1 rounded transition">Pedidos</a>
                <a href="#configuracoes" className="hover:underline text-blue-900 px-2 py-1 rounded transition">Configurações</a>
              </div>
            </details>
            <a href="#ajuda" className="hover:underline text-blue-900 px-3 py-2 rounded transition text-lg">Ajuda</a>
            <a href="#blog" className="hover:underline text-blue-900 px-3 py-2 rounded transition text-lg">Blog</a>
          </div>
        </div>
      )}
    </div>
  );
}

// NavLink utilitário
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a href={href} className="text-blue-900 hover:bg-blue-100 transition px-5 py-2 rounded-xl font-semibold text-base">{label}</a>
    </li>
  );
}

// DropdownItem clean, elegante, com ponte invisível maior e efeito flutuante
function DropdownItem({
  label,
  href,
  submenu,
  submenuOpen,
  onMouseEnter,
  onMouseLeave,
}: {
  label: string;
  href?: string;
  submenu?: { href: string; label: string }[];
  submenuOpen?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div
      className="group relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {href ? (
        <a href={href} className="block px-4 py-2 rounded-xl hover:bg-blue-100 hover:text-blue-900 transition font-semibold">
          {label}
        </a>
      ) : (
        <span className="block px-4 py-2 rounded-xl hover:bg-blue-100 hover:text-blue-900 transition cursor-pointer font-semibold">
          {label}
        </span>
      )}
      {/* Ponte invisível maior para hover perfeito */}
      {submenu && submenuOpen && (
        <div
          className="absolute left-full top-0 w-16 h-full z-40"
          style={{ pointerEvents: "auto" }}
        />
      )}
      {submenu && (
        <div
          className={`absolute left-full top-1/2 -translate-y-1/2 ml-4 min-w-[200px] bg-white rounded-2xl shadow-xl z-50 flex-col transition-all duration-200 border border-blue-900/10
            ${submenuOpen ? "flex opacity-100 translate-x-0" : "hidden opacity-0 -translate-x-2"}
          `}
          style={{
            boxShadow: "0 8px 32px 0 rgba(30,41,59,0.10), 0 1.5px 8px 0 rgba(30,41,59,0.08)",
            filter: "drop-shadow(0 8px 24px rgba(30,41,59,0.08))",
          }}
        >
          {submenu.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-blue-900 hover:bg-blue-100 hover:text-blue-900 transition rounded-xl"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}