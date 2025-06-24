"use client";
import React, { useState, useEffect, useRef } from "react";

// Mock de produtos sem imagens
const produtos = [
  { id: 1, nome: "Tênis Esportivo", preco: 299.9 },
  { id: 2, nome: "Relógio Moderno", preco: 499.9 },
  { id: 3, nome: "Fone Bluetooth", preco: 199.9 },
  { id: 4, nome: "Mochila Casual", preco: 159.9 },
  { id: 5, nome: "Óculos de Sol", preco: 129.9 },
  { id: 6, nome: "Camiseta Básica", preco: 69.9 },
];

export default function Main2() {
  // Carrossel de produtos
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Destaques
  const destaques = produtos.slice(0, 3);

  // Produtos filtrados
  const [busca, setBusca] = useState("");
  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Carrossel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % produtos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Scroll suave no carrossel
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: carouselIndex * 260,
        behavior: "smooth",
      });
    }
  }, [carouselIndex]);

  return (
    <main className="w-full min-h-screen bg-neutral-50 pt-10 pb-20">
      {/* Seção de Destaques */}
      <section className="max-w-6xl mx-auto mb-14 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">Destaques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destaques.map(produto => (
            <div
              key={produto.id}
              className="rounded-2xl bg-white shadow border border-neutral-200 p-8 flex flex-col items-center transition hover:shadow-lg hover:border-neutral-300"
            >
              <div className="w-24 h-24 rounded-xl bg-neutral-100 flex items-center justify-center mb-5">
                <span className="text-neutral-400 text-4xl font-bold">?</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">{produto.nome}</h3>
              <span className="text-lg text-neutral-600 mb-4">R$ {produto.preco.toFixed(2)}</span>
              <button
                className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition"
                tabIndex={-1}
                style={{ pointerEvents: "none", opacity: 0.5 }}
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Carrossel de Produtos */}
      <section className="w-full bg-white/80 py-12 border-y border-neutral-200 mb-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">Produtos</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setCarouselIndex((prev) => (prev === 0 ? produtos.length - 1 : prev - 1))}
                className="w-10 h-10 rounded-full bg-neutral-200 text-neutral-700 hover:bg-neutral-300 flex items-center justify-center text-2xl"
                aria-label="Anterior"
              >
                &lt;
              </button>
              <button
                onClick={() => setCarouselIndex((prev) => (prev + 1) % produtos.length)}
                className="w-10 h-10 rounded-full bg-neutral-200 text-neutral-700 hover:bg-neutral-300 flex items-center justify-center text-2xl"
                aria-label="Próximo"
              >
                &gt;
              </button>
            </div>
          </div>
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{ scrollBehavior: "smooth" }}
          >
            {produtos.map((produto, idx) => (
              <div
                key={produto.id}
                className={`min-w-[220px] max-w-[220px] bg-white border border-neutral-200 rounded-xl shadow p-6 flex flex-col items-center transition-all duration-300 ${
                  idx === carouselIndex ? "scale-105 shadow-lg border-neutral-300 ring-2 ring-neutral-200" : "opacity-70"
                }`}
              >
                <div className="w-20 h-20 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
                  <span className="text-neutral-400 text-3xl font-bold">?</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-1">{produto.nome}</h3>
                <span className="text-base text-neutral-600 mb-2">R$ {produto.preco.toFixed(2)}</span>
              </div>
            ))}
          </div>
          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-6">
            {produtos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCarouselIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === carouselIndex ? "bg-neutral-900" : "bg-neutral-300"
                }`}
                aria-label={`Ir para produto ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Busca e Lista de Produtos */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold text-neutral-900">Todos os produtos</h2>
          <input
            type="text"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar produto..."
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 bg-white/90 w-full md:w-80"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {produtosFiltrados.length === 0 ? (
            <div className="col-span-full text-neutral-500 text-center py-12 text-lg">
              Nenhum produto encontrado.
            </div>
          ) : (
            produtosFiltrados.map(produto => (
              <div key={produto.id} className="rounded-2xl bg-white shadow border border-neutral-200 p-6 flex flex-col items-center transition hover:shadow-lg hover:border-neutral-300">
                <div className="w-20 h-20 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
                  <span className="text-neutral-400 text-3xl font-bold">?</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">{produto.nome}</h3>
                <span className="text-base text-neutral-600 mb-4">R$ {produto.preco.toFixed(2)}</span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Estilos extras */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}