import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Chave secreta do seu JWT
const SECRET_KEY = process.env.JWT_SECRET || "SECRET_KEY";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // Se não houver token, redireciona para login
    console.log('sem login')
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    // Verifica o token
    jwt.verify(token, SECRET_KEY);
    // Se estiver ok, permite a requisição
    return NextResponse.next();
  } catch (err) {
    // Token inválido ou expirado
    return NextResponse.redirect(new URL("/", req.url));
  }
}

// Define quais rotas o middleware deve proteger
export const config = {
  matcher: ["/dashboard/"], // todas as subrotas de dashboard
};