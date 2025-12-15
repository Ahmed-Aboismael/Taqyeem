import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient(); // Await the client creation

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("id, name")
    .eq("user_id", user.id)
    .single();

  if (!business) {
    return <div>Error loading business.</div>;
  }

  const { data: locations } = await supabase
    .from("locations")
    .select("id, name, review_link_id")
    .eq("business_id", business.id);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{business.name} Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">
        {locations?.map((location) => (
          <div key={location.id} className="p-6 bg-white border rounded-lg">
            <h3 className="text-xl font-bold">{location.name}</h3>
            <input
              type="text"
              readOnly
              value={`${process.env.NEXT_PUBLIC_BASE_URL}/rate/${location.review_link_id}`}
              className="w-full px-3 py-2 mt-2 text-sm bg-gray-100 border rounded-md"
            />
            <Link href={`/dashboard/location/${location.id}`}>
              <span className="block mt-4 text-center text-blue-600 hover:underline">View Analytics</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}