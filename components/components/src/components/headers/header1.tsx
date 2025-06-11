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
                        <li
                        className="relative text-blue-950 transition duration-300 rounded-2xl cursor-pointer select-none"
                        onMouseEnter={() => setItemMenu(true)}
                        onMouseLeave={() => setItemMenu(false)}
                        >
                        Opções
                        
                        </li>
                        {itemMenu && (
                        <>
                        <div
                              className="fixed left-0 right-0 "
                              style={{ top: "3.8rem", height: "24px", zIndex: 49, pointerEvents: "auto" }}
                              onMouseEnter={() => setItemMenu(true)}
                              onMouseLeave={() => setItemMenu(false)}
                        />
                        <ul
                              className="fixed left-0 right-0 top-[calc(3.8rem+24px)] bg-blue-950 shadow-lg z-50 transition duration-300 "
                              onMouseEnter={() => setItemMenu(true)}
                              onMouseLeave={() => setItemMenu(false)}
                        >
                              <li>
                              <a href="#option1"className="block px-4 py-2  hover:bg-blue-800 text-white w-[10%]">Option 1</a>
                              </li>
                              <li>
                              <a href="#option2" className="block px-4 py-2  hover:bg-blue-800 text-white w-[10%]">Option 2</a>
                              </li>
                              <li>
                              <a href="#option3" className="block px-4 py-2  hover:bg-blue-800 text-white w-[10%]">Option 3</a>
                              </li>
                        </ul>
                        </>
                        )}
                  </ul>
            </nav>
            </div>
            </div>
      </header>
      );
}