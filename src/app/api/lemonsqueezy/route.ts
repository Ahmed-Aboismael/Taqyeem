import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase admin client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use the service role key for admin access
);

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  // TODO: Verify webhook signature from Lemon Squeezy for security

  const body = JSON.parse(rawBody);
  const eventName = body.meta.event_name;
  const obj = body.data;

  if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
    const businessId = obj.attributes.meta.custom_data?.business_id;
    if (!businessId) {
      return NextResponse.json({ error: 'Business ID not found in webhook metadata' }, { status: 400 });
    }

    const subscriptionData = {
      lemon_squeezy_id: obj.id,
      plan_name: obj.attributes.variant_name,
      status: obj.attributes.status,
      renews_at: obj.attributes.renews_at,
      ends_at: obj.attributes.ends_at,
      trial_ends_at: obj.attributes.trial_ends_at,
    };

    const { error } = await supabaseAdmin
      .from('subscriptions')
      .upsert({ id: businessId, ...subscriptionData }, { onConflict: 'id' });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
    }
  }

  return NextResponse.json({ status: 'ok' });
}