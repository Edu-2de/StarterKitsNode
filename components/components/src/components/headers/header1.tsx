"use client";
import React from 'react';
import { useState } from 'react';

export default function Header1() {

      const [itemMenu, setItemMenu] = useState(false);

      const toggleMenu = () => {
            setItemMenu(!itemMenu);
      };

      return (
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
            <div className="max-w-7xl mx-auto mt-6 px-4">
            <div className="flex items-center justify-between bg-white/95 shadow-lg rounded-2xl p-4 pointer-events-auto border border-gray-200">
            <h1 className="text-xl font-bold text-blue-950">Header 1</h1>
            <nav>
                  <ul className="flex space-x-4">
                  <li>
                  <a href="#home" className= "text-blue-950 hover:bg-blue-800 hover:text-white transition duration-300 p-2 rounded-2xl">Home</a>
                  </li>
                  <li>
                  <a href="#about" className="text-blue-950 hover:bg-blue-800 hover:text-white transition duration-300 p-2 rounded-2xl">About</a>
                  </li>
                  <li>
                  <a href="#contact" className="text-blue-950 hover:bg-blue-800 hover:text-white transition duration-300 p-2 rounded-2xl">Contact</a>
                  </li>
                  <li onClick={toggleMenu} className="text-blue-950 hover:bg-blue-800 hover:text-white transition duration-300 rounded-2xl">Opções
                        {itemMenu ? '^' : 'v'}
                        <ul className={`absolute bg-white shadow-lg rounded-2xl mt-2 ${itemMenu ? 'block' : 'hidden'}`}>
                              <li>
                              <a href="#option1" className="block px-4 py-2 text-blue-950 hover:bg-blue-800 hover:text-white transition duration-300">Option 1</a>
                              </li>
                              <li>
                              <a href="#option2" className="block px-4 py-2 text-blue-950 hover:bg-blue-800 hover:text-white transition duration-300">Option 2</a>
                              </li>
                              <li>
                              <a href="#option3" className="block px-4 py-2 text-blue-950 hover:bg-blue-800 hover:text-white transition duration-300">Option 3</a>
                              </li>
                        </ul>
            
                  </li>
                  </ul>
            </nav>
            </div>
            </div>
      </header>
      );
}