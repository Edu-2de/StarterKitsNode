"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDenied from "@/components/AdminDenied";
import LoadingScreen from "@/components/LoadingScreen";

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [notAllowed, setNotAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    // Simula loading de 30 segundos antes de checar permissão
    const loadingTimeout = setTimeout(() => {
      if (!token || role !== "admin") {
        setNotAllowed(true);
        setChecking(false);
        setTimeout(() => {
          router.replace("/login");
        }, 5000);
      } else {
        setChecking(false);
      }
    }, 30000);

    return () => clearTimeout(loadingTimeout);
  }, [router]);

  if (checking) {
    return <LoadingScreen />;
  }

  if (notAllowed) {
    return <AdminDenied />;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Conteúdo restrito */}
    </div>
  );
}