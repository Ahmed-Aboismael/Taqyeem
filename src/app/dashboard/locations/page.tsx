import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LocationsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!business) {
    return <div>Business not found. Please set up your business first.</div>;
  }

  const { data: locations, error } = await supabase
    .from("locations")
    .select("id, name, review_link_id")
    .eq("business_id", business.id);

  if (error) {
    return <div>Error loading locations.</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Locations</h1>
        <Link href="/dashboard/locations/new">
          <span className="px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">
            + Add New Location
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {locations?.map((location) => (
          <div key={location.id} className="p-6 bg-white border rounded-lg shadow-sm">
            <h3 className="text-xl font-bold">{location.name}</h3>
            <p className="mt-4 text-sm text-gray-600">Shareable Review Link:</p>
            <input
              type="text"
              readOnly
              value={`${process.env.NEXT_PUBLIC_BASE_URL}/rate/${location.review_link_id}`}
              className="w-full px-3 py-2 mt-1 text-sm bg-gray-100 border rounded-md"
            />
            <Link href={`/dashboard/locations/${location.id}`}>
              <span className="block w-full mt-4 text-center text-blue-600 hover:underline">
                View Analytics
              </span>
            </Link>
          </div>
        ))}
        {locations?.length === 0 && (
          <p>You haven't added any locations yet. Click "Add New Location" to get started.</p>
        )}
      </div>
    </div>
  );
}