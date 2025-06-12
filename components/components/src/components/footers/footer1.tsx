"use client";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer1() {
  return (
    <footer className="bg-neutral-900 text-neutral-200 pt-12 pb-6 px-4 mt-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        {/* Logo e descrição */}
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
          <span className="text-2xl font-bold tracking-tight text-white mb-2 select-none">LOGO</span>
          <p className="text-neutral-400 text-sm max-w-xs text-center md:text-left">
            Cuidando da sua saúde com excelência e humanidade. Atendimento médico de alta qualidade e tecnologia de ponta.
          </p>
        </div>
        {/* Links rápidos */}
        <div className="flex flex-col gap-2 items-center md:items-start">
          <span className="uppercase text-xs text-neutral-400 font-semibold mb-2 tracking-widest">Navegação</span>
          <a href="#" className="hover:text-white transition">Início</a>
          <a href="#especialidades" className="hover:text-white transition">Especialidades</a>
          <a href="#agendar" className="hover:text-white transition">Agendar Consulta</a>
          <a href="#contato" className="hover:text-white transition">Contato</a>
        </div>
        {/* Contato */}
        <div className="flex flex-col gap-2 items-center md:items-start">
          <span className="uppercase text-xs text-neutral-400 font-semibold mb-2 tracking-widest">Contato</span>
          <span className="flex items-center gap-2 text-sm">
            <FiMail className="text-neutral-400" /> contato@hospitalvida.com
          </span>
          <span className="flex items-center gap-2 text-sm">
            <FiPhone className="text-neutral-400" /> (11) 1234-5678
          </span>
          <span className="flex items-center gap-2 text-sm">
            <FiMapPin className="text-neutral-400" /> Av. Saúde, 123 - São Paulo
          </span>
        </div>
      </div>
      <div className="mt-10 border-t border-neutral-800 pt-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} LOGO. Todos os direitos reservados.
      </div>
    </footer>
  );
}