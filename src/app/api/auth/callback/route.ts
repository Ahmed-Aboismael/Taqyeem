import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if user has a business (existing user)
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: business } = await supabase
          .from('businesses')
          .select('id')
          .eq('user_id', user.id)
          .single();

        // If business exists, go to dashboard; otherwise go to setup
        if (business) {
          return NextResponse.redirect(`${origin}/dashboard`);
        } else {
          return NextResponse.redirect(`${origin}/setup`);
        }
      }
    }
  }

  // If something went wrong, redirect to home
  return NextResponse.redirect(`${origin}/`);
}