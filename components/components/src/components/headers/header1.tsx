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
        icon: <FaChalkboardTeacher className="text-neutral-400" />,
        description: "Especialistas para seu negócio",
      },
      {
        title: "Desenvolvimento",
        link: "#",
        icon: <FaServer className="text-neutral-400" />,
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
        icon: <FaCloud className="text-neutral-400" />,
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
        icon: <FaChalkboardTeacher className="text-neutral-400" />,
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
        icon: <FaUsers className="text-neutral-400" />,
        description: "Conheça nosso time",
      },
      {
        title: "História",
        link: "#",
        icon: <FaHistory className="text-neutral-400" />,
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
        icon: <FaEye className="text-neutral-400" />,
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

  // Impede o scroll do body quando o menu mobile está aberto
  React.useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenu]);

  return (
    <>
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 px-2 py-1 rounded bg-neutral-900 text-white text-xs font-medium pointer-events-none shadow"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            whiteSpace: "nowrap",
            transition:
              "left 0.10s cubic-bezier(.4,0,.2,1), top 0.10s cubic-bezier(.4,0,.2,1), opacity 0.18s",
            opacity: tooltip.visible ? 1 : 0,
            boxShadow: "0 2px 8px 0 rgba(30, 41, 59, 0.13)",
          }}
        >
          {tooltip.text}
        </div>
      )}

      {/* HEADER */}
      <header
        ref={headerRef}
        className="fixed left-1/2 -translate-x-1/2 top-8 w-[96vw] max-w-5xl rounded-xl bg-white/80 backdrop-blur transition-all duration-300 shadow border border-neutral-200"
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
            className="text-xl text-neutral-800 tracking-tight select-none font-semibold cursor-pointer"
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
                      ? "text-neutral-900 font-semibold bg-neutral-100"
                      : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
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
                    className={`fixed left-1/2 z-30 bg-white/95 transition-all duration-300 overflow-hidden rounded-b-xl border border-t-0 border-neutral-200 shadow opacity-100 pointer-events-auto`}
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
                          className="flex items-start gap-3 py-2 px-2 rounded transition-colors duration-200 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100"
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
                            <span className="block text-xs text-neutral-400">
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
            className="hidden md:inline ml-8 px-6 py-2 rounded-lg bg-neutral-900 text-white text-base hover:bg-neutral-800 transition-colors duration-200"
            onMouseEnter={handleTooltipShow("Entre em contato conosco")}
            onMouseMove={handleTooltipMove}
            onMouseLeave={handleTooltipHide}
          >
            Contato
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center text-neutral-900 text-2xl"
            aria-label="Abrir menu"
            onClick={() => setMobileMenu(true)}
          >
            <FaBars />
          </button>
        </nav>

        {/* Mobile Fullscreen Menu */}
        <aside
          className={`fixed inset-0 z-[99] bg-white transition-transform duration-300 flex flex-col ${
            mobileMenu ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
          style={{ minHeight: "100dvh", height: "100dvh", touchAction: "manipulation" }}
          role="navigation"
          aria-label="Menu principal mobile"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
            <span className="text-xl text-neutral-900 font-bold">LOGO</span>
            <button
              className="text-2xl text-neutral-500"
              aria-label="Fechar menu"
              onClick={() => setMobileMenu(false)}
            >
              <FaTimes />
            </button>
          </div>
          {/* Scrollable area */}
          <nav className="flex-1 overflow-y-auto flex flex-col justify-between">
            <div className="flex flex-col gap-1 px-3 py-4">
              {menu.map((item, idx) => (
                <div key={item.title}>
                  <button
                    className="w-full flex items-center justify-between text-base px-3 py-3 rounded hover:bg-neutral-100 text-neutral-800 font-medium focus:outline-none"
                    onClick={() =>
                      item.submenu
                        ? setMobileSubmenu(mobileSubmenu === idx ? null : idx)
                        : handleMobileNavigate()
                    }
                    onMouseEnter={handleTooltipShow(item.description || item.title)}
                    onMouseMove={handleTooltipMove}
                    onMouseLeave={handleTooltipHide}
                    tabIndex={0}
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
                          className="flex items-center gap-2 px-2 py-2 rounded text-neutral-700 hover:bg-neutral-100 text-base"
                          onClick={handleMobileNavigate}
                          onMouseEnter={handleTooltipShow(sub.description || sub.title)}
                          onMouseMove={handleTooltipMove}
                          onMouseLeave={handleTooltipHide}
                        >
                          {sub.icon && <span className="text-lg">{sub.icon}</span>}
                          <span>
                            <span className="block">{sub.title}</span>
                            <span className="block text-xs text-neutral-400">{sub.description}</span>
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Contato fixo no rodapé do menu mobile */}
            <div className="px-4 pb-6 pt-0">
              <a
                href="#"
                className="w-full block px-4 py-3 rounded-lg bg-neutral-900 text-white text-base hover:bg-neutral-800 transition-colors duration-200 text-center"
                onClick={handleMobileNavigate}
                onMouseEnter={handleTooltipShow("Entre em contato conosco")}
                onMouseMove={handleTooltipMove}
                onMouseLeave={handleTooltipHide}
              >
                Contato
              </a>
            </div>
          </nav>
        </aside>
      </header>
    </>
  );
}