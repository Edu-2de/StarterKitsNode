"use client";

import { Truck, ShieldCheck, Globe, Clock } from "lucide-react";

const highlights = [
  {
    title: "Entrega para todo o Brasil",
    description: "Receba onde estiver, com rapidez e segurança.",
    icon: <Truck className="w-8 h-8 text-neutral-400" />,
  },
  {
    title: "Compra 100% Segura",
    description: "Seus dados protegidos com criptografia.",
    icon: <ShieldCheck className="w-8 h-8 text-neutral-400" />,
  },
  {
    title: "Atendimento ágil",
    description: "Suporte eficiente para você.",
    icon: <Clock className="w-8 h-8 text-neutral-400" />,
  },
  {
    title: "Confiança e tradição",
    description: "Milhares de clientes satisfeitos.",
    icon: <Globe className="w-8 h-8 text-neutral-400" />,
  },
];

export default function CategoriesShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-2 sm:px-4 py-5 sm:py-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className={`
              group relative flex flex-col items-center justify-center
              h-32 rounded-2xl border border-neutral-100 bg-white
              text-neutral-700 font-semibold text-base sm:text-lg
              shadow-sm transition
              hover:shadow-md hover:border-neutral-200 hover:bg-neutral-50
              focus-within:ring-2 focus-within:ring-neutral-200
              cursor-default select-none overflow-hidden
              px-3 text-center
            `}
            tabIndex={0}
            aria-label={item.title}
          >
            <div className="mb-3">{item.icon}</div>
            <div className="font-semibold text-neutral-700 mb-1">{item.title}</div>
            <div className="text-xs text-neutral-500">{item.description}</div>
            <span
              className="absolute inset-0 pointer-events-none group-active:ring-2 group-active:ring-neutral-200 rounded-2xl"
            />
          </div>
        ))}
      </div>
    </section>
  );
}