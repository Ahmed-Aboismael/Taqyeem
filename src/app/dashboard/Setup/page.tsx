'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SetupPage() {
  const [businessName, setBusinessName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const { error } = await supabase.from('businesses').insert({
      user_id: user.id,
      name: businessName,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Business created successfully!');
      router.push('/dashboard');
      router.refresh();
    }

    setIsLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Set Up Your Business</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mt-8 space-y-6">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
            Business Name
          </label>
          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-md"
            placeholder="Enter your business name"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md disabled:bg-gray-400 hover:bg-blue-700"
        >
          {isLoading ? 'Creating...' : 'Create Business'}
        </button>
      </form>
    </div>
  );
}