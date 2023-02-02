import { RequestCookie } from "next/dist/server/web/spec-extension/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const parseJwt = (token: string) => JSON.parse(atob(token.split(".")[1]));

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const response = new NextResponse();
  const token = String(req.cookies.get("Exsto_token"));

  const urlUnprotected = [
    "/login",
    "/register",
    "/reset",
    "/logout",
    "/forgot",
  ];

  if (pathname.startsWith("/_next")) return NextResponse.next();
  if (urlUnprotected.includes(pathname)) return NextResponse.next();

  if (token) {
    const decodedToken = parseJwt(token);
    const dateNow = new Date();
    if (decodedToken && decodedToken.exp < dateNow.getTime()) {
      response.cookies.set("Exsto_token", token);
      return NextResponse.next();
    }
  }
  response.cookies.delete("Exsto_token");
  return NextResponse.redirect(new URL(urlUnprotected[0], req.url));
}
