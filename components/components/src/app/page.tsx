'use client';

import Content from "@/components/content";
import Header1 from "@/components/headers/header1";
import Header2 from "@/components/headers/header2";
import Header3 from "@/components/headers/header3";
import { useState } from "react";
import React from "react";

export default function Home() {
  const [header, setHeader] = useState("Header 1");
  const [panelOpen, setPanelOpen] = useState(true);

  const chooseHeader = (header: "Header 1" | "Header 2" | "Header 3") => {
    setHeader(header);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 main-bg">
      {/* Renderiza o header selecionado */}
      {header === "Header 1" ? <Header1 /> : header === "Header 2" ? <Header2 /> : <Header3 />}
      <main>
        <Content />
      </main>
      {/* Controle fixo de troca de header */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Botão para expandir/recolher */}
        {!panelOpen && (
          <button
            className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-lg border border-neutral-800 hover:bg-neutral-800 transition mb-2"
            aria-label="Abrir painel de layout"
            onClick={() => setPanelOpen(true)}
          >
            <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
              <circle cx={12} cy={12} r={10} fill="currentColor" opacity={0.15} />
              <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </button>
        )}
        {panelOpen && (
          <div className="flex flex-col gap-4 min-w-[220px] bg-white/95 border border-neutral-200 shadow-2xl rounded-2xl p-5 backdrop-blur-md relative">
            {/* Botão para recolher */}
            <button
              className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center shadow border border-neutral-300 hover:bg-neutral-300 transition"
              aria-label="Recolher painel"
              onClick={() => setPanelOpen(false)}
              tabIndex={0}
            >
              <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
                <circle cx={12} cy={12} r={10} fill="currentColor" opacity={0.13} />
                <path d="M16 12H8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
              </svg>
            </button>
            <span className="text-xs font-semibold text-neutral-700 mb-1 text-center select-none tracking-wide uppercase">
              Painel de Layout
            </span>
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-medium text-neutral-500 mb-1 pl-1">Header</span>
              <button
                className={`px-4 py-2 rounded-lg font-semibold border transition text-sm text-left ${
                  header === "Header 1"
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-neutral-100 text-neutral-900 border-neutral-300 hover:bg-neutral-200"
                }`}
                onClick={() => chooseHeader("Header 1")}
              >
                Header 1
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-semibold border transition text-sm text-left ${
                  header === "Header 2"
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-neutral-100 text-neutral-900 border-neutral-300 hover:bg-neutral-200"
                }`}
                onClick={() => chooseHeader("Header 2")}
              >
                Header 2
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-semibold border transition text-sm text-left ${
                  header === "Header 3"
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-neutral-100 text-neutral-900 border-neutral-300 hover:bg-neutral-200"
                }`}
                onClick={() => chooseHeader("Header 3")}
              >
                Header 3
              </button>
            </div>
            {/* Espaço reservado para futuras opções */}
            <div className="mt-4 flex flex-col gap-2">
              <span className="text-[11px] font-medium text-neutral-500 mb-1 pl-1">Hero (em breve)</span>
              <button
                className="px-4 py-2 rounded-lg font-semibold border border-neutral-200 bg-neutral-100 text-neutral-400 text-sm text-left cursor-not-allowed"
                disabled
              >
                Hero 1
              </button>
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <span className="text-[11px] font-medium text-neutral-500 mb-1 pl-1">Footer (em breve)</span>
              <button
                className="px-4 py-2 rounded-lg font-semibold border border-neutral-200 bg-neutral-100 text-neutral-400 text-sm text-left cursor-not-allowed"
                disabled
              >
                Footer 1
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}