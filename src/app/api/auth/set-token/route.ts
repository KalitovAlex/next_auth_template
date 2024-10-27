import { NextResponse } from 'next/server';
import { JWTEnum } from '@/shared/enums/auth';

export async function POST(request: Request) {
  const { token } = await request.json();
  
  const response = NextResponse.json({ success: true });
  
  response.cookies.set({
    name: JWTEnum.REFRESH_TOKEN,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
