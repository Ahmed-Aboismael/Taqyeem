"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function NewLocationPage() {
  const [locationName, setLocationName] = useState("");
  const [googlePlaceId, setGooglePlaceId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (businessError || !business) {
      alert("Could not find your business account.");
      setIsLoading(false);
      return;
    }

    const review_link_id = Math.random().toString(36).substring(2, 12);

    const { error } = await supabase.from("locations").insert({
      business_id: business.id,
      name: locationName,
      google_place_id: googlePlaceId || null,
      review_link_id: review_link_id,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Location created successfully!");
      router.push("/dashboard/locations");
      router.refresh();
    }

    setIsLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Create a New Location</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mt-8 space-y-6">
        <div>
          <label htmlFor="locationName" className="block text-sm font-medium text-gray-700">
            Location Name
          </label>
          <input
            id="locationName"
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-md"
            placeholder="e.g., Jeddah Branch"
            required
          />
        </div>
        <div>
          <label htmlFor="googlePlaceId" className="block text-sm font-medium text-gray-700">
            Google Place ID (Optional)
          </label>
          <input
            id="googlePlaceId"
            type="text"
            value={googlePlaceId}
            onChange={(e) => setGooglePlaceId(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-md"
            placeholder="Find this on Google Maps"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md disabled:bg-gray-400 hover:bg-blue-700"
        >
          {isLoading ? "Creating..." : "Create Location"}
        </button>
      </form>
    </div>
  );
}