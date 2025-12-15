'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function SetupPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [businessName, setBusinessName] = useState('');

  const handleCreateBusiness = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('businesses')
      .insert({ name: businessName, user_id: user.id })
      .select('id')
      .single();

    if (error) {
      console.error('Error creating business:', error);
    } else {
      // Redirect to add the first location
      router.push('/dashboard/locations/new');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Set up your Business</h1>
      <p className="text-slate-600 mt-2">Let's start by giving your business a name.</p>
      <div className="mt-6 max-w-md">
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="e.g., Al-Baik Restaurant Group"
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl"
        />
        <button
          onClick={handleCreateBusiness}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
        >
          Create Business
        </button>
      </div>
    </div>
  );
}