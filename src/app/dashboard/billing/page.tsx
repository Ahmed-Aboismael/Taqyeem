'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client'
const supabase = await createClient()

// Replace with your actual Lemon Squeezy checkout links
const plans = {
  '1 Link': 'https://taqyeem.lemonsqueezy.com/buy/ca14ed43-86f9-42db-b8b5-39817f7e83ea?desc=0&discount=0',
  '5 Links': 'https://taqyeem.lemonsqueezy.com/buy/79d7b9fc-9627-43bd-8723-77815dfc2621?media=0&desc=0&discount=0',
  '20 Links': 'https://taqyeem.lemonsqueezy.com/buy/b82480f5-93f5-471d-b2ea-93c99c4d8b3f?media=0&desc=0&discount=0',
};

export default function BillingPage( ) {
  const supabase = createClient();
  const [businessId, setBusinessId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Assuming one business per user for now. Adapt for multi-business.
        const { data, error } = await supabase.from('businesses').select('id').eq('user_id', user.id).single();
        if (data) setBusinessId(data.id);
      }
    };
    fetchBusiness();
  }, [supabase]);

  const getCheckoutUrl = (baseUrl: string) => {
    if (!businessId) return '#';
    // Pass business_id to Lemon Squeezy checkout
    return `${baseUrl}?checkout[custom][business_id]=${businessId}`;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Choose Your Plan</h1>
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {Object.entries(plans).map(([name, url]) => (
          <div key={name} className="border rounded-lg p-6">
            <h2 className="text-xl font-bold">{name}</h2>
            {/* Add pricing and features here */}
            <a href={getCheckoutUrl(url)} className="mt-4 block text-center bg-blue-600 text-white py-2 rounded-lg">
              Subscribe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}