"use client";
import { useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
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
  }

  function handleResultClick(result: string) {
    setSearch(result);
    setSearchOpen(false);
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

  // Fecha categorias ao clicar fora
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const catBtn = document.getElementById("categories-btn");
      const catPanel = document.getElementById("categories-panel");
      if (
        catBtn &&
        catPanel &&
        !catBtn.contains(e.target as Node) &&
        !catPanel.contains(e.target as Node)
      ) {
        setCategoriesOpen(false);
      }
    }
    if (categoriesOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [categoriesOpen]);

  // Fecha "Mais opções" ao clicar fora
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const moreBtn = document.getElementById("more-btn");
      const morePanel = document.getElementById("more-panel");
      if (
        moreBtn &&
        morePanel &&
        !moreBtn.contains(e.target as Node) &&
        !morePanel.contains(e.target as Node)
      ) {
        setMoreOpen(false);
      }
    }
    if (moreOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [moreOpen]);

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

  const categories = [
    "Eletrônicos",
    "Roupas",
    "Livros",
    "Casa & Jardim",
    "Esportes",
    "Beleza",
    "Brinquedos",
    "Automotivo",
  ];

  const moreOptions = [
    "Opção A",
    "Opção B",
    "Opção C",
    "Opção D",
  ];

  return (
    <>
      <header
        className={`bg-blue-700/90 backdrop-blur-md sticky top-0 z-50 transition-all border-b border-blue-800 shadow-lg`}
        style={{
          transform: visible || menuOpen ? "translateY(0)" : "translateY(-110%)",
          opacity: visible || menuOpen ? 1 : 0,
          pointerEvents: visible || menuOpen ? "auto" : "none",
          transition: "transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.25s",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-2">
          {/* Logo */}
          <span className="text-2xl font-extrabold tracking-tight select-none text-yellow-400 drop-shadow-sm">
            Shop<span className="text-white">Now</span>
          </span>

          {/* Navegação */}
          <nav className="hidden md:flex gap-6 items-center ml-8">
            <a
              href="#"
              className="px-3 py-2 rounded-full font-medium transition-colors duration-150 focus:outline-none text-white hover:bg-blue-800/80"
            >
              Início
            </a>
            <a
              href="#"
              className="px-3 py-2 rounded-full font-medium transition-colors duration-150 focus:outline-none text-white hover:bg-blue-800/80 flex items-center gap-1 cursor-pointer"
              id="categories-btn"
              onClick={e => {
                e.preventDefault();
                setCategoriesOpen(v => {
                  if (!v) setMoreOpen(false);
                  return !v;
                });
              }}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setCategoriesOpen(v => {
                    if (!v) setMoreOpen(false);
                    return !v;
                  });
                }
              }}
            >
              Categorias
              <ChevronDownIcon
                className={`h-5 w-5 ml-1 transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`}
              />
            </a>
            <a
              href="#"
              className="px-3 py-2 rounded-full font-medium transition-colors duration-150 focus:outline-none text-white hover:bg-blue-800/80 flex items-center gap-1 cursor-pointer"
              id="more-btn"
              onClick={e => {
                e.preventDefault();
                setMoreOpen(v => {
                  if (!v) setCategoriesOpen(false);
                  return !v;
                });
              }}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setMoreOpen(v => {
                    if (!v) setCategoriesOpen(false);
                    return !v;
                  });
                }
              }}
            >
              Mais opções
              <ChevronDownIcon
                className={`h-5 w-5 ml-1 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
              />
            </a>
            <a
              href="#"
              className="px-3 py-2 rounded-full font-medium transition-colors duration-150 focus:outline-none text-white hover:bg-blue-800/80"
            >
              Sobre
            </a>
          </nav>

          {/* Barra de pesquisa e botão entrar */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full max-w-xs hidden md:flex"
              autoComplete="off"
              style={{
                minWidth: 0,
                flex: 1,
                maxWidth: 320,
              }}
            >
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Buscar produtos..."
                className="w-full px-3 py-2 rounded-full border border-blue-200 bg-white text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-base shadow-sm"
                style={{
                  minWidth: 0,
                  fontSize: "1rem",
                  paddingLeft: 14,
                  paddingRight: 38,
                }}
                onFocus={() => search.length > 1 && setSearchOpen(true)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-blue-500 hover:bg-blue-100 transition"
                tabIndex={-1}
                style={{
                  background: "transparent",
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              {/* Dropdown de resultados */}
              {searchOpen && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-blue-200 rounded-xl shadow-lg z-30 overflow-hidden">
                  {searchResults.map((result, idx) => (
                    <button
                      key={result + idx}
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-900 transition"
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
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full font-bold text-base shadow transition focus:outline-none focus:ring-2 bg-yellow-400 text-blue-900 hover:bg-yellow-300"
              style={{
                border: "none",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                transition: "background 0.2s, color 0.2s",
                minWidth: 0,
                whiteSpace: "nowrap",
              }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="#1e3a8a" strokeWidth="1.5"/>
                <path d="M21 21c0-3.866-4.03-7-9-7s-9 3.134-9 7" stroke="#1e3a8a" strokeWidth="1.5"/>
              </svg>
              Entrar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full border border-blue-200 bg-white shadow transition focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen(true)}
          >
            <Bars3Icon className="h-7 w-7 text-blue-700" />
          </button>
        </div>

        {/* Linha abaixo do header */}
        <div className="h-1 bg-gradient-to-r from-blue-200 via-blue-100 to-yellow-100 opacity-80 w-full" />

        {/* Sub-header de categorias (desktop) */}
        {categoriesOpen && (
          <div
            id="categories-panel"
            className="w-full flex justify-center z-50 bg-blue-50 border-b border-blue-200 shadow"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              marginTop: 72,
              minHeight: 54,
              alignItems: "center",
              transition: "box-shadow 0.2s",
            }}
          >
            <div className="max-w-6xl w-full flex flex-wrap gap-2 px-4 py-3" style={{ alignItems: "center" }}>
              {categories.map((cat) => (
                <a
                  key={cat}
                  href="#"
                  className="px-4 py-2 rounded text-base font-medium text-blue-900 hover:bg-blue-100 transition border border-blue-100"
                  onClick={() => setCategoriesOpen(false)}
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        )}
        {/* Sub-header de mais opções (desktop) */}
        {moreOpen && (
          <div
            id="more-panel"
            className="w-full flex justify-center z-50 bg-blue-50 border-b border-blue-200 shadow"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              marginTop: 72,
              minHeight: 54,
              alignItems: "center",
              transition: "box-shadow 0.2s",
            }}
          >
            <div className="max-w-6xl w-full flex flex-wrap gap-2 px-4 py-3" style={{ alignItems: "center" }}>
              {moreOptions.map((opt) => (
                <a
                  key={opt}
                  href="#"
                  className="px-4 py-2 rounded text-base font-medium text-blue-900 hover:bg-blue-100 transition border border-blue-100"
                  onClick={() => setMoreOpen(false)}
                >
                  {opt}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-blue-50/95 backdrop-blur"
          style={{
            height: "100vh",
          }}
          onClick={handleBackdropClick}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-blue-200 bg-white/90">
            <span className="text-2xl font-extrabold tracking-tight select-none text-yellow-400">
              Shop<span className="text-blue-900">Now</span>
            </span>
            <button
              className="p-2 rounded-full shadow transition focus:outline-none bg-white text-blue-700 border border-blue-200"
              aria-label="Fechar menu"
              onClick={() => setMenuOpen(false)}
            >
              <XMarkIcon className="h-7 w-7" />
            </button>
          </div>
          <div
            className="w-full flex flex-col items-center justify-center overflow-y-auto"
            style={{
              height: "calc(100vh - 72px)",
            }}
          >
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
                className="w-full px-4 py-2 rounded-full border border-blue-200 bg-white text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-base shadow-sm"
                onFocus={() => search.length > 1 && setSearchOpen(true)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-blue-500 hover:bg-blue-100 transition"
                tabIndex={-1}
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              {searchOpen && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-blue-200 rounded-xl shadow-lg z-30 overflow-hidden">
                  {searchResults.map((result, idx) => (
                    <button
                      key={result + idx}
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-900 transition"
                      onClick={() => handleResultClick(result)}
                    >
                      {result}
                    </button>
                  ))}
                </div>
              )}
            </form>
            <nav className="flex flex-col gap-4 px-8 py-10 items-center w-full max-w-md mx-auto">
              <a
                href="#"
                className="w-full text-center text-xl font-bold rounded-2xl py-3 px-6 mb-2 transition-all duration-150 text-blue-900 bg-white hover:bg-blue-100 shadow"
                onClick={() => setMenuOpen(false)}
              >
                Início
              </a>
              {/* Categorias mobile */}
              <details className="w-full">
                <summary
                  className="w-full text-center text-xl font-bold rounded-2xl py-3 px-6 mb-2 transition-all duration-150 flex items-center justify-center cursor-pointer bg-white text-blue-900 hover:bg-blue-100 shadow"
                >
                  Categorias
                  <ChevronDownIcon className="h-5 w-5 ml-2" />
                </summary>
                <div className="flex flex-col gap-2 mt-2 pb-2">
                  {categories.map((cat) => (
                    <a
                      key={cat}
                      href="#"
                      className="w-full text-center px-4 py-2 rounded text-base font-medium text-blue-900 hover:bg-blue-100 transition border border-blue-100 bg-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              </details>
              {/* Mais opções mobile */}
              <details className="w-full">
                <summary
                  className="w-full text-center text-xl font-bold rounded-2xl py-3 px-6 mb-2 transition-all duration-150 flex items-center justify-center cursor-pointer bg-white text-blue-900 hover:bg-blue-100 shadow"
                >
                  Mais opções
                  <ChevronDownIcon className="h-5 w-5 ml-2" />
                </summary>
                <div className="flex flex-col gap-2 mt-2 pb-2">
                  {moreOptions.map((opt) => (
                    <a
                      key={opt}
                      href="#"
                      className="w-full text-center px-4 py-2 rounded text-base font-medium text-blue-900 hover:bg-blue-100 transition border border-blue-100 bg-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      {opt}
                    </a>
                  ))}
                </div>
              </details>
              <a
                href="#"
                className="w-full text-center text-xl font-bold rounded-2xl py-3 px-6 mb-2 transition-all duration-150 text-blue-900 bg-white hover:bg-blue-100 shadow"
                onClick={() => setMenuOpen(false)}
              >
                Sobre
              </a>
              {/* Login/Register CTA mobile */}
              <div className="w-full flex flex-col items-center mt-6">
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold text-lg shadow transition focus:outline-none focus:ring-2 bg-yellow-400 text-blue-900 hover:bg-yellow-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="#1e3a8a" strokeWidth="1.5"/>
                    <path d="M21 21c0-3.866-4.03-7-9-7s-9 3.134-9 7" stroke="#1e3a8a" strokeWidth="1.5"/>
                  </svg>
                  Entrar
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}