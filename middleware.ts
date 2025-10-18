import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// 🚀 Importante: forçar uso do runtime Node.js
export const runtime = "nodejs";

// Chave secreta do seu JWT
const SECRET_KEY = process.env.JWT_SECRET || "SECRET_KEY";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    console.log("sem login");
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    jwt.verify(token, SECRET_KEY);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

// Define quais rotas o middleware deve proteger
export const config = {
  matcher: ["/dashboard/:path*"], // protege todas as subrotas
};
