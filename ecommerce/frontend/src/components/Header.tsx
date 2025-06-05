"use client";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 800 && open) {
        setOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  // Fecha o menu ao clicar em um item (mobile)
  function handleMenuClick() {
    if (window.innerWidth <= 800) setOpen(false);
  }

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        open &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #e0e0e0",
        padding: "0.5rem 0",
        boxShadow: "0 1px 4px rgba(180,170,150,0.04)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "0 1rem",
          position: "relative",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "#8d775f",
            letterSpacing: "1px",
            zIndex: 20,
          }}
        >
          Logo
        </div>
        {/* Hamburger menu for mobile */}
        <button
          ref={burgerRef}
          onClick={() => setOpen((v) => !v)}
          className="header-hamburger"
          style={{
            display: "none",
            background: "none",
            border: "none",
            fontSize: 26,
            color: "#8d775f",
            cursor: "pointer",
            zIndex: 21,
          }}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? "✕" : "☰"}
        </button>
        {/* Menu */}
        <ul
          ref={menuRef}
          className={`header-menu${open ? " open" : ""}`}
          style={{
            listStyle: "none",
            gap: "1.2rem",
            margin: 0,
            padding: 0,
            alignItems: "center",
            transition: "all 0.3s",
          }}
        >
          <li>
            <a
              href="#"
              onClick={handleMenuClick}
              style={{
                textDecoration: "none",
                color: "#8d775f",
                fontWeight: 500,
                fontSize: "1rem",
                transition: "color 0.2s",
              }}
            >
              Início
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={handleMenuClick}
              style={{
                textDecoration: "none",
                color: "#8d775f",
                fontWeight: 500,
                fontSize: "1rem",
                transition: "color 0.2s",
              }}
            >
              Produtos
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={handleMenuClick}
              style={{
                textDecoration: "none",
                color: "#8d775f",
                fontWeight: 500,
                fontSize: "1rem",
                transition: "color 0.2s",
              }}
            >
              Sobre
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={handleMenuClick}
              style={{
                textDecoration: "none",
                color: "#8d775f",
                fontWeight: 500,
                fontSize: "1rem",
                transition: "color 0.2s",
              }}
            >
              Contato
            </a>
          </li>
        </ul>
        <div className="header-actions" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder="Pesquisar..."
            style={{
              padding: "0.35rem 0.7rem",
              border: "1px solid #e0dedb",
              borderRadius: 6,
              background: "#faf9f7",
              fontSize: "1rem",
              outline: "none",
              transition: "border 0.2s",
            }}
          />
          <button
            style={{
              background: "#8d775f",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "0.38rem 1rem",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Login
          </button>
        </div>
      </nav>
      <style>{`
        body {
          padding-top: 60px;
        }
        a:hover {
          color: #b09a7d !important;
        }
        button:hover {
          background: #b09a7d !important;
        }
        input:focus {
          border: 1.5px solid #b09a7d !important;
        }
        @media (max-width: 800px) {
          .header-hamburger {
            display: block !important;
          }
          .header-menu {
            display: none !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #fff;
            flex-direction: column;
            gap: 0.5rem;
            padding: 1rem 0;
            box-shadow: 0 4px 16px rgba(180,170,150,0.07);
            z-index: 20;
          }
          .header-menu.open {
            display: flex !important;
          }
          .header-actions {
            display: none !important;
          }
        }
        @media (min-width: 801px) {
          .header-menu {
            display: flex !important;
            position: static;
            box-shadow: none;
            padding: 0;
            background: none;
            flex-direction: row;
          }
        }
        @media (max-width: 500px) {
          nav {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </header>
  );
}