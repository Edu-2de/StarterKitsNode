"use client";
import { useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const lastScroll = useRef(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Simulação de busca (mock)
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      setSearchResults(
        ["Produto 1", "Produto 2", "Produto 3", "Produto 4"].filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        )
      );
      setSearchOpen(true);
    } else {
      setSearchResults([]);
      setSearchOpen(false);
    }
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSearchOpen(false);
    // Exemplo: router.push(`/busca?q=${encodeURIComponent(search)}`)
  }

  function handleResultClick(result: string) {
    setSearch(result);
    setSearchOpen(false);
    // Aqui você pode navegar para a página do resultado
  }

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    }
    if (searchOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [searchOpen]);

  // Controla o header sumir só quando o menu não está aberto
  useEffect(() => {
    if (menuOpen) return;

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < 10) {
            setVisible(true);
          } else if (scrollY > lastScroll.current) {
            setVisible(false);
          } else {
            setVisible(true);
          }
          lastScroll.current = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setMenuOpen(false);
    }
  }

  // Cores neutras
  const logoTextClass = "logo-text-light";
  const svgStroke = "#444";
  const navItemClass = "nav-item-light";
  const navItemHover = "#888";
  const navBg = "rgba(245,245,245,0.95)";
  const navBorder = "1px solid #e5e5e5";
  const navShadow = "0 1px 6px 0 rgba(180,180,180,0.06)";
  const btnBg = "#fff";
  const btnText = "#444";
  const btnBgHover = "#f3f3f3";
  const btnShadow = "0 2px 8px 0 #e5e5e5";

  // Mobile dropdown styles (neutras)
  const mobileDropdownBg = "#fafafa";
  const mobileDropdownItemBg = "#fff";
  const mobileDropdownItemClass = "nav-item-light";
  const mobileDropdownItemShadow = "0 2px 12px 0 #00000011";

  // Linha abaixo do header
  const headerLine = (
    <div
      style={{
        height: 2,
        background: "linear-gradient(90deg, #e5e5e5 0%, #f3f3f3 100%)",
        width: "100%",
        margin: 0,
        padding: 0,
        opacity: 0.7,
      }}
    />
  );

  return (
    <header
      className="backdrop-blur-md sticky top-0 z-50 transition-all"
      style={{
        background: navBg,
        borderBottom: navBorder,
        boxShadow: navShadow,
        transform: visible || menuOpen ? "translateY(0)" : "translateY(-110%)",
        opacity: visible || menuOpen ? 1 : 0,
        pointerEvents: visible || menuOpen ? "auto" : "none",
        transition: "transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.25s",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-2">
        {/* Logo */}
        <span
          className="text-2xl font-extrabold tracking-tight select-none"
          style={{
            textShadow: "0 1px 8px rgba(233,196,106,0.08)",
            letterSpacing: "-0.03em",
            color: "#444"
          }}
        >
          <span className={logoTextClass}>Logo</span>
        </span>

        {/* Navegação */}
        <nav className="hidden md:flex gap-6 items-center ml-8">
          {["Início", "Sobre", "Contato"].map((item) => (
            <a
              key={item}
              href="#"
              className={`px-3 py-2 rounded-full font-medium transition-colors duration-150 focus:outline-none ${navItemClass}`}
              style={{
                background: "transparent",
                textDecoration: "none",
                opacity: 1,
                color: "#444"
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLElement).style.color = navItemHover;
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLElement).style.color = "#444";
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Barra de pesquisa e botão entrar */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          <form
            onSubmit={handleSearchSubmit}
            className="relative max-w-xs w-full hidden md:flex"
            autoComplete="off"
          >
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Buscar produtos..."
              className="w-full px-4 py-2 rounded-full border border-neutral-200 bg-white text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition text-base shadow-sm"
              onFocus={() => search.length > 1 && setSearchOpen(true)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-neutral-500 hover:bg-neutral-100 transition"
              tabIndex={-1}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            {/* Dropdown de resultados */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg z-30 overflow-hidden">
                {searchResults.map((result, idx) => (
                  <button
                    key={result + idx}
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 text-neutral-700 transition"
                    onClick={() => handleResultClick(result)}
                  >
                    {result}
                  </button>
                ))}
              </div>
            )}
          </form>
          <Link
            href="/login"
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full font-bold text-base shadow transition focus:outline-none focus:ring-2"
            style={{
              background: btnBg,
              color: btnText,
              boxShadow: btnShadow,
              border: "none",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLElement).style.background = btnBgHover;
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLElement).style.background = btnBg;
            }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke={svgStroke} strokeWidth="1.5"/>
              <path d="M21 21c0-3.866-4.03-7-9-7s-9 3.134-9 7" stroke={svgStroke} strokeWidth="1.5"/>
            </svg>
            Entrar
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full border border-neutral-200 bg-white shadow transition focus:outline-none focus:ring-2 focus:ring-neutral-300"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(true)}
          style={{
            background: "#fff",
            color: "#444",
            border: "1px solid #e5e5e5",
            boxShadow: "0 2px 8px 0 #e5e5e5"
          }}
        >
          <Bars3Icon className="h-7 w-7" style={{ color: "#888" }} />
        </button>
      </div>

      {/* Linha abaixo do header */}
      {headerLine}

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{
            background: mobileDropdownBg,
            backdropFilter: "blur(6px)",
            height: "100vh",
          }}
          onClick={handleBackdropClick}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200"
            style={{
              background: "#fafafa",
              borderBottom: "1px solid #e5e5e5"
            }}>
            {/* Troca para "Logo" no mobile */}
            <span className="text-2xl font-extrabold tracking-tight select-none" style={{ color: "#444" }}>
              Logo
            </span>
            <button
              className="p-2 rounded-full shadow transition focus:outline-none"
              style={{
                background: "#fff",
                color: "#888",
                border: "none"
              }}
              aria-label="Fechar menu"
              onClick={() => setMenuOpen(false)}
            >
              <XMarkIcon className="h-7 w-7" style={{ color: "#888" }} />
            </button>
          </div>
          <div className="flex-1 w-full flex flex-col items-center justify-center"
            style={{
              background: "#fafafa"
            }}>
            {/* Barra de pesquisa mobile */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full max-w-xs mx-auto mb-8 flex"
              autoComplete="off"
            >
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Buscar produtos..."
                className="w-full px-4 py-2 rounded-full border border-neutral-200 bg-white text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition text-base shadow-sm"
                onFocus={() => search.length > 1 && setSearchOpen(true)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-neutral-500 hover:bg-neutral-100 transition"
                tabIndex={-1}
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              {searchOpen && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg z-30 overflow-hidden">
                  {searchResults.map((result, idx) => (
                    <button
                      key={result + idx}
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-neutral-100 text-neutral-700 transition"
                      onClick={() => handleResultClick(result)}
                    >
                      {result}
                    </button>
                  ))}
                </div>
              )}
            </form>
            <nav className="flex flex-col gap-4 px-8 py-10 items-center animate-fade-in-down w-full max-w-md mx-auto">
              {["Início", "Sobre", "Contato"].map((item, idx) => (
                <a
                  key={item}
                  href="#"
                  className={`w-full text-center text-xl font-bold rounded-2xl py-3 px-6 mb-2 transition-all duration-150 ${mobileDropdownItemClass}`}
                  style={{
                    animation: `slideIn .3s cubic-bezier(.4,2,.6,.9) ${idx * 60}ms both`,
                    background: mobileDropdownItemBg,
                    opacity: 1,
                    boxShadow: mobileDropdownItemShadow,
                    color: "#444"
                  }}
                  onClick={() => setMenuOpen(false)}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLElement).style.color = "#888";
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLElement).style.color = "#444";
                  }}
                >
                  {item}
                </a>
              ))}
              {/* Login/Register CTA mobile */}
              <div className="w-full flex flex-col items-center mt-6">
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold text-lg shadow transition focus:outline-none focus:ring-2"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: btnBg,
                    color: btnText,
                    border: "none",
                    boxShadow: btnShadow,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLElement).style.background = btnBgHover;
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLElement).style.background = btnBg;
                  }}
                >
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke={svgStroke} strokeWidth="1.5"/>
                    <path d="M21 21c0-3.866-4.03-7-9-7s-9 3.134-9 7" stroke={svgStroke} strokeWidth="1.5"/>
                  </svg>
                  Entrar
                </Link>
              </div>
            </nav>
          </div>
          <style jsx>{`
            @keyframes slideIn {
              0% {
                opacity: 0;
                transform: translateY(32px) scale(0.98);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}</style>
        </div>
      )}
    </header>
  );
}