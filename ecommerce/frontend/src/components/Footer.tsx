"use client";

import { useState } from "react";

export default function Footer() {
  const [newsletterMsg, setNewsletterMsg] = useState<string | null>(null);

  return (
    <footer className="bg-white border-t border-neutral-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-10">
        {/* Coluna 1: Logo e slogan */}
        <div className="flex flex-col gap-3 md:w-1/4">
          <span className="text-3xl font-extrabold text-neutral-800 select-none">Logo</span>
          <span className="text-base text-neutral-500">
            Seu slogan aqui, algo que inspire e conecte com o usuário.
          </span>
        </div>
        {/* Coluna 2: Navegação e Ajuda */}
        <div className="flex flex-col sm:flex-row gap-8 md:w-2/4">
          <div>
            <h4 className="font-bold mb-2 text-neutral-700 text-base uppercase tracking-wide">Navegação</h4>
            <nav className="flex flex-col gap-1 text-base text-neutral-500">
              <a href="#" className="hover:text-neutral-800 transition">Início</a>
              <a href="#" className="hover:text-neutral-800 transition">Produtos</a>
              <a href="#" className="hover:text-neutral-800 transition">Sobre nós</a>
              <a href="#" className="hover:text-neutral-800 transition">Contato</a>
            </nav>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-neutral-700 text-base uppercase tracking-wide">Ajuda</h4>
            <ul className="flex flex-col gap-1 text-base text-neutral-500">
              <li>
                <a href="#" className="hover:underline hover:text-neutral-800 transition">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-neutral-800 transition">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-neutral-800 transition">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-neutral-800 transition">
                  Entregas e Devoluções
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Coluna 3: Contato, redes e newsletter */}
        <div className="flex flex-col gap-3 md:w-1/4 items-start">
          <h4 className="font-bold mb-2 text-neutral-700 text-base uppercase tracking-wide">Contato</h4>
          <a href="mailto:contato@logo.com" className="text-base font-semibold text-neutral-700 hover:text-neutral-900 transition">
            contato@logo.com
          </a>
          <span className="text-sm text-neutral-400">Segunda a sexta, 9h às 18h</span>
          <div className="flex gap-3 mt-1">
            <a href="#" aria-label="Instagram" className="text-neutral-400 hover:text-neutral-700 transition">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/><circle cx="17" cy="7" r="1" fill="currentColor"/></svg>
            </a>
            <a href="#" aria-label="Twitter" className="text-neutral-400 hover:text-neutral-700 transition">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M21 7.5c-.6.3-1.2.5-1.8.6.7-.4 1.1-1 1.4-1.7-.7.4-1.3.7-2 .8a3.1 3.1 0 0 0-5.3 2.8c-2.6-.1-5-1.4-6.6-3.5-.3.5-.5 1-.5 1.6 0 1.1.6 2.1 1.6 2.7-.5 0-1-.2-1.4-.4v.1c0 1.5 1.1 2.7 2.5 3-.3.1-.6.2-.9.2-.2 0-.4 0-.6-.1.4 1.2 1.6 2.1 3 2.1A6.2 6.2 0 0 1 3 18.1c-.4 0-.7 0-1-.1A8.7 8.7 0 0 0 7.3 19.5c5.7 0 8.8-4.7 8.8-8.8v-.4c.6-.4 1.1-1 1.5-1.6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
            </a>
            <a href="#" aria-label="WhatsApp" className="text-neutral-400 hover:text-neutral-700 transition">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M5 19l1.5-4A7 7 0 1 1 12 19a7 7 0 0 1-6.5-4z" stroke="currentColor" strokeWidth="1.5"/><path d="M8.5 13.5c.5 1 1.5 2 2.5 2.5.5.2 1 .2 1.5 0l.5-.5c.2-.2.2-.5 0-.7l-.7-.7c-.2-.2-.5-.2-.7 0l-.2.2c-.1.1-.2.1-.3 0a5.5 5.5 0 0 1-1.2-1.2c-.1-.1-.1-.2 0-.3l.2-.2c.2-.2.2-.5 0-.7l-.7-.7c-.2-.2-.5-.2-.7 0l-.5.5c-.2.5-.2 1 0 1.5z" stroke="currentColor" strokeWidth="1.5"/></svg>
            </a>
          </div>
          <form
            className="w-full mt-2 flex flex-col gap-2"
            onSubmit={e => {
              e.preventDefault();
              setNewsletterMsg("Mensagem enviada! Em breve entraremos em contato.");
              setTimeout(() => setNewsletterMsg(null), 3000);
            }}
          >
            <input
              type="email"
              required
              placeholder="Seu e-mail"
              className="w-full px-3 py-2 rounded border text-base focus:outline-none focus:ring-2 transition border-neutral-200 bg-neutral-50 text-neutral-700 placeholder-neutral-400 focus:ring-neutral-200"
            />
            <button
              type="submit"
              className="w-full px-3 py-2 rounded font-bold text-base transition bg-neutral-700 text-white hover:bg-neutral-800"
            >
              Receber novidades
            </button>
            {newsletterMsg && (
              <span className="text-sm font-semibold text-center mt-1 animate-pulse text-neutral-700">
                {newsletterMsg}
              </span>
            )}
          </form>
        </div>
      </div>
      <div className="mt-10 text-center text-sm font-semibold tracking-wide text-neutral-300">
        © {new Date().getFullYear()} Logo. Todos os direitos reservados.
      </div>
    </footer>
  );
}