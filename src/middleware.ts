import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTEnum } from "@/shared/enums/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get(JWTEnum.REFRESH_TOKEN)?.value;

  if (refreshToken && pathname === "/auth") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!refreshToken && pathname === "/home") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/home"],
};
