"use client";
import { useState, useRef } from "react";

export default function Teste1() {
      const [contador, setContador] = useState(0);
       const intervalRef = useRef<NodeJS.Timeout | null>(null);

      const startCounting = () => {
      if (intervalRef.current) return; 
      intervalRef.current = setInterval(() => {
            setContador((prev) => prev + 1);
      }, 100); 
      };

      const stopCounting = () => {
      if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
      }
      };

      const encrementar = () => {
            setContador(contador + 1);
      }





      const startRemoveCounting = () => {
      if (intervalRef.current) return;
      intervalRef.current = setInterval(() => {
            setContador((prev) => prev - 1);
      }, 100);
      };

      const stopRemoveCounting = () => {
      if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
      }
      };

      const decrementar = () =>{
            setContador(contador - 1);
      }







      const resetar = () => {
            setContador(0);
      }

      return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                  <h2 
                  className={`text-3xl font-bold mb-4 
                  ${contador === 0 ? 'text-gray-10' : contador > 0 ? 'text-green-500' : 'text-red-500'}`}>Contador: {contador}
                  </h2>
                  <div className="flex space-x-4">

                        <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"  
                        onMouseDown={startCounting}
                        onMouseUp={stopCounting}
                        onMouseLeave={stopCounting}
                        onClick={encrementar}>+
                        </button>

                        <button 
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" 
                        onMouseDown={startRemoveCounting}
                        onMouseUp={stopRemoveCounting}
                        onMouseLeave={stopRemoveCounting}
                        onClick={decrementar}>-
                        </button>

                        <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded" onClick={resetar}>Reset</button>
                  </div>
            
            </div>
      );
}