import React, { useState } from "react";
import {
  FaCloud,
  FaUsers,
  FaHistory,
  FaBullseye,
  FaEye,
  FaTools,
  FaChalkboardTeacher,
  FaServer,
  FaHeadset,
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
        icon: <FaChalkboardTeacher className="text-emerald-500" />,
        description: "Especialistas para seu negócio",
      },
      {
        title: "Desenvolvimento",
        link: "#",
        icon: <FaServer className="text-emerald-500" />,
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
        icon: <FaCloud className="text-emerald-500" />,
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
        icon: <FaChalkboardTeacher className="text-emerald-500" />,
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
        icon: <FaUsers className="text-emerald-500" />,
        description: "Conheça nosso time",
      },
      {
        title: "História",
        link: "#",
        icon: <FaHistory className="text-emerald-500" />,
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
        icon: <FaEye className="text-emerald-500" />,
        description: "Onde queremos chegar",
      },
    ],
  },
];

export default function Header1() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Calcula altura extra do submenu aberto (duas linhas se mais de 4 itens)
  const getSubmenuRows = (idx: number) => {
    const count = menu[idx]?.submenu?.length || 0;
    return Math.ceil(count / 2);
  };
  const submenuHeight =
    openIndex !== null && menu[openIndex]?.submenu
      ? 92 * getSubmenuRows(openIndex)
      : 0;

  return (
    <header
      className="fixed left-1/2 -translate-x-1/2 top-8 w-[98vw] max-w-6xl rounded-2xl bg-white/95 backdrop-blur-lg transition-all duration-300 border border-emerald-100"
      style={{
        boxShadow: "0 4px 24px 0 rgba(16, 185, 129, 0.06)",
        minHeight: 72,
        height:
          openIndex !== null && menu[openIndex]?.submenu
            ? 72 + submenuHeight
            : 72,
      }}
    >
      <nav className="flex items-center justify-between px-12 py-4">
        <span className="text-2xl font-extrabold text-emerald-600 tracking-tight select-none">
          LOGO
        </span>
        <ul className="flex gap-8 items-center">
          {menu.map((item, idx) => (
            <li
              key={item.title}
              className="relative"
              onMouseEnter={() => setOpenIndex(idx)}
              onMouseLeave={() => setOpenIndex(null)}
            >
              <a
                href={item.link || "#"}
                className={`flex items-center gap-2 text-base font-semibold px-4 py-2 rounded-lg transition-colors duration-200 ${
                  openIndex === idx
                    ? "text-emerald-600"
                    : "text-gray-800 hover:text-emerald-600"
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
                  className={`absolute left-0 top-full w-[32rem] bg-white/95 border border-emerald-100 transition-all duration-300 overflow-hidden rounded-b-2xl shadow-lg ${
                    openIndex === idx
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                  style={{
                    maxHeight: openIndex === idx ? submenuHeight : 0,
                  }}
                >
                  <div className="w-full grid grid-cols-2 gap-x-6 gap-y-2 px-6 py-6">
                    {item.submenu.map((sub) => (
                      <a
                        key={sub.title}
                        href={sub.link}
                        className="flex items-start gap-3 py-3 px-2 rounded-lg transition-colors duration-200 text-emerald-700 hover:text-emerald-600"
                      >
                        {sub.icon && (
                          <span className="text-xl mt-1">{sub.icon}</span>
                        )}
                        <span>
                          <span className="block font-semibold text-base">
                            {sub.title}
                          </span>
                          <span className="block text-sm text-gray-500">
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
          className="ml-8 px-7 py-2 rounded-xl bg-emerald-500 text-white font-semibold text-base shadow hover:bg-emerald-600 transition-colors duration-200"
        >
          Contato
        </a>
      </nav>
    </header>
  );
}