"use client";
import React, { useState, useEffect, useRef } from "react";

// Dados fictícios para exemplo
const cursos = [
  { id: 1, nome: "Matemática", professor: "Prof. Ana Souza", progresso: 80 },
  { id: 2, nome: "História", professor: "Prof. Carlos Lima", progresso: 55 },
  { id: 3, nome: "Biologia", professor: "Prof. Julia Alves", progresso: 92 },
  { id: 4, nome: "Física", professor: "Prof. Pedro Silva", progresso: 40 },
  { id: 5, nome: "Inglês", professor: "Prof. Laura Martins", progresso: 67 },
];

const avisos = [
  { id: 1, titulo: "Prova de Matemática", data: "2025-07-10", descricao: "A prova será realizada na próxima quinta-feira, às 10h." },
  { id: 2, titulo: "Entrega de Trabalho", data: "2025-07-15", descricao: "O trabalho de História deve ser entregue até o dia 15/07." },
  { id: 3, titulo: "Reunião de Pais", data: "2025-07-20", descricao: "Reunião de pais e mestres às 19h no auditório." },
];

const atividades = [
  { id: 1, curso: "Biologia", titulo: "Quiz sobre células", status: "pendente", prazo: "2025-07-12" },
  { id: 2, curso: "Inglês", titulo: "Redação: My Dream", status: "concluída", prazo: "2025-07-08" },
  { id: 3, curso: "Matemática", titulo: "Lista de exercícios", status: "pendente", prazo: "2025-07-14" },
];

export default function Main3() {
  // Estado para carrossel de avisos
  const [avisoIndex, setAvisoIndex] = useState(0);
  const avisoRef = useRef<HTMLDivElement>(null);

  // Estado para filtro de cursos
  const [filtro, setFiltro] = useState("");
  const cursosFiltrados = cursos.filter(c =>
    c.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  // Estado para atividades
  const [atividadesVisiveis, setAtividadesVisiveis] = useState(atividades);

  // Carrossel automático de avisos
  useEffect(() => {
    const interval = setInterval(() => {
      setAvisoIndex((prev) => (prev + 1) % avisos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll suave no carrossel de avisos
  useEffect(() => {
    if (avisoRef.current) {
      avisoRef.current.scrollTo({
        left: avisoIndex * 340,
        behavior: "smooth",
      });
    }
  }, [avisoIndex]);

  // Marcar atividade como concluída
  const concluirAtividade = (id: number) => {
    setAtividadesVisiveis(atividadesVisiveis.map(a =>
      a.id === id ? { ...a, status: "concluída" } : a
    ));
  };

  // Adicionar nova atividade (exemplo de interatividade extra)
  const [novaAtividade, setNovaAtividade] = useState({ curso: "", titulo: "", prazo: "" });
  const adicionarAtividade = () => {
    if (novaAtividade.curso && novaAtividade.titulo && novaAtividade.prazo) {
      setAtividadesVisiveis([
        ...atividadesVisiveis,
        {
          id: Date.now(),
          curso: novaAtividade.curso,
          titulo: novaAtividade.titulo,
          status: "pendente",
          prazo: novaAtividade.prazo,
        },
      ]);
      setNovaAtividade({ curso: "", titulo: "", prazo: "" });
    }
  };

  return (
    <main className="w-full min-h-screen bg-neutral-50 pt-10 pb-20">
      {/* Header fictício da área estudantil */}
      <header className="max-w-6xl mx-auto px-4 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-1">Bem-vindo(a), Estudante!</h1>
          <p className="text-neutral-600 text-lg">Aqui você acompanha seu progresso, atividades e avisos importantes.</p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            placeholder="Filtrar cursos..."
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 bg-white/90 w-56"
          />
        </div>
      </header>

      {/* Carrossel de Avisos */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Avisos</h2>
        <div className="relative">
          <div
            ref={avisoRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{ scrollBehavior: "smooth" }}
          >
            {avisos.map((aviso, idx) => (
              <div
                key={aviso.id}
                className={`min-w-[320px] max-w-[320px] bg-white border border-neutral-200 rounded-xl shadow p-6 flex flex-col justify-between transition-all duration-300 ${
                  idx === avisoIndex ? "scale-105 shadow-lg border-neutral-300" : "opacity-70"
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-1">{aviso.titulo}</h3>
                  <span className="text-sm text-neutral-500">{new Date(aviso.data).toLocaleDateString()}</span>
                  <p className="text-neutral-700 mt-2">{aviso.descricao}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-4">
            {avisos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setAvisoIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === avisoIndex ? "bg-neutral-900" : "bg-neutral-300"
                }`}
                aria-label={`Ir para aviso ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cursos e Progresso */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Meus Cursos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cursosFiltrados.length === 0 ? (
            <div className="col-span-full text-neutral-500 text-center py-12 text-lg">
              Nenhum curso encontrado.
            </div>
          ) : (
            cursosFiltrados.map(curso => (
              <div key={curso.id} className="rounded-2xl bg-white shadow border border-neutral-200 p-6 flex flex-col items-start transition hover:shadow-lg hover:border-neutral-300">
                <h3 className="text-xl font-semibold text-neutral-800 mb-1">{curso.nome}</h3>
                <span className="text-sm text-neutral-500 mb-2">{curso.professor}</span>
                <div className="w-full bg-neutral-100 rounded-full h-3 mb-2 mt-2">
                  <div
                    className="bg-neutral-800 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${curso.progresso}%` }}
                  />
                </div>
                <span className="text-neutral-700 text-sm">{curso.progresso}% concluído</span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Atividades */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-neutral-900">Atividades</h2>
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              value={novaAtividade.curso}
              onChange={e => setNovaAtividade({ ...novaAtividade, curso: e.target.value })}
              placeholder="Curso"
              className="px-3 py-1 rounded border border-neutral-300 bg-white/90 text-neutral-900 focus:ring-2 focus:ring-neutral-400"
            />
            <input
              type="text"
              value={novaAtividade.titulo}
              onChange={e => setNovaAtividade({ ...novaAtividade, titulo: e.target.value })}
              placeholder="Título"
              className="px-3 py-1 rounded border border-neutral-300 bg-white/90 text-neutral-900 focus:ring-2 focus:ring-neutral-400"
            />
            <input
              type="date"
              value={novaAtividade.prazo}
              onChange={e => setNovaAtividade({ ...novaAtividade, prazo: e.target.value })}
              className="px-3 py-1 rounded border border-neutral-300 bg-white/90 text-neutral-900 focus:ring-2 focus:ring-neutral-400"
            />
            <button
              onClick={adicionarAtividade}
              className="px-4 py-1 bg-neutral-900 text-white rounded hover:bg-neutral-700 transition"
            >
              Adicionar
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow border border-neutral-200">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left text-neutral-700 font-semibold">Curso</th>
                <th className="py-3 px-4 text-left text-neutral-700 font-semibold">Atividade</th>
                <th className="py-3 px-4 text-left text-neutral-700 font-semibold">Prazo</th>
                <th className="py-3 px-4 text-left text-neutral-700 font-semibold">Status</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {atividadesVisiveis.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-neutral-500 text-center py-8">
                    Nenhuma atividade cadastrada.
                  </td>
                </tr>
              ) : (
                atividadesVisiveis.map(atividade => (
                  <tr key={atividade.id} className="border-t border-neutral-100 hover:bg-neutral-50 transition">
                    <td className="py-3 px-4">{atividade.curso}</td>
                    <td className="py-3 px-4">{atividade.titulo}</td>
                    <td className="py-3 px-4">{new Date(atividade.prazo).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        atividade.status === "concluída"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {atividade.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {atividade.status !== "concluída" && (
                        <button
                          onClick={() => concluirAtividade(atividade.id)}
                          className="px-3 py-1 bg-neutral-900 text-white rounded hover:bg-neutral-700 transition text-xs"
                        >
                          Marcar como concluída
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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