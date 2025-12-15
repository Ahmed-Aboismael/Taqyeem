'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Star SVG component
const Star = ({ filled, onClick }: { filled: boolean; onClick: () => void }) => (
  <svg onClick={onClick} className={`w-12 h-12 cursor-pointer transition-transform transform hover:scale-110 ${filled ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.175 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);

export default function RatingComponent({ location }: { location: { id: string; name: string; google_maps_url: string | null } }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleRatingSubmit = async (selectedRating: number) => {
    setRating(selectedRating);

    // Save the review to the database
    await supabase.from('reviews').insert({ location_id: location.id, rating: selectedRating });

    // Redirect based on rating
    if (selectedRating >= 4) {
      if (location.google_maps_url) {
        window.location.href = location.google_maps_url;
      }
    } else {
      router.push(`/r/${location.id}/feedback`); // Use ID to avoid slug lookup again
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4, 5].map(star => (
          <div key={star} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}>
            <Star filled={(hoverRating || rating) >= star} onClick={() => handleRatingSubmit(star)} />
          </div>
        ))}
      </div>
    </div>
  );
}