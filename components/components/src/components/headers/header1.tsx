"use client";
import React from 'react';


export default function Header1() {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-500 text-white">
      <h1 className="text-xl font-bold">Header 1</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#home" className="hover:underline">Home</a></li>
          <li><a href="#about" className="hover:underline">About</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}