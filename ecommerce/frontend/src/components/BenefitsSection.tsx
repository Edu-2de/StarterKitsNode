"use client";

import { ShieldCheck, Smile, CreditCard, Gift } from "lucide-react";

const benefits = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-700 group-hover:text-yellow-500 transition-colors" />,
    title: "Segurança Total",
    description: "Ambiente protegido, seus dados e compras sempre seguros.",
  },
  {
    icon: <Smile className="w-8 h-8 text-blue-700 group-hover:text-yellow-500 transition-colors" />,
    title: "Satisfação Garantida",
    description: "Devolução fácil e suporte humanizado para sua tranquilidade.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-blue-700 group-hover:text-yellow-500 transition-colors" />,
    title: "Pagamento Facilitado",
    description: "Diversas formas de pagamento e parcelamento sem complicação.",
  },
  {
    icon: <Gift className="w-8 h-8 text-blue-700 group-hover:text-yellow-500 transition-colors" />,
    title: "Ofertas Exclusivas",
    description: "Descontos e promoções especiais para clientes cadastrados.",
  },
];

export default function BenefitsSection() {
  // Efeito de destaque animado JS
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  }

  return (
    <section className="w-full bg-neutral-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-14 text-center tracking-tight drop-shadow-sm">
          Por que comprar conosco?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={`
                group relative flex flex-col items-center text-center bg-white/90 rounded-3xl p-8
                shadow-xl hover:shadow-2xl hover:bg-yellow-50/80
                transition-all duration-300 cursor-pointer overflow-visible
                ring-1 ring-blue-100 hover:ring-yellow-300
                before:absolute before:-z-10 before:inset-0 before:rounded-3xl
                before:bg-yellow-100/30 before:opacity-0 group-hover:before:opacity-100
              `}
              style={{ minHeight: 320 }}
              onMouseMove={handleMouseMove}
            >
              {/* Glow effect */}
              <span
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "radial-gradient(400px circle at var(--x,50%) var(--y,50%), #fef9c3 0%, transparent 80%)",
                  zIndex: 0,
                }}
              />
              <div className="mb-6 flex items-center justify-center rounded-full bg-blue-50 w-20 h-20 border-2 border-blue-100 group-hover:border-yellow-400 transition-all duration-300 shadow">
                {benefit.icon}
              </div>
              <div className="font-extrabold text-blue-900 text-xl mb-2 group-hover:text-yellow-600 transition drop-shadow-sm z-10">
                {benefit.title}
              </div>
              <div className="text-gray-700 text-base leading-relaxed z-10">{benefit.description}</div>
              {/* Linha animada */}
              <span className="block mt-6 h-1 w-12 rounded-full bg-yellow-200 group-hover:bg-yellow-400 transition-all duration-300 z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}