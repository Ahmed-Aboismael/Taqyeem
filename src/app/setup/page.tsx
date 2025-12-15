'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SetupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      // Create business
      const { data: business, error: businessError } = await supabase
        .from('businesses')
        .insert({
          user_id: user.id,
          name: formData.businessName,
          industry: formData.industry,
          phone: formData.phone,
        })
        .select()
        .single();

      if (businessError) throw businessError;

      // Create first location
      const linkId = Math.random().toString(36).substring(2, 15);
      
      const { error: locationError } = await supabase
        .from('locations')
        .insert({
          business_id: business.id,
          name: `${formData.businessName} - Main Location`,
          link_id: linkId,
        });

      if (locationError) throw locationError;

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating business:', error);
      alert('Failed to create business. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Welcome to Taqyeem!</h1>
            <p className="text-gray-600 mt-2">Let's set up your business</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                id="businessName"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Ahmed's Café"
              />
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <select
                id="industry"
                required
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select industry</option>
                <option value="restaurant">Restaurant</option>
                <option value="cafe">Café</option>
                <option value="retail">Retail</option>
                <option value="salon">Salon/Spa</option>
                <option value="healthcare">Healthcare</option>
                <option value="automotive">Automotive</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+966 XX XXX XXXX"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Business'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}