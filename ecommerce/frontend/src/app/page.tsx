"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewProductsCarousel from "@/components/NewProductsCarousel";
import Footer from "@/components/Footer";
import PopularProductsCarousel from "@/components/PopularProductsCarousel";
import CategoriesShowcase from "@/components/CategoriesShowcase";
import Testimonials from "@/components/Testimonials";
import BenefitsSection from "@/components/BenefitsSection";
export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 main-bg">
      <Header />
      <main className="flex-1">
        <Hero />
        <CategoriesShowcase />
        <NewProductsCarousel />
        <BenefitsSection />
        <PopularProductsCarousel />
        <Testimonials />
      </main>
      <div className="bg-primary text-white p-4">Teste cor primária</div>
      <div className="bg-[color:var(--tw-color-primary)] text-white p-4">Teste cor primária via arbitrary</div>
      <div className="bg-red-500 text-white p-4">Teste Tailwind padrão</div>
      <Footer />
      
    </div>
  );
}