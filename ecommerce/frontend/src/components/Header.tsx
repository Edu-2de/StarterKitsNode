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
  const [moreOpen, setMoreOpen] = useState(false); // Novo campo "Mais opções"
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

  // Não trava o scroll do body, mas trava o scroll fora do menu
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

  // Impede scroll para o topo ao abrir/fechar categorias ou mais opções
  const handleCategoriesToggle = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    setCategoriesOpen((v) => {
      if (!v) setMoreOpen(false); // Fecha o outro se abrir este
      return !v;
    });
  };

  const handleMoreToggle = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    setMoreOpen((v) => {
      if (!v) setCategoriesOpen(false); // Fecha o outro se abrir este
      return !v;
    });
  };

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

  // Categorias mock
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

  // Mais opções mock
  const moreOptions = [
    "Opção A",
    "Opção B",
    "Opção C",
    "Opção D",
  ];

  return (
    <>
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
            <a
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
              Início
            </a>
            <a
              href="#"
              className={`px-3 py-2 rounded-full font-medium transition-colors duration-150 focus:outline-none ${navItemClass}`}
              style={{
                background: "transparent",
                textDecoration: "none",
                opacity: 1,
                color: "#444",
                display: "flex",
                alignItems: "center",
                gap: 4,
                cursor: "pointer"
              }}
              id="categories-btn"
              onClick={handleCategoriesToggle}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") handleCategoriesToggle(e);
              }}
            >
              Categorias
              <ChevronDownIcon
                className={`h-5 w-5 ml-1 transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`}
                style={{ color: "#888" }}
              />
            </a>
            <a
              href="#"
              className={`px-3 py-2 rounded-full font-medium transition-colors duration-150 focus:outline-none ${navItemClass}`}
              style={{
                background: "transparent",
                textDecoration: "none",
                opacity: 1,
                color: "#444",
                display: "flex",
                alignItems: "center",
                gap: 4,
                cursor: "pointer"
              }}
              id="more-btn"
              onClick={handleMoreToggle}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") handleMoreToggle(e);
              }}
            >
              Mais opções
              <ChevronDownIcon
                className={`h-5 w-5 ml-1 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                style={{ color: "#888" }}
              />
            </a>
            <a
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
                className="w-full px-3 py-2 rounded-full border border-neutral-200 bg-white text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition text-base shadow-sm"
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
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-neutral-500 hover:bg-neutral-100 transition"
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
                minWidth: 0,
                whiteSpace: "nowrap",
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
        {/* Sub-header de categorias (desktop) */}
        {categoriesOpen && (
          <div
            id="categories-panel"
            className="w-full flex justify-center z-50"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              marginTop: 72, // altura do header
              background: "#f7f7f7",
              borderBottom: "2px solid #e5e5e5",
              boxShadow: "0 2px 12px 0 #00000011",
              borderRadius: 0,
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
                  className="px-4 py-2 rounded text-base font-medium text-neutral-700 hover:bg-neutral-200 transition"
                  style={{
                    background: "#f7f7f7",
                    borderRadius: 6,
                    marginRight: 8,
                    marginBottom: 0,
                    border: "1px solid #ececec",
                    boxShadow: "none",
                  }}
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
            className="w-full flex justify-center z-50"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              marginTop: 72, // altura do header
              background: "#f7f7f7",
              borderBottom: "2px solid #e5e5e5",
              boxShadow: "0 2px 12px 0 #00000011",
              borderRadius: 0,
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
                  className="px-4 py-2 rounded text-base font-medium text-neutral-700 hover:bg-neutral-200 transition"
                  style={{
                    background: "#f7f7f7",
                    borderRadius: 6,
                    marginRight: 8,
                    marginBottom: 0,
                    border: "1px solid #ececec",
                    boxShadow: "none",
                  }}
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
          {/* Conteúdo do menu mobile com scroll só dentro dele */}
          <div
            className="w-full flex flex-col items-center justify-center"
            style={{
              background: "#fafafa",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              height: "calc(100vh - 72px)", // 72px = altura do header mobile
            }}
          >
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
              <a
                href="#"
                className={`w-full text-center text-xl font-bold rounded-2xl py-3 px-6 mb-2 transition-all duration-150 ${mobileDropdownItemClass}`}
                style={{
                  animation: `slideIn .3s cubic-bezier(.4,2,.6,.9) 0ms both`,
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
                Início
              </a>
              {/* Categorias mobile */}
              <details className="w-full" open={false}>
                <summary
                  className="w-full text-center text-xl font-bold rounded-2xl py-3 px-6 mb-2 transition-all duration-150 flex items-center justify-center cursor-pointer"
                  style={{
                    background: mobileDropdownItemBg,
                    boxShadow: mobileDropdownItemShadow,
                    color: "#444"
                  }}
                >
                  Categorias
                  <ChevronDownIcon className="h-5 w-5 ml-2" style={{ color: "#888" }} />
                </summary>
                <div className="flex flex-col gap-2 mt-2 pb-2">
                  {categories.map((cat) => (
                    <a
                      key={cat}
                      href="#"
                      className="w-full text-center px-4 py-2 rounded text-base font-medium text-neutral-700 hover:bg-neutral-100 transition"
                      style={{
                        background: "#fafafa",
                        borderRadius: 6,
                        border: "1px solid #ececec"
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              </details>
              {/* Mais opções mobile */}
              <details className="w-full" open={false}>
                <summary
                  className="w-full text-center text-xl font-bold rounded-2xl py-3 px-6 mb-2 transition-all duration-150 flex items-center justify-center cursor-pointer"
                  style={{
                    background: mobileDropdownItemBg,
                    boxShadow: mobileDropdownItemShadow,
                    color: "#444"
                  }}
                >
                  Mais opções
                  <ChevronDownIcon className="h-5 w-5 ml-2" style={{ color: "#888" }} />
                </summary>
                <div className="flex flex-col gap-2 mt-2 pb-2">
                  {moreOptions.map((opt) => (
                    <a
                      key={opt}
                      href="#"
                      className="w-full text-center px-4 py-2 rounded text-base font-medium text-neutral-700 hover:bg-neutral-100 transition"
                      style={{
                        background: "#fafafa",
                        borderRadius: 6,
                        border: "1px solid #ececec"
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {opt}
                    </a>
                  ))}
                </div>
              </details>
              <a
                href="#"
                className={`w-full text-center text-xl font-bold rounded-2xl py-3 px-6 mb-2 transition-all duration-150 ${mobileDropdownItemClass}`}
                style={{
                  animation: `slideIn .3s cubic-bezier(.4,2,.6,.9) 120ms both`,
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
                Sobre
              </a>
             
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
    </>
  );
}