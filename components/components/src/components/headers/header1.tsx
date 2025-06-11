import React, { useState } from "react";

const menu = [
  {
    title: "Início",
    link: "#",
  },
  {
    title: "Serviços",
    submenu: [
      { title: "Consultoria", link: "#" },
      { title: "Desenvolvimento", link: "#" },
      { title: "Suporte", link: "#" },
    ],
  },
  {
    title: "Sobre",
    submenu: [
      { title: "Equipe", link: "#" },
      { title: "História", link: "#" },
    ],
  },
  {
    title: "Contato",
    link: "#",
  },
];

export default function Header1() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur shadow-lg">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <span className="text-2xl font-bold text-green-600">LOGO</span>
        <ul className="flex gap-8">
          {menu.map((item, idx) => (
            <li
              key={item.title}
              className="relative"
              onMouseEnter={() => setOpenIndex(idx)}
              onMouseLeave={() => setOpenIndex(null)}
            >
              <a
                href={item.link || "#"}
                className="text-lg font-medium text-gray-900 hover:text-green-600 transition-colors duration-200"
              >
                {item.title}
              </a>
              {item.submenu && (
                <div
                  className={`absolute left-0 mt-2 min-w-[180px] bg-white rounded shadow-lg overflow-hidden transition-all duration-300 ${
                    openIndex === idx
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                  style={{ zIndex: 100 }}
                >
                  {item.submenu.map((sub) => (
                    <a
                      key={sub.title}
                      href={sub.link}
                      className="block px-5 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                    >
                      {sub.title}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}