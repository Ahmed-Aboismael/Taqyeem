import { createClient } from '@/lib/supabase/server';
import RatingComponent from './RatingComponent';

export default async function PublicRatingPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();

  const { data: location } = await supabase
    .from('locations')
    .select('*')
    .eq('link_id', params.slug)
    .single();

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Location Not Found</h1>
          <p className="text-gray-600 mt-2">This review link is invalid or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Logo and Stars */}
          <div className="mb-6">
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-8 h-8 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h1 className="text-3xl font-bold text-slate-800">تقييم - Taqyeem</h1>
          </div>

          {/* Location Info */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">{location.name}</h2>
            <p className="text-gray-600 mt-2">How was your experience?</p>
            <p className="text-gray-600">كيف كانت تجربتك معنا؟</p>
          </div>

          {/* Rating Component */}
          <RatingComponent locationId={location.id} />
        </div>
      </div>
    </div>
  );
}