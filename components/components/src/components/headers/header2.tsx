"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiUser, FiShoppingCart, FiChevronDown, FiMenu, FiX } from "react-icons/fi";

const categories = [
  {
    name: "Eletrônicos",
    sub: ["Celulares", "Notebooks", "Acessórios", "Smartwatches"],
  },
  {
    name: "Moda",
    sub: ["Masculino", "Feminino", "Infantil", "Calçados"],
  },
  {
    name: "Casa",
    sub: ["Móveis", "Decoração", "Eletrodomésticos"],
  },
  {
    name: "Esportes",
    sub: ["Fitness", "Bicicletas", "Acessórios"],
  },
];

export default function Header2() {
  const [openSub, setOpenSub] = useState<number | null>(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const submenuTimeout = useRef<NodeJS.Timeout | null>(null);

  // Mobile menu state
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSub, setMobileSub] = useState<number | null>(null);

  // Hide header on scroll down, show on scroll up, stop at top
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current <= 0) {
        setShowHeader(true);
        setLastScroll(0);
        return;
      }
      if (current > lastScroll) setShowHeader(false);
      else setShowHeader(true);
      setLastScroll(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  // Submenu hover robust: stays open while mouse is over button or submenu (desktop)
  const handleMouseEnter = (idx: number) => {
    if (submenuTimeout.current) clearTimeout(submenuTimeout.current);
    setOpenSub(idx);
  };
  const handleMouseLeave = () => {
    submenuTimeout.current = setTimeout(() => setOpenSub(null), 120);
  };

  // Mobile submenu toggle
  const handleMobileSub = (idx: number) => {
    setMobileSub(mobileSub === idx ? null : idx);
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenu(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenu]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white shadow transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full h-[2px] bg-neutral-100" />

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 h-16 lg:h-20">
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded bg-neutral-50 border border-neutral-200 text-neutral-800 mr-1"
          onClick={() => setMobileMenu(true)}
          aria-label="Abrir menu"
        >
          <FiMenu className="text-2xl" />
        </button>
        {/* Logo */}
        <Link
          href="/"
          className="text-xl lg:text-2xl font-black tracking-widest text-neutral-800 uppercase px-3 py-1 rounded bg-neutral-50 border border-neutral-200 shadow-sm hover:bg-neutral-100 transition"
          style={{ letterSpacing: "0.14em" }}
        >
          Loja
        </Link>
      

        {/* Search Bar */}
        <div className="hidden sm:flex flex-1 mx-4 lg:mx-8 max-w-xl">
          <input
            type="text"
            placeholder="Buscar produtos, marcas e categorias..."
            className="w-full px-6 py-2 rounded-full border border-neutral-200 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-200 text-neutral-800 placeholder-neutral-400 transition text-base shadow"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-800 font-medium transition shadow-sm">
            <FiUser className="text-xl" />
            <span className="hidden md:inline">Entrar</span>
          </button>
          <button className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-900 text-white font-medium transition shadow-sm border border-neutral-800">
            <FiShoppingCart className="text-xl" />
            <span className="hidden md:inline">Carrinho</span>
            <span className="absolute -top-2 -right-2 bg-white text-neutral-800 text-xs rounded-full px-2 py-0.5 border-2 border-neutral-800 shadow">
              2
            </span>
          </button>
        </div>
      </div>

      {/* Desktop NavBar */}
      <nav className="hidden lg:block bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto flex items-center gap-2 px-8">
          {categories.map((cat, idx) => (
            <div
              key={cat.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center gap-1 px-5 py-2 font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition rounded-t ${
                  openSub === idx
                    ? "bg-neutral-50 text-neutral-900 shadow border-b-2 border-neutral-300"
                    : ""
                }`}
              >
                {cat.name}
                <FiChevronDown className="text-base" />
              </button>
              {/* Submenu */}
              <div
                className={`absolute left-0 top-full mt-2 min-w-[210px] bg-white border border-neutral-100 shadow-lg rounded-xl py-2 transition-all duration-200 ${
                  openSub === idx
                    ? "opacity-100 visible translate-y-0 pointer-events-auto"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                {cat.sub.map((sub) => (
                  <a
                    key={sub}
                    href="#"
                    className="block px-5 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition rounded text-base"
                  >
                    {sub}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay Menu */}
      {/* O overlay foi removido, apenas aside ocupa 100% da tela */}
      <aside
        className={`fixed inset-0 h-screen w-screen bg-white z-[100] transition-transform duration-300 flex flex-col ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ touchAction: "manipulation" }}
        role="navigation"
        aria-label="Menu principal mobile"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <span className="text-xl font-black text-neutral-800 tracking-widest uppercase" style={{ letterSpacing: "0.14em" }}>
            Loja
          </span>
          <button
            className="p-2 rounded bg-neutral-50 border border-neutral-200 text-neutral-800"
            onClick={() => setMobileMenu(false)}
            aria-label="Fechar menu"
          >
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* Search in mobile */}
        <div className="px-5 py-3 border-b border-neutral-100">
          <input
            type="text"
            placeholder="Buscar produtos, marcas e categorias..."
            className="w-full px-4 py-2 rounded-full border border-neutral-200 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-200 text-neutral-800 placeholder-neutral-400 transition text-base shadow"
          />
        </div>

        {/* Menu items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {categories.map((cat, idx) => (
              <li key={cat.name}>
                <button
                  className="w-full flex items-center justify-between px-4 py-3 font-medium text-neutral-800 hover:bg-neutral-50 rounded-lg transition"
                  onClick={() => handleMobileSub(idx)}
                  aria-expanded={mobileSub === idx}
                  aria-controls={`mobile-cat-${idx}`}
                  style={{ outline: "none" }}
                >
                  <span>{cat.name}</span>
                  <FiChevronDown
                    className={`text-base transition-transform ${
                      mobileSub === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`mobile-cat-${idx}`}
                  className={`transition-all overflow-hidden ${
                    mobileSub === idx ? "max-h-48 py-1" : "max-h-0"
                  }`}
                  style={{
                    transitionProperty: "max-height, padding",
                  }}
                >
                  {cat.sub.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="block px-8 py-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 rounded transition text-base"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom actions */}
        <div className="px-5 pt-2 pb-6 border-t border-neutral-100 flex flex-col gap-3">
          <button className="flex items-center gap-2 px-4 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 font-medium transition shadow-sm w-full justify-center">
            <FiUser className="text-xl" />
            Entrar
          </button>
          <button className="relative flex items-center gap-2 px-4 py-3 rounded-full bg-neutral-800 hover:bg-neutral-900 text-white font-medium transition shadow-sm border border-neutral-800 w-full justify-center">
            <FiShoppingCart className="text-xl" />
            Carrinho
            <span className="absolute -top-2 -right-2 bg-white text-neutral-800 text-xs rounded-full px-2 py-0.5 border-2 border-neutral-800 shadow">
              2
            </span>
          </button>
        </div>
      </aside>
    </header>
  );
}