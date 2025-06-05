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
      <Footer />
    </div>
  );
}