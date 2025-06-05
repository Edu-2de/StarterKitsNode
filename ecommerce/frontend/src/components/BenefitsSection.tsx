"use client";

import { ShieldCheck, Smile, CreditCard, Gift } from "lucide-react";

const benefits = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-neutral-600" />,
    title: "Segurança Total",
    description: "Ambiente protegido, seus dados e compras sempre seguros.",
  },
  {
    icon: <Smile className="w-8 h-8 text-neutral-600" />,
    title: "Satisfação Garantida",
    description: "Devolução fácil e suporte humanizado para sua tranquilidade.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-neutral-600" />,
    title: "Pagamento Facilitado",
    description: "Diversas formas de pagamento e parcelamento sem complicação.",
  },
  {
    icon: <Gift className="w-8 h-8 text-neutral-600" />,
    title: "Ofertas Exclusivas",
    description: "Descontos e promoções especiais para clientes cadastrados.",
  },
];


export default function BenefitsSection() {
  return (
    <section className="w-full bg-white py-16 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-700 mb-12 text-center">
          Por que comprar conosco?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center bg-neutral-50 border border-neutral-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition group"
            >
              <div className="mb-4 flex items-center justify-center rounded-full bg-neutral-100 w-16 h-16 border border-neutral-200 group-hover:bg-neutral-200 transition">
                {benefit.icon}
              </div>
              <div className="font-semibold text-neutral-800 text-lg mb-2">{benefit.title}</div>
              <div className="text-neutral-500 text-base">{benefit.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}