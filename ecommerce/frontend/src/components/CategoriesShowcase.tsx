"use client";

import { Truck, ShieldCheck, Globe, Clock } from "lucide-react";

const highlights = [
  {
    title: "Entrega para todo o Brasil",
    description: "Receba onde estiver, com rapidez e segurança.",
    icon: <Truck className="w-7 h-7 text-blue-700" />,
  },
  {
    title: "Compra 100% Segura",
    description: "Seus dados protegidos com criptografia.",
    icon: <ShieldCheck className="w-7 h-7 text-blue-700" />,
  },
  {
    title: "Atendimento ágil",
    description: "Suporte eficiente para você.",
    icon: <Clock className="w-7 h-7 text-blue-700" />,
  },
  {
    title: "Confiança e tradição",
    description: "Milhares de clientes satisfeitos.",
    icon: <Globe className="w-7 h-7 text-blue-700" />,
  },
];

export default function CategoriesShowcase() {
  return (
    <section className="w-full bg-white py-8 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-stretch">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className={`
                flex flex-col items-center justify-center
                bg-gray-50 border border-blue-100 rounded-xl
                px-6 py-6 w-full max-w-xs
                shadow-sm transition
                hover:shadow-lg hover:border-yellow-400 hover:bg-yellow-50
                focus-within:ring-2 focus-within:ring-yellow-200
                cursor-default select-none
                group
                relative
                overflow-hidden
              `}
              tabIndex={0}
              aria-label={item.title}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white border border-gray-200 mb-3 group-hover:bg-yellow-100 group-hover:border-yellow-400 transition">
                {item.icon}
              </div>
              <div className="font-extrabold text-blue-900 text-lg mb-1 group-hover:text-yellow-600 transition">{item.title}</div>
              <div className="text-gray-700 text-sm text-center">{item.description}</div>
              {/* Detalhe amarelo sutil no topo */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-yellow-400 rounded-b-full opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}