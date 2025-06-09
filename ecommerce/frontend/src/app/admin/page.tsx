"use client";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminPage() {
  const router = useRouter();

  return (
    <main className="flex">
      <AdminSidebar onLogout={() => router.replace("/login")} />
      <div className="flex-1 p-6">
        <h1>Admin Dashboard</h1>
        {/* Conteúdo restrito */}
      </div>
    </main>
  );
}