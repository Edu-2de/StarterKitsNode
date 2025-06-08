"use client";

import { ShieldCheck, Smile, CreditCard, Gift } from "lucide-react";

const benefits = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-700" />,
    title: "Segurança Total",
    description: "Ambiente protegido, seus dados e compras sempre seguros.",
  },
  {
    icon: <Smile className="w-8 h-8 text-blue-700" />,
    title: "Satisfação Garantida",
    description: "Devolução fácil e suporte humanizado para sua tranquilidade.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-blue-700" />,
    title: "Pagamento Facilitado",
    description: "Diversas formas de pagamento e parcelamento sem complicação.",
  },
  {
    icon: <Gift className="w-8 h-8 text-blue-700" />,
    title: "Ofertas Exclusivas",
    description: "Descontos e promoções especiais para clientes cadastrados.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="w-full bg-blue-50 py-14 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-10 text-center">
          Por que comprar conosco?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center bg-white border border-blue-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition group"
            >
              <div className="mb-4 flex items-center justify-center rounded-full bg-blue-100 w-16 h-16 border border-blue-200 group-hover:bg-blue-200 transition">
                {benefit.icon}
              </div>
              <div className="font-semibold text-blue-900 text-lg mb-2">{benefit.title}</div>
              <div className="text-blue-700/70 text-base">{benefit.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}