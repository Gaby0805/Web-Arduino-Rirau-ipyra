import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { TableProperties } from "lucide-react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Área protegida do sistema",
};

const SECRET_KEY = process.env.JWT_SECRET || "SECRET_KEY";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🧠 Lê os cookies (agora é assíncrono)
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    // 🚫 Sem token → redireciona para login
    redirect("/");
  }

  try {
    // ✅ Verifica o JWT
    jwt.verify(token, SECRET_KEY);
  } catch {
    // 🚫 Token inválido ou expirado
    redirect("/");
  }

  // 🔓 Token válido → renderiza a página
  return <section>{children}
  <Toaster richColors position="top-center" duration={2000}/>
  </section>;
}
