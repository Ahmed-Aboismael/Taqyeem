import { createClient } from '@/lib/supabase/client'; // ✅ Fixed import
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import RatingComponent from './RatingComponent'; // Client component for interactivity

export default async function PublicRatingPage({ params }: { params: { slug: string } }) {
  const supabase = createClient({ cookies });

  const { data: location } = await supabase
    .from('locations')
    .select('id, name, google_maps_url')
    .eq('review_link_slug', params.slug)
    .single();

  if (!location) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">
        {/* Add business logo/icon here */}
        <h1 className="text-2xl font-bold text-slate-800">{location.name}</h1>
        <p className="text-slate-600 mt-2">How was your experience with us?</p>
        <RatingComponent location={location} />
      </div>
    </div>
  );
}