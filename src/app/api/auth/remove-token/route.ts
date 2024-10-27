import { NextResponse } from 'next/server';
import { JWTEnum } from '@/shared/enums/auth';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  response.cookies.delete(JWTEnum.REFRESH_TOKEN);
  
  return response;
}
