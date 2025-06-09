"use client";

import { ShieldCheck, Smile, CreditCard, Gift } from "lucide-react";

const benefits = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-700 group-hover:text-blue-900 transition-colors" />,
    title: "Segurança Total",
    description: "Ambiente protegido, seus dados e compras sempre seguros.",
  },
  {
    icon: <Smile className="w-8 h-8 text-blue-700 group-hover:text-blue-900 transition-colors" />,
    title: "Satisfação Garantida",
    description: "Devolução fácil e suporte humanizado para sua tranquilidade.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-blue-700 group-hover:text-blue-900 transition-colors" />,
    title: "Pagamento Facilitado",
    description: "Diversas formas de pagamento e parcelamento sem complicação.",
  },
  {
    icon: <Gift className="w-8 h-8 text-blue-700 group-hover:text-blue-900 transition-colors" />,
    title: "Ofertas Exclusivas",
    description: "Descontos e promoções especiais para clientes cadastrados.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 via-white to-blue-50 py-16 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-12 text-center tracking-tight">
          Por que comprar conosco?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={`
                flex flex-col items-center text-center bg-white border border-blue-100 rounded-2xl p-8
                shadow-[0_2px_16px_0_rgba(30,41,59,0.06)]
                hover:shadow-xl hover:border-yellow-400 hover:bg-yellow-50
                transition-all duration-300 group relative overflow-hidden
                cursor-pointer
              `}
            >
              {/* Detalhe decorativo azul */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-blue-200 rounded-b-xl" />
              <div className="mb-5 flex items-center justify-center rounded-full bg-blue-100 w-16 h-16 border border-blue-200 group-hover:bg-yellow-100 group-hover:border-yellow-400 transition-all duration-300 shadow-sm">
                {benefit.icon}
              </div>
              <div className="font-bold text-blue-900 text-lg mb-2 group-hover:text-yellow-700 transition">{benefit.title}</div>
              <div className="text-blue-900/70 text-base">{benefit.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}