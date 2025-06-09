"use client";

import { Truck, ShieldCheck, Globe, Clock } from "lucide-react";

const highlights = [
  {
    title: "Entrega para todo o Brasil",
    description: "Receba onde estiver, com rapidez e segurança.",
    icon: <Truck className="w-8 h-8 text-blue-700" />,
  },
  {
    title: "Compra 100% Segura",
    description: "Seus dados protegidos com criptografia.",
    icon: <ShieldCheck className="w-8 h-8 text-blue-700" />,
  },
  {
    title: "Atendimento ágil",
    description: "Suporte eficiente para você.",
    icon: <Clock className="w-8 h-8 text-blue-700" />,
  },
  {
    title: "Confiança e tradição",
    description: "Milhares de clientes satisfeitos.",
    icon: <Globe className="w-8 h-8 text-blue-700" />,
  },
];

export default function CategoriesShowcase() {
  return (
    <section className="w-full bg-white py-8 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className={`
                flex flex-col items-center justify-center
                h-28 rounded-2xl border border-blue-100 bg-blue-50
                text-blue-900 font-semibold text-base sm:text-lg
                shadow-sm transition
                hover:shadow-md hover:border-blue-200 hover:bg-blue-100
                focus-within:ring-2 focus-within:ring-blue-200
                cursor-default select-none overflow-hidden
                px-3 text-center
              `}
              tabIndex={0}
              aria-label={item.title}
            >
              <div className="mb-2">{item.icon}</div>
              <div className="font-semibold text-blue-900 mb-1">{item.title}</div>
              <div className="text-xs text-blue-700/70">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}