export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="main-content">
      {children}
    </main>
  );
}