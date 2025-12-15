import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
// Assuming you have an AnalyticsDashboard component
// import AnalyticsDashboard from "./AnalyticsDashboard";

export default async function LocationAnalyticsPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: location, error: locationError } = await supabase
    .from("locations")
    .select(`
      id,
      name,
      business:businesses ( user_id )
    `)
    .eq("id", params.id)
    .single();

  if (locationError || !location || location.business?.user_id !== user.id) {
    return <div>Location not found or you do not have permission to view it.</div>;
  }

  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select("id, rating, created_at, is_positive")
    .eq("location_id", params.id)
    .order("created_at", { ascending: false });

  if (reviewsError) {
    return <div>Error loading reviews.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{location.name} - Analytics</h1>
      <p className="mt-2 text-gray-600">Showing data for location ID: {location.id}</p>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Recent Reviews</h2>
        <ul className="mt-4 space-y-2">
          {reviews?.map(review => (
            <li key={review.id} className="p-4 bg-white border rounded-md">
              Rating: {review.rating} stars - {new Date(review.created_at).toLocaleString()}
            </li>
          ))}
          {reviews?.length === 0 && <p>No reviews yet for this location.</p>}
        </ul>
      </div>

      {/* You would place your <AnalyticsDashboard reviews={reviews || []} /> here */}
    </div>
  );
}