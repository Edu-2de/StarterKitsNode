"use client";
import { useState, useRef, useEffect } from "react";
import { FiSearch, FiPhoneCall, FiX } from "react-icons/fi";

const SUGESTOES = [
  "Clínica Geral",
  "Cardiologia",
  "Pediatria",
  "Ortopedia",
  "Exame: Hemograma",
  "Médico: Dr. João Silva",
  "Médico: Dra. Ana Paula",
];

export default function Hero1() {
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Atualiza sugestões conforme digita
  useEffect(() => {
    if (search.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    setSuggestions(
      SUGESTOES.filter((s) =>
        s.toLowerCase().includes(search.trim().toLowerCase())
      )
    );
  }, [search]);

  // Fecha resultados ao clicar fora
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowResult(false);
        setFocus(false);
      }
    }
    if (focus || showResult) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [focus, showResult]);

  return (
    <section className="relative bg-neutral-50 min-h-[520px] flex items-center justify-center px-4 pt-40 pb-16 md:pt-56 md:pb-28">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-40 h-40 bg-neutral-200 rounded-full blur-2xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-neutral-300 rounded-full blur-2xl opacity-60" />
      </div>

      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-neutral-200 text-neutral-700 text-xs font-semibold mb-4 tracking-widest uppercase">
          Bem-vindo ao Hospital Vida
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-4 leading-tight">
          Cuidando da sua saúde com{" "}
          <span className="text-neutral-700">excelência</span> e{" "}
          <span className="text-neutral-500">humanidade</span>
        </h1>
        <p className="text-neutral-600 text-lg mb-8 max-w-2xl">
          Atendimento médico de alta qualidade, tecnologia de ponta e uma equipe dedicada ao seu bem-estar. Agende consultas, encontre especialistas e saiba mais sobre nossos serviços.
        </p>

        {/* Search/interaction */}
        <form
          className={`flex w-full max-w-xl mx-auto bg-white border-2 ${
            focus ? "border-neutral-700 shadow-lg" : "border-neutral-200"
          } rounded-full overflow-hidden transition-all duration-200`}
          onSubmit={e => {
            e.preventDefault();
            if (search.trim()) setShowResult(true);
          }}
        >
          <input
            ref={inputRef}
            type="text"
            className="flex-1 px-5 py-3 text-base bg-transparent outline-none text-neutral-900 placeholder-neutral-400"
            placeholder="Buscar especialidades, médicos ou exames..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setShowResult(false);
            }}
            onFocus={() => setFocus(true)}
            aria-label="Buscar"
            autoComplete="off"
          />
          {search && (
            <button
              type="button"
              className="px-2 text-neutral-400 hover:text-neutral-700 transition"
              onClick={() => {
                setSearch("");
                setShowResult(false);
                setSuggestions([]);
                inputRef.current?.focus();
              }}
              tabIndex={-1}
              aria-label="Limpar busca"
            >
              <FiX className="text-lg" />
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold flex items-center gap-2 transition"
            aria-label="Buscar"
          >
            <FiSearch className="text-lg" />
            <span className="hidden sm:inline">Buscar</span>
          </button>
        </form>

        {/* Sugestões dinâmicas */}
        {focus && suggestions.length > 0 && (
          <div className="w-full max-w-xl mx-auto mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg text-left animate-fade-in">
            <ul>
              {suggestions.map((s) => (
                <li
                  key={s}
                  className="px-6 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer transition"
                  onMouseDown={() => {
                    setSearch(s);
                    setShowResult(true);
                    setFocus(false);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Resultados simulados */}
        {showResult && (
          <div className="w-full max-w-xl mx-auto mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg text-left animate-fade-in">
            <div className="px-6 py-4">
              <span className="block text-sm text-neutral-500 mb-2">Resultados para:</span>
              <span className="block text-neutral-900 font-semibold mb-2">{search}</span>
              <ul className="space-y-1">
                <li className="text-neutral-700 hover:text-neutral-900 cursor-pointer transition">Especialidade: Clínica Geral</li>
                <li className="text-neutral-700 hover:text-neutral-900 cursor-pointer transition">Médico: Dr. João Silva</li>
                <li className="text-neutral-700 hover:text-neutral-900 cursor-pointer transition">Exame: Hemograma</li>
              </ul>
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-10 justify-center">
          <a
            href="#agendar"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-900 font-medium border border-neutral-300 transition shadow-sm"
          >
            <FiPhoneCall className="text-lg" />
            Agendar Consulta
          </a>
          <a
            href="#especialidades"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-100 text-neutral-800 font-medium border border-neutral-200 transition shadow-sm"
          >
            Ver Especialidades
          </a>
        </div>
      </div>
    </section>
  );
}