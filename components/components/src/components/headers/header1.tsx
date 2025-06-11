import React, { useState, useRef, useLayoutEffect } from "react";
import {
  FaCloud,
  FaUsers,
  FaHistory,
  FaEye,
  FaChalkboardTeacher,
  FaServer,
  FaChevronDown,
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
  const headerRef = useRef<HTMLDivElement>(null);

  // Submenu height for smooth animation
  const getSubmenuRows = (idx: number) => {
    const count = menu[idx]?.submenu?.length || 0;
    return Math.ceil(count / 2);
  };
  const submenuHeight =
    openIndex !== null && menu[openIndex]?.submenu
      ? 90 * getSubmenuRows(openIndex)
      : 0;

  return (
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
      <nav className="flex items-center justify-between px-10 py-3">
        <span className="text-xl text-emerald-500 tracking-tight select-none font-medium">
          LOGO
        </span>
        <ul className="flex gap-7 items-center w-full justify-center">
          {menu.map((item, idx) => (
            <li
              key={item.title}
              className="relative"
              onMouseEnter={() => setOpenIndex(idx)}
              onMouseLeave={() => setOpenIndex(null)}
            >
              <a
                href={item.link || "#"}
                className={`flex items-center gap-2 text-base px-3 py-1 rounded transition-colors duration-200 ${
                  openIndex === idx
                    ? "text-emerald-500"
                    : "text-gray-700 hover:text-emerald-500"
                }`}
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
              {item.submenu && (
                <div
                  className={`fixed left-1/2 top-[calc(2rem+2rem+0.75rem)] z-30 bg-white/95 transition-all duration-300 overflow-hidden rounded-b-xl shadow ${
                    openIndex === idx
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                  style={{
                    transform: "translateX(-50%)",
                    width: headerRef.current
                      ? `${headerRef.current.offsetWidth}px`
                      : "100vw",
                    maxWidth: "96vw",
                    minWidth: "240px",
                    maxHeight: openIndex === idx ? submenuHeight : 0,
                  }}
                >
                  <div className="w-full grid grid-cols-2 gap-x-10 gap-y-2 px-12 py-6">
                    {item.submenu.map((sub) => (
                      <a
                        key={sub.title}
                        href={sub.link}
                        className="flex items-start gap-3 py-2 px-2 rounded transition-colors duration-200 text-emerald-600 hover:text-emerald-400"
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
        <a
          href="#"
          className="ml-8 px-6 py-2 rounded-lg bg-emerald-400 text-white text-base hover:bg-emerald-500 transition-colors duration-200"
        >
          Contato
        </a>
      </nav>
    </header>
  );
}