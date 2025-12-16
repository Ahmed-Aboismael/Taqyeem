// Save this as: src/app/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Business {
  id: string;
  name: string;
  industry: string;
  phone: string;
}

export default function DashboardPage() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAuthAndBusiness();
  }, []);

  const checkAuthAndBusiness = async () => {
    try {
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        router.push('/login');
        return;
      }

      // Check if user has a business
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (businessError) {
        console.error('Error fetching business:', businessError);
        setError('Error loading business data');
        setLoading(false);
        return;
      }

      if (!businessData) {
        // No business found, redirect to setup
        router.push('/setup');
        return;
      }

      setBusiness(businessData);
      setLoading(false);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <Link
            href="/setup"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Complete Setup
          </Link>
        </div>
      </div>
    );
  }

  if (!business) {
    return null; // Will redirect to setup
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to {business.name}!
          </h1>
          <p className="text-gray-600 mb-8">
            Industry: {business.industry} | Phone: {business.phone}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Total Reviews</h3>
              <p className="text-3xl font-bold text-purple-600">0</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Positive Reviews</h3>
              <p className="text-3xl font-bold text-green-600">0</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Locations</h3>
              <p className="text-3xl font-bold text-yellow-600">0</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/dashboard/locations"
              className="block bg-purple-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Manage Locations
            </Link>
            <Link
              href="/dashboard/analytics"
              className="block bg-slate-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
            >
              View Analytics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}