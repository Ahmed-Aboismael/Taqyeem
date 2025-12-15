import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// Correctly load the API key from environment variable
const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY')

serve(async (req) => {
  // Handle CORS for browser requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    // Check if API key is available
    if (!GOOGLE_MAPS_API_KEY) {
      return new Response(JSON.stringify({ error: 'Google Maps API key not configured' }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      })
    }

    const { placeId } = await req.json()

    if (!placeId) {
      return new Response(JSON.stringify({ error: 'Missing placeId parameter' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      })
    }

    // Call Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${GOOGLE_MAPS_API_KEY}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status !== 'OK') {
      throw new Error(data.error_message || `Google Places API error: ${data.status}`)
    }

    return new Response(JSON.stringify(data.result), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
  }
})