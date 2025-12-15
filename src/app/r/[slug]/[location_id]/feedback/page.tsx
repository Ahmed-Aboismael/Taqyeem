'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function FeedbackPage({ params }: { params: { location_id: string } }) {
  const supabase = createClientComponentClient();
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;

    await supabase.from('internal_feedback').insert({
      location_id: params.location_id,
      feedback_text: feedback,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-green-600">Thank You!</h2>
          <p className="text-slate-600 mt-2">Your feedback is valuable and helps us improve.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-xl font-bold text-slate-800 text-center">We're sorry to hear that.</h2>
        <p className="text-slate-600 mt-2 text-center">Please tell us what we can improve.</p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full mt-6 p-3 border-2 border-slate-200 rounded-xl h-32 focus:border-blue-500"
          placeholder="Share your experience..."
        />
        <button onClick={handleSubmit} className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-bold">
          Send Feedback
        </button>
      </div>
    </div>
  );
}