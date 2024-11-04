import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTEnum } from "@/shared/config/auth";
import { AUTH, HOME } from "@/shared/config/routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get(JWTEnum.REFRESH_TOKEN)?.value;

  if (refreshToken && pathname === AUTH) {
    return NextResponse.redirect(new URL(HOME, request.url));
  }

  if (!refreshToken && pathname === HOME) {
    return NextResponse.redirect(new URL(AUTH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [AUTH, HOME],
};
