import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-50">
      {/* Logo minimalista, clean */}
      <div className="flex items-center gap-2 mb-8 select-none animate-fade-in">
        <span className="text-4xl font-extrabold tracking-tight text-blue-900">
          Shop
        </span>
        <span className="text-4xl font-extrabold tracking-tight text-yellow-400 animate-logo-bounce">
          Now
        </span>
      </div>
      {/* Loader circular clean */}
      <div className="relative w-14 h-14 flex items-center justify-center mb-6">
        <svg className="absolute inset-0 w-full h-full animate-spin-smooth" viewBox="0 0 56 56" fill="none">
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="#E0E7FF"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="#FACC15"
            strokeWidth="6"
            fill="none"
            strokeDasharray="60 88"
            strokeLinecap="round"
          />
        </svg>
        <div className="w-7 h-7 rounded-full bg-white shadow-inner shadow-blue-100" />
      </div>
      {/* Mensagem fluida, clean */}
      <span className="text-blue-900 text-base font-medium tracking-tight animate-fade-in2">
        Preparando sua experiência...
      </span>

      <style jsx>{`
        .animate-spin-smooth {
          animation: spin 1.1s cubic-bezier(.7,.1,.3,.9) infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg);}
        }
        .animate-logo-bounce {
          animation: logoBounce 1.1s cubic-bezier(.4,1.4,.6,1) infinite alternate;
        }
        @keyframes logoBounce {
          0% { transform: translateY(0);}
          100% { transform: translateY(-6px);}
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease both;
        }
        .animate-fade-in2 {
          animation: fadeIn 1.7s cubic-bezier(.4,1.6,.6,1) both;
        }
        @keyframes fadeIn {
          0% { opacity: 0;}
          100% { opacity: 1;}
        }
      `}</style>
    </div>
  );
}