"use client";
import { useEffect, useRef, useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function HeaderEcommerce() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const lastScroll = useRef(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // --- Autenticação ---
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const userName = typeof window !== "undefined" ? localStorage.getItem("userName") : null;
    if (token && userName) {
      setUser({ name: userName });
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const userBtn = document.getElementById("user-btn");
      const userPanel = document.getElementById("user-panel");
      if (
        userBtn &&
        userPanel &&
        !userBtn.contains(e.target as Node) &&
        !userPanel.contains(e.target as Node)
      ) {
        setUserDropdown(false);
      }
    }
    if (userDropdown) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userDropdown]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUser(null);
    setUserDropdown(false);
    window.location.href = "/login";
  }

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

  const moreOptions = ["Opção A", "Opção B", "Opção C", "Opção D"];

  // Badge de carrinho fictício
  const cartCount = 2;

  // Cores principais do e-commerce (exemplo: azul)
  const primary = "bg-blue-600";
  const primaryHover = "hover:bg-blue-700";
  const primaryText = "text-white";
  const neutralBg = "bg-white";
  const neutralBorder = "border-gray-200";

  return (
    <>
      {/* Barra superior (info extra) */}
      <div className="w-full py-1 px-4 bg-blue-50 text-blue-800 text-sm text-center font-medium select-none">
        Frete grátis para pedidos acima de R$ 199
      </div>
      <header
        className={`sticky top-0 z-50 shadow-lg border-b ${neutralBorder} ${neutralBg} transition-all`}
        style={{
          transform: visible || menuOpen ? "translateY(0)" : "translateY(-110%)",
          opacity: visible || menuOpen ? 1 : 0,
          pointerEvents: visible || menuOpen ? "auto" : "none",
          transition: "transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.25s",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-2">
          {/* Logo */}
          <span className="text-2xl font-extrabold tracking-tight select-none text-blue-700 drop-shadow-sm">
            E-Shop
          </span>

          {/* Navegação */}
          <nav className="hidden md:flex gap-6 items-center ml-8">
            <a
              href="#"
              className="px-3 py-2 rounded font-semibold transition-colors duration-150 focus:outline-none text-blue-700 hover:bg-blue-50"
            >
              Início
            </a>
            <a
              href="#"
              id="categories-btn"
              className="px-3 py-2 rounded font-semibold flex items-center gap-1 text-blue-700 hover:bg-blue-50 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setCategoriesOpen((v) => {
                  if (!v) setMoreOpen(false);
                  return !v;
                });
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setCategoriesOpen((v) => {
                    if (!v) setMoreOpen(false);
                    return !v;
                  });
                }
              }}
            >
              Categorias
              <ChevronDownIcon
                className={`h-5 w-5 ml-1 transition-transform duration-200 ${
                  categoriesOpen ? "rotate-180" : ""
                }`}
              />
            </a>
            <a
              href="#"
              className="px-3 py-2 rounded font-semibold text-blue-700 hover:bg-blue-50"
            >
              Ofertas
            </a>
            <a
              href="#"
              className="px-3 py-2 rounded font-semibold text-blue-700 hover:bg-blue-50"
            >
              Sobre
            </a>
          </nav>

          {/* Pesquisa, Carrinho e Login/User */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full max-w-xs hidden md:flex"
              autoComplete="off"
              style={{ minWidth: 0, flex: 1, maxWidth: 320 }}
            >
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Buscar produtos..."
                className="w-full px-3 py-2 rounded border border-blue-200 bg-blue-50 text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-base shadow-sm"
                onFocus={() => search.length > 1 && setSearchOpen(true)}
              />
              <button
                type="submit"
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full ${primary} ${primaryText} ${primaryHover} transition`}
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
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-800 transition"
                      onClick={() => handleResultClick(result)}
                    >
                      {result}
                    </button>
                  ))}
                </div>
              )}
            </form>
            {/* Carrinho */}
            <Link
              href="/carrinho"
              className="relative flex items-center justify-center rounded-full p-2 bg-white border border-blue-200 hover:bg-blue-50 transition"
            >
              <ShoppingCartIcon className="h-7 w-7 text-blue-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Botão Entrar ou User Dropdown */}
            {!user ? (
              <Link
                href="/login"
                className={`${primary} ${primaryText} ${primaryHover} hidden md:flex items-center gap-2 px-5 py-2 rounded font-bold text-base shadow transition focus:outline-none`}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M21 21c0-3.866-4.03-7-9-7s-9 3.134-9 7"
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                </svg>
                Entrar
              </Link>
            ) : (
              <div className="relative">
                <button
                  id="user-btn"
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded font-bold text-base bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 shadow transition"
                  onClick={() => setUserDropdown((v) => !v)}
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={userDropdown}
                >
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                      stroke="#1976d2"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M21 21c0-3.866-4.03-7-9-7s-9 3.134-9 7"
                      stroke="#1976d2"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span>{user.name}</span>
                  <ChevronDownIcon
                    className={`h-5 w-5 ml-1 transition-transform duration-200 ${
                      userDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {userDropdown && (
                  <div
                    id="user-panel"
                    className="absolute right-0 mt-2 w-44 bg-white border border-blue-200 rounded-xl shadow-lg z-40 overflow-hidden"
                  >
                    <button
                      className="w-full flex items-center gap-2 px-4 py-3 text-blue-700 hover:bg-blue-50 transition text-left"
                      onClick={handleLogout}
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            )}
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
        {/* Barra de categorias horizontal para desktop */}
        <div className="hidden md:flex bg-blue-50 border-t border-blue-100 py-2 justify-center">
          <div className="max-w-7xl flex gap-4">
            {categories.map((cat) => (
              <a
                key={cat}
                href="#"
                className="px-4 py-1 rounded text-blue-700 font-medium hover:bg-blue-100 transition"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
        {/* Linha abaixo do header */}
        <div className="h-1 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-200 opacity-80 w-full" />
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
            <div
              className="max-w-6xl w-full flex flex-wrap gap-2 px-4 py-3"
              style={{ alignItems: "center" }}
            >
              {categories.map((cat) => (
                <a
                  key={cat}
                  href="#"
                  className="px-4 py-2 rounded text-base font-medium text-blue-700 hover:bg-blue-100 transition border border-blue-100"
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
            <div
              className="max-w-6xl w-full flex flex-wrap gap-2 px-4 py-3"
              style={{ alignItems: "center" }}
            >
              {moreOptions.map((opt) => (
                <a
                  key={opt}
                  href="#"
                  className="px-4 py-2 rounded text-base font-medium text-blue-700 hover:bg-blue-100 transition border border-blue-100"
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
            <span className="text-2xl font-extrabold tracking-tight select-none text-blue-700">
              E-Shop
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
                className="w-full px-4 py-2 rounded border border-blue-200 bg-blue-50 text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-base shadow-sm"
                onFocus={() => search.length > 1 && setSearchOpen(true)}
              />
              <button
                type="submit"
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full ${primary} ${primaryText} ${primaryHover} transition`}
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
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-800 transition"
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
                className="w-full text-center text-xl font-bold rounded-2xl py-3 px-6 mb-2 transition-all duration-150 text-blue-700 bg-white hover:bg-blue-50 shadow"
                onClick={() => setMenuOpen(false)}
              >
                Início
              </a>
              {/* Categorias mobile */}
              <details className="w-full">
                <summary className="w-full text-center text-xl font-bold rounded-2xl py-3 px-6 mb-2 transition-all duration-150 flex items-center justify-center cursor-pointer bg-white text-blue-700 hover:bg-blue-50 shadow">
                  Categorias
                  <ChevronDownIcon className="h-5 w-5 ml-2" />
                </summary>
                <div className="flex flex-col gap-2 mt-2 pb-2">
                  {categories.map((cat) => (
                    <a
                      key={cat}
                      href="#"
                      className="w-full text-center px-4 py-2 rounded text-base font-medium text-blue-700 hover:bg-blue-50 transition border border-blue-100 bg-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              </details>
              {/* Mais opções mobile */}
              <details className="w-full">
                <summary className="w-full text-center text-xl font-bold rounded-2xl py-3 px-6 mb-2 transition-all duration-150 flex items-center justify-center cursor-pointer bg-white text-blue-700 hover:bg-blue-50 shadow">
                  Mais opções
                  <ChevronDownIcon className="h-5 w-5 ml-2" />
                </summary>
                <div className="flex flex-col gap-2 mt-2 pb-2">
                  {moreOptions.map((opt) => (
                    <a
                      key={opt}
                      href="#"
                      className="w-full text-center px-4 py-2 rounded text-base font-medium text-blue-700 hover:bg-blue-50 transition border border-blue-100 bg-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      {opt}
                    </a>
                  ))}
                </div>
              </details>
              <a
                href="#"
                className="w-full text-center text-xl font-bold rounded-2xl py-3 px-6 mb-2 transition-all duration-150 text-blue-700 bg-white hover:bg-blue-50 shadow"
                onClick={() => setMenuOpen(false)}
              >
                Sobre
              </a>
              {/* Carrinho no mobile */}
              <Link
                href="/carrinho"
                className="relative w-full flex items-center justify-center rounded-2xl py-3 px-6 mb-2 bg-white text-blue-700 hover:bg-blue-50 shadow font-bold text-xl transition"
                onClick={() => setMenuOpen(false)}
              >
                <ShoppingCartIcon className="h-7 w-7 mr-2" />
                Carrinho
                {cartCount > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                    {cartCount}
                  </span>
                )}
              </Link>
              {/* Login/Register CTA mobile OU User Dropdown mobile */}
              <div className="w-full flex flex-col items-center mt-6">
                {!user ? (
                  <Link
                    href="/login"
                    className={`${primary} ${primaryText} ${primaryHover} w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold text-lg shadow transition focus:outline-none`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                        stroke="#fff"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M21 21c0-3.866-4.03-7-9-7s-9 3.134-9 7"
                        stroke="#fff"
                        strokeWidth="1.5"
                      />
                    </svg>
                    Entrar
                  </Link>
                ) : (
                  <div className="w-full flex flex-col items-center">
                    <button
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold text-lg shadow transition focus:outline-none bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
                      onClick={handleLogout}
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      Sair ({user.name})
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}