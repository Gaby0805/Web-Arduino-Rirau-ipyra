import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";

const SECRET_KEY = process.env.JWT_SECRET || "SECRET_KEY";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // Lê os cookies (assíncrono)
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/"); // sem token → redireciona pro login
  }

  try {
    jwt.verify(token, SECRET_KEY); // verifica JWT
  } catch {
    redirect("/"); // token inválido → redireciona pro login
  }

  return (
    <html lang="en">
      <body>
        {/* Notificações */}
        <Toaster richColors position="top-center" duration={2000} />

        {/* Conteúdo das páginas do dashboard */}
        {children}
      </body>
    </html>
  );
}
