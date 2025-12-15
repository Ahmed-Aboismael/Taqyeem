import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function LocationPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch location with business relationship
  const { data: location, error: locationError } = await supabase
    .from('locations')
    .select(`
      *,
      business:businesses(id, user_id, name)
    `)
    .eq('id', params.id)
    .single();

  // Check if location exists and user has permission
  if (locationError || !location || location.business?.user_id !== user.id) {
    return <div className="p-8">Location not found or you do not have permission to view it.</div>;
  }

  // Fetch reviews for this location
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('location_id', params.id)
    .order('created_at', { ascending: false });

  // Calculate stats
  const totalReviews = reviews?.length || 0;
  const positiveReviews = reviews?.filter((r) => r.rating >= 4).length || 0;
  const negativeReviews = reviews?.filter((r) => r.rating <= 3).length || 0;
  const averageRating = totalReviews > 0
    ? (reviews?.reduce((sum, r) => sum + r.rating, 0) || 0) / totalReviews
    : 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{location.name}</h1>
        <p className="text-gray-600 mt-2">Business: {location.business?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Average Rating</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {averageRating.toFixed(1)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Total Reviews</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{totalReviews}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Positive Reviews</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{positiveReviews}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Negative Reviews</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">{negativeReviews}</p>
        </div>
      </div>

      {/* Review Link */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="font-semibold mb-2">Share Your Review Link:</h3>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'}/r/${location.link_id}`}
            className="flex-1 px-4 py-2 border rounded-md bg-white"
          />
          <button
            onClick={( ) => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'}/r/${location.link_id}`
               );
              alert('Link copied!');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Recent Reviews</h2>
        </div>
        <div className="divide-y">
          {reviews && reviews.length > 0 ? (
            reviews.slice(0, 10).map((review) => (
              <div key={review.id} className="p-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${
                          star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                {review.comment && (
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                )}
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No reviews yet. Share your review link to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}