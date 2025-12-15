import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);

    // Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Check if user has a business
      const { data: business } = await supabase
        .from('businesses')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (business) {
        // User has a business, redirect to dashboard
        return NextResponse.redirect(`${origin}/dashboard`);
      } else {
        // New user, redirect to business setup
        return NextResponse.redirect(`${origin}/setup`);
      }
    }
  }

  // Default redirect to home
  return NextResponse.redirect(`${origin}/`);
}