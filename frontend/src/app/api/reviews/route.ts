import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      return NextResponse.json(
        { error: 'Google Places API key or Place ID is not configured' },
        { status: 400 }
      );
    }

    // Google Places API URL
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`;

    // Fetch from Google Places API
    // We use Next.js fetch with next: { revalidate: 86400 } to cache the response for 24 hours (86400 seconds)
    const response = await fetch(url, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(`Google API returned status ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Google API returned error: ${data.error_message || data.status}`);
    }

    // Process the reviews to match our frontend interface
    const rawReviews = data.result.reviews || [];
    const formattedReviews = rawReviews.map((review: any, index: number) => ({
      id: index + 1,
      name: review.author_name,
      rating: review.rating,
      text: review.text,
      date: review.relative_time_description,
      profilePhoto: review.profile_photo_url,
    }));

    return NextResponse.json({
      success: true,
      rating: data.result.rating,
      totalRatings: data.result.user_ratings_total,
      reviews: formattedReviews,
    });
  } catch (error: any) {
    console.error('Error fetching Google Reviews:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch reviews', details: error.message },
      { status: 500 }
    );
  }
}
