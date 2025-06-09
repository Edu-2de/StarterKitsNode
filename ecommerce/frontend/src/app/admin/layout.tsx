"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDenied from "@/components/AdminDenied";
import LoadingScreen from "@/components/LoadingScreen";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [notAllowed, setNotAllowed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("userRole");

      if (!token || role !== "admin") {
        setNotAllowed(true);
        setChecking(false);
        setTimeout(() => {
          router.replace("/login");
        }, 5000);
      } else {
        setChecking(false);
      }
    }, 15000); // 15 segundos

    return () => clearTimeout(timer);
  }, [router]);

  if (checking) return <LoadingScreen />;
  if (notAllowed) return <AdminDenied />;

  return <>{children}</>;
}