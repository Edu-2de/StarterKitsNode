'use client';

import Content from "@/components/content";
import Header1 from "@/components/headers/header1";
import Header2 from "@/components/headers/header2";
import { useState } from "react";
import React from "react";

export default function Home() {
  const [header, setHeader] = useState("Header 1");

  const chooseHeader = (header: "Header 1" | "Header 2") => {
    setHeader(header);
  
  };

   return (
    <div className="flex flex-col min-h-screen bg-gray-50 main-bg">
      {/* Renderiza o header selecionado */}
      {header === "Header 1" ? <Header1 /> : <Header2 />}
      <main>
        <Content />
        {/* Botão de troca de header mais embaixo */}
        <div className="flex justify-center items-center py-8 gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-semibold border transition ${header === "Header 1" ? "bg-blue-900 text-white border-blue-900" : "bg-white text-blue-900 border-blue-300 hover:bg-blue-50"}`}
            onClick={() => chooseHeader("Header 1")}
          >
            Header 1
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold border transition ${header === "Header 2" ? "bg-blue-900 text-white border-blue-900" : "bg-white text-blue-900 border-blue-300 hover:bg-blue-50"}`}
            onClick={() => chooseHeader("Header 2")}
          >
            Header 2
          </button>
        </div>
      </main>
    </div>
  );
}