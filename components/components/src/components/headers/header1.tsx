import React, { useState, useRef } from "react";
import {
  FaCloud,
  FaUsers,
  FaHistory,
  FaEye,
  FaChalkboardTeacher,
  FaServer,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const menu = [
  { title: "Início", link: "#", description: "Página inicial" },
  {
    title: "Serviços",
    submenu: [
      {
        title: "Consultoria",
        link: "#",
        icon: <FaChalkboardTeacher className="text-emerald-400" />,
        description: "Especialistas para seu negócio",
      },
      {
        title: "Desenvolvimento",
        link: "#",
        icon: <FaServer className="text-emerald-400" />,
        description: "Soluções sob medida",
      },
      {
        title: "Suporte",
        link: "#",
        description: "Atendimento técnico dedicado",
      },
      {
        title: "Infraestrutura",
        link: "#",
        icon: <FaCloud className="text-emerald-400" />,
        description: "Ambiente robusto e seguro",
      },
      {
        title: "Cloud",
        link: "#",
        description: "Serviços em nuvem escaláveis",
      },
      {
        title: "Treinamento",
        link: "#",
        icon: <FaChalkboardTeacher className="text-emerald-400" />,
        description: "Capacitação para equipes",
      },
    ],
  },
  {
    title: "Sobre",
    submenu: [
      {
        title: "Equipe",
        link: "#",
        icon: <FaUsers className="text-emerald-400" />,
        description: "Conheça nosso time",
      },
      {
        title: "História",
        link: "#",
        icon: <FaHistory className="text-emerald-400" />,
        description: "Nossa trajetória",
      },
      {
        title: "Missão",
        link: "#",
        description: "O que nos move",
      },
      {
        title: "Visão",
        link: "#",
        icon: <FaEye className="text-emerald-400" />,
        description: "Onde queremos chegar",
      },
    ],
  },
];

export default function Header1() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const submenuTimeout = useRef<NodeJS.Timeout | null>(null);

  // Tooltip state
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    text: string;
    x: number;
    y: number;
  }>({ visible: false, text: "", x: 0, y: 0 });

  // Submenu height for smooth animation (desktop)
  const getSubmenuRows = (idx: number) => {
    const count = menu[idx]?.submenu?.length || 0;
    return Math.ceil(count / 2);
  };
  const submenuHeight =
    openIndex !== null && menu[openIndex]?.submenu
      ? 90 * getSubmenuRows(openIndex)
      : 0;

  // Mouse handlers para garantir que o submenu só fecha quando mouse realmente sai (desktop)
  const handleMenuMouseEnter = (idx: number) => {
    if (submenuTimeout.current) clearTimeout(submenuTimeout.current);
    setOpenIndex(idx);
  };

  const handleMenuMouseLeave = () => {
    submenuTimeout.current = setTimeout(() => {
      setOpenIndex(null);
    }, 120);
  };

  const handleSubmenuMouseEnter = () => {
    if (submenuTimeout.current) clearTimeout(submenuTimeout.current);
  };

  const handleSubmenuMouseLeave = () => {
    submenuTimeout.current = setTimeout(() => {
      setOpenIndex(null);
    }, 120);
  };

  // Tooltip handlers
  const handleTooltipShow = (text: string) => (e: React.MouseEvent) => {
    setTooltip({
      visible: true,
      text,
      x: e.clientX + 12,
      y: e.clientY + 12,
    });
  };
  const handleTooltipMove = (e: React.MouseEvent) => {
    setTooltip((prev) => ({
      ...prev,
      x: e.clientX + 12,
      y: e.clientY + 12,
    }));
  };
  const handleTooltipHide = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  // O submenu deve ser sempre logo abaixo do header fixo (desktop)
  const submenuTop = "calc(2rem + 4rem)";

  // Fecha menu mobile ao navegar
  const handleMobileNavigate = () => {
    setMobileMenu(false);
    setMobileSubmenu(null);
    setOpenIndex(null);
  };

  return (
    <>
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 px-2 py-1 rounded bg-emerald-500 text-white text-xs font-medium pointer-events-none shadow"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            whiteSpace: "nowrap",
            transition:
              "left 0.10s cubic-bezier(.4,0,.2,1), top 0.10s cubic-bezier(.4,0,.2,1), opacity 0.18s",
            opacity: tooltip.visible ? 1 : 0,
            boxShadow: "0 2px 8px 0 rgba(16, 185, 129, 0.18)",
          }}
        >
          {tooltip.text}
        </div>
      )}

      <header
        ref={headerRef}
        className="fixed left-1/2 -translate-x-1/2 top-8 w-[96vw] max-w-5xl rounded-xl bg-white/80 backdrop-blur transition-all duration-300"
        style={{
          minHeight: 64,
          height:
            openIndex !== null && menu[openIndex]?.submenu
              ? 64 + submenuHeight
              : 64,
        }}
      >
        <nav className="flex items-center justify-between px-4 md:px-10 py-3">
          {/* LOGO with tooltip */}
          <span
            className="text-xl text-emerald-500 tracking-tight select-none font-medium cursor-pointer"
            onMouseEnter={handleTooltipShow("Este é o logo da empresa")}
            onMouseMove={handleTooltipMove}
            onMouseLeave={handleTooltipHide}
          >
            LOGO
          </span>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-7 items-center w-full justify-center">
            {menu.map((item, idx) => (
              <li
                key={item.title}
                className="relative"
                onMouseEnter={() => handleMenuMouseEnter(idx)}
                onMouseLeave={handleMenuMouseLeave}
              >
                <a
                  href={item.link || "#"}
                  className={`flex items-center gap-2 text-base px-3 py-1 rounded transition-colors duration-200 ${
                    openIndex === idx
                      ? "text-emerald-500"
                      : "text-gray-700 hover:text-emerald-500"
                  }`}
                  onMouseEnter={handleTooltipShow(item.description || item.title)}
                  onMouseMove={handleTooltipMove}
                  onMouseLeave={handleTooltipHide}
                >
                  {item.title}
                  {item.submenu && (
                    <span
                      className="ml-1 transition-transform duration-300"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        transform:
                          openIndex === idx
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                    >
                      <FaChevronDown />
                    </span>
                  )}
                </a>
                {item.submenu && openIndex === idx && (
                  <div
                    className={`fixed left-1/2 z-30 bg-white/95 transition-all duration-300 overflow-hidden rounded-b-xl shadow opacity-100 pointer-events-auto`}
                    style={{
                      top: submenuTop,
                      transform: "translateX(-50%)",
                      width: headerRef.current
                        ? `${headerRef.current.offsetWidth}px`
                        : "100vw",
                      maxWidth: "96vw",
                      minWidth: "240px",
                      maxHeight: submenuHeight,
                    }}
                    onMouseEnter={handleSubmenuMouseEnter}
                    onMouseLeave={handleSubmenuMouseLeave}
                  >
                    <div className="w-full grid grid-cols-2 gap-x-10 gap-y-2 px-12 py-6">
                      {item.submenu.map((sub) => (
                        <a
                          key={sub.title}
                          href={sub.link}
                          className="flex items-start gap-3 py-2 px-2 rounded transition-colors duration-200 text-emerald-600 hover:text-emerald-400"
                          onMouseEnter={handleTooltipShow(sub.description || sub.title)}
                          onMouseMove={handleTooltipMove}
                          onMouseLeave={handleTooltipHide}
                          onClick={handleMobileNavigate}
                        >
                          {sub.icon && (
                            <span className="text-lg mt-1">{sub.icon}</span>
                          )}
                          <span>
                            <span className="block text-base">{sub.title}</span>
                            <span className="block text-xs text-gray-500">
                              {sub.description}
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Contato */}
          <a
            href="#"
            className="hidden md:inline ml-8 px-6 py-2 rounded-lg bg-emerald-400 text-white text-base hover:bg-emerald-500 transition-colors duration-200"
            onMouseEnter={handleTooltipShow("Entre em contato conosco")}
            onMouseMove={handleTooltipMove}
            onMouseLeave={handleTooltipHide}
          >
            Contato
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center text-emerald-500 text-2xl"
            aria-label="Abrir menu"
            onClick={() => setMobileMenu(true)}
          >
            <FaBars />
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenu && (
          <div className="fixed inset-0 z-40 bg-black/40" onClick={handleMobileNavigate}></div>
        )}

        {/* Mobile Menu Drawer */}
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-lg transition-transform duration-300 ${
            mobileMenu ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <span className="text-xl text-emerald-500 font-bold">LOGO</span>
            <button
              className="text-2xl text-gray-500"
              aria-label="Fechar menu"
              onClick={() => setMobileMenu(false)}
            >
              <FaTimes />
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-4 py-4">
            {menu.map((item, idx) => (
              <div key={item.title}>
                <button
                  className="w-full flex items-center justify-between text-base px-2 py-2 rounded hover:bg-emerald-50 text-gray-800 font-medium"
                  onClick={() =>
                    item.submenu
                      ? setMobileSubmenu(mobileSubmenu === idx ? null : idx)
                      : handleMobileNavigate()
                  }
                  onMouseEnter={handleTooltipShow(item.description || item.title)}
                  onMouseMove={handleTooltipMove}
                  onMouseLeave={handleTooltipHide}
                >
                  <span className="flex items-center gap-2">
                    {item.title}
                    {item.submenu && (
                      <FaChevronDown
                        className={`ml-2 transition-transform duration-200 ${
                          mobileSubmenu === idx ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </span>
                </button>
                {/* Mobile Submenu */}
                {item.submenu && mobileSubmenu === idx && (
                  <div className="pl-4 py-1 flex flex-col gap-1">
                    {item.submenu.map((sub) => (
                      <a
                        key={sub.title}
                        href={sub.link}
                        className="flex items-center gap-2 px-2 py-2 rounded text-emerald-600 hover:bg-emerald-50 text-base"
                        onClick={handleMobileNavigate}
                        onMouseEnter={handleTooltipShow(sub.description || sub.title)}
                        onMouseMove={handleTooltipMove}
                        onMouseLeave={handleTooltipHide}
                      >
                        {sub.icon && <span className="text-lg">{sub.icon}</span>}
                        <span>
                          <span className="block">{sub.title}</span>
                          <span className="block text-xs text-gray-500">{sub.description}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="#"
              className="mt-4 px-4 py-2 rounded-lg bg-emerald-400 text-white text-base hover:bg-emerald-500 transition-colors duration-200 text-center"
              onClick={handleMobileNavigate}
              onMouseEnter={handleTooltipShow("Entre em contato conosco")}
              onMouseMove={handleTooltipMove}
              onMouseLeave={handleTooltipHide}
            >
              Contato
            </a>
          </nav>
        </aside>
      </header>
    </>
  );
}