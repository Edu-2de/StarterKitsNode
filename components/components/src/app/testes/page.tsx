"use client";
import Teste1 from "@/components/testes/teste1";
export default function TestesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 main-bg">
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-3xl font-bold">Página de Testes</h1>
       
      </main>
      <div className ="nao-usados hidden">
       <Teste1 />
      </div>
      <footer className="bg-neutral-900 text-neutral-200 p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Testes Page. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}