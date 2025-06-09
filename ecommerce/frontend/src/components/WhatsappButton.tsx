import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MESSAGE = "Olá, gostaria de falar com você!";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export function WhatsappButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        right: "24px",
        bottom: "24px",
        zIndex: 9999,
        backgroundColor: "#25D366",
        borderRadius: "50%",
        width: "80px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
      }}
      aria-label="Conversar no WhatsApp"
    >
      <FaWhatsapp size={50} color="white" />
    </a>
  );
}