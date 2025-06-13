"use client";
import {SetStateAction, useState} from 'react';

const lista = [
    { id: 1, nome: 'Item 1' },
    { id: 2, nome: 'Item 2' },
    { id: 3, nome: 'Item 3' },
  ];


export default function Teste2() {
  
const [filtro , setFiltro] = useState('');
const [itens, setItens] = useState(lista);

const handleFiltro = (e: { target: { value: SetStateAction<string>; }; }) => {
      setFiltro(e.target.value);
};

const itensFiltrados = itens.filter(item =>
  item.nome.toLowerCase().replace(/\s+/g, "").includes(filtro.toLowerCase().replace(/\s+/g, ""))
);

const addItem = (nome: string) => {
  const novoItem = { id: lista.length + 1, nome };
  lista.push(novoItem);
  setItens([...itens, novoItem]);
};


const removeUltimoItem = () => {
    setItens(itens => itens.slice(0, -1));
  };

return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <input
        type="text"
        value={filtro}
        onChange={handleFiltro}
        placeholder="Filtrar itens..."
        className="mb-4 p-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
      />
      <ul className="list-disc">

            {filtro.trim() === "" ? (
            <li className="mb-2 text-gray-900">Digite algo para buscar</li>
            ) 

            : itensFiltrados.length === 0 ? (
            <li className="mb-2 text-gray-900">Nenhum item encontrado</li>
            ) 
            
            : (
            itensFiltrados.map(item => (
                  <li className="mb-2 text-gray-900" key={item.id}>{item.nome}</li>
            ))
            )}
      </ul>

      <button
        onClick={() => addItem(`Item ${lista.length + 1}`)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Adicionar Item
      </button>

     <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition" onClick={removeUltimoItem}>Remover último item</button>
    </div>
  );
}