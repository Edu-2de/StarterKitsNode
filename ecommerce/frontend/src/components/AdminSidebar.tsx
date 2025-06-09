import React, { useState } from "react";
import {
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  CubeIcon, // Importa o ícone de produtos
} from "@heroicons/react/24/outline";

// Você pode instalar HeroIcons com: npm install @heroicons/react

const menuItems = [
  { label: "Dashboard", icon: HomeIcon, href: "#" },
  { label: "Usuários", icon: UsersIcon, href: "#" },
  { label: "Pedidos", icon: ClipboardDocumentListIcon, href: "#" },
  { label: "Produtos", icon: CubeIcon, href: "#" }, // Novo item Produtos
  { label: "Configurações", icon: Cog6ToothIcon, href: "#" },
];

interface AdminSidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const [open, setOpen] = useState(false);

  // Fecha sidebar ao clicar em um link no mobile
  function handleMenuClick() {
    setOpen(false);
  }

  return (
    <>
      {/* Mobile open button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-neutral-50 border border-neutral-200 rounded-lg shadow hover:bg-neutral-100 transition lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        style={{ display: open ? "none" : "block" }}
      >
        <Bars3Icon className="w-6 h-6 text-neutral-700" />
      </button>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity lg:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 top-0 left-0 h-screen max-h-screen w-64 bg-neutral-50 border-r border-neutral-200 flex flex-col shadow-sm
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-64
        `}
        aria-label="Admin sidebar"
        style={{ minHeight: "100vh" }}
      >
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-neutral-200 justify-between">
          <span className="text-xl font-bold text-neutral-800 tracking-tight select-none">
            AdminPanel
          </span>
          {/* Mobile close button */}
          <button
            className="lg:hidden p-2 rounded hover:bg-neutral-100 transition"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
            style={{ display: open ? "block" : "none" }}
          >
            <XMarkIcon className="w-6 h-6 text-neutral-500" />
          </button>
        </div>
        {/* Menu */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={handleMenuClick}
                  className="flex items-center px-6 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-blue-700 group transition rounded-md font-medium focus:outline-none focus:bg-neutral-200"
                  tabIndex={0}
                >
                  <item.icon className="w-5 h-5 mr-3 text-neutral-400 group-hover:text-blue-700 transition-colors" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Sair / Logout */}
        <div className="px-6 py-4 border-t border-neutral-200">
          <button
            onClick={onLogout}
            className="flex items-center w-full text-neutral-500 hover:text-red-600 hover:bg-neutral-100 px-3 py-2 rounded-md transition font-medium focus:outline-none focus:bg-neutral-200"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}