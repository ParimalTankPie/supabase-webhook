import { NextResponse } from 'next/server';
import { supabase } from './lib/supabaseClient';

export async function middleware(req) {
  const token = req.cookies['sb-access-token'];
  if (!token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  return NextResponse.next();
}
