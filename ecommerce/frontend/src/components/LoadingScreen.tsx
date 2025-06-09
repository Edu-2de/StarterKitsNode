import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-50/90 backdrop-blur-sm">
      {/* Logo animada */}
      <div className="flex items-center mb-8 select-none">
        <span className="text-3xl font-extrabold tracking-tight text-yellow-400 drop-shadow-sm animate-logo-bounce">
          Shop
        </span>
        <span className="text-3xl font-extrabold tracking-tight text-blue-900 drop-shadow-sm animate-logo-bounce2 ml-1">
          Now
        </span>
      </div>
      {/* Spinner */}
      <div className="relative w-14 h-14 flex items-center justify-center mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-blue-200 border-t-yellow-400 animate-spin-slow"></div>
        <div className="w-7 h-7 rounded-full bg-yellow-400 shadow-lg"></div>
      </div>
      <span className="text-blue-900 font-semibold text-lg tracking-tight animate-fade-in">
        Carregando...
      </span>
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 1.2s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg);}
        }
        .animate-logo-bounce {
          animation: logoBounce 1.2s cubic-bezier(.4,1.4,.6,1) infinite alternate;
        }
        .animate-logo-bounce2 {
          animation: logoBounce2 1.2s cubic-bezier(.4,1.4,.6,1) infinite alternate;
        }
        @keyframes logoBounce {
          0% { transform: translateY(0);}
          100% { transform: translateY(-8px);}
        }
        @keyframes logoBounce2 {
          0% { transform: translateY(-4px);}
          100% { transform: translateY(4px);}
        }
        .animate-fade-in {
          animation: fadeIn 1.2s ease both;
        }
        @keyframes fadeIn {
          0% { opacity: 0;}
          100% { opacity: 1;}
        }
      `}</style>
    </div>
  );
}