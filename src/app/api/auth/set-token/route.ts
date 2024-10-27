import { NextResponse } from "next/server";
import { JWTEnum } from "@/shared/enums/auth";
import { REFRESHTOKENLIVETIME } from "@/shared/constants/auth";

export async function POST(request: Request) {
  const { token } = await request.json();

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: JWTEnum.REFRESH_TOKEN,
    value: token,
    maxAge: REFRESHTOKENLIVETIME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return response;
}
