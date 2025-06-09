import React from "react";
import {
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

// Você pode instalar HeroIcons com: npm install @heroicons/react

const menuItems = [
  { label: "Dashboard", icon: HomeIcon },
  { label: "Usuários", icon: UsersIcon },
  { label: "Pedidos", icon: ClipboardDocumentListIcon },
  { label: "Configurações", icon: Cog6ToothIcon },
];

interface AdminSidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  return (
    <aside className="h-screen w-64 bg-neutral-50 border-r border-neutral-200 flex flex-col shadow-sm">
      {/* Logo/admin header */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-200">
        <span className="text-xl font-bold text-neutral-800 tracking-tight select-none">
          AdminPanel
        </span>
      </div>
      {/* Menu */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className="flex items-center px-6 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-blue-700 group transition rounded-md font-medium"
              >
                <item.icon className="w-5 h-5 mr-3 text-neutral-400 group-hover:text-blue-700" />
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
          className="flex items-center w-full text-neutral-500 hover:text-red-600 hover:bg-neutral-100 px-3 py-2 rounded-md transition font-medium"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
          Sair
        </button>
      </div>
    </aside>
  );
}