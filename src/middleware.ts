import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Empty middleware - previous Supabase auth middleware removed
  return NextResponse.next();
} 