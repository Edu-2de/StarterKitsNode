export default function Footer() {
  return (
    <footer
      className="footer"
      style={{
        background: "#f7f5f2",
        color: "#8d775f",
        padding: "2rem 0 1rem 0",
        borderTop: "1px solid #e0dedb",
        textAlign: "center",
        fontSize: "1rem",
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Starter Kits
          </div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <a href="#" style={{ color: "#8d775f", textDecoration: "none", fontWeight: 500 }}>Início</a>
            <a href="#" style={{ color: "#8d775f", textDecoration: "none", fontWeight: 500 }}>Produtos</a>
            <a href="#" style={{ color: "#8d775f", textDecoration: "none", fontWeight: 500 }}>Sobre</a>
            <a href="#" style={{ color: "#8d775f", textDecoration: "none", fontWeight: 500 }}>Contato</a>
          </div>
        </div>
        <div style={{ marginTop: "1.5rem", fontSize: "0.95rem", color: "#a89b8b" }}>
          &copy; {new Date().getFullYear()} Starter Kits. Todos os direitos reservados.
        </div>
      </div>
      <style>{`
        .footer a:hover {
          color: #b09a7d;
          text-decoration: underline;
        }
        @media (max-width: 600px) {
          .footer div[style*="flex-direction: column"] {
            gap: 0.7rem !important;
          }
          .footer div[style*="display: flex"] {
            flex-direction: column !important;
            gap: 0.7rem !important;
          }
        }
      `}</style>
    </footer>
  );
}