'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

// Star SVG component
const Star = ({ filled, onClick }: { filled: boolean; onClick: () => void }) => (
  <svg
    onClick={onClick}
    className={`w-16 h-16 cursor-pointer transition-colors ${
      filled ? 'text-yellow-400' : 'text-gray-300'
    }`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function RatingComponent({ locationId }: { locationId: string }) {
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRatingSubmit = async (selectedRating: number) => {
    setRating(selectedRating);
    setIsSubmitting(true);

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        location_id: locationId,
        rating: selectedRating,
      })
      .select()
      .single();

    if (error) {
      alert('Error submitting rating. Please try again.');
      setIsSubmitting(false);
      return;
    }

    // Redirect based on rating
    if (selectedRating >= 4) {
      // Redirect to Google Maps
      const { data: location } = await supabase
        .from('locations')
        .select('google_place_id')
        .eq('id', locationId)
        .single();

      if (location?.google_place_id) {
        window.location.href = `https://search.google.com/local/writereview?placeid=${location.google_place_id}`;
      } else {
        alert('Thank you for your positive feedback!' );
      }
    } else {
      // Redirect to internal feedback form
      router.push(`/feedback/${data.id}`);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            filled={star <= rating}
            onClick={() => !isSubmitting && handleRatingSubmit(star)}
          />
        ))}
      </div>
      {isSubmitting && (
        <p className="mt-4 text-center text-gray-600">Submitting your rating...</p>
      )}
    </div>
  );
}