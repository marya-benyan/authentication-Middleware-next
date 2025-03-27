// app/middleware.js
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function middleware(req) {
  const token = req.headers.get("authorization")?.split(" ")[1]; // Expecting "Bearer <token>"
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect dashboard and subroutes
};