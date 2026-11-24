/* global process */

const DEFAULT_PLACE_ID = "ChIJi2Lo99grcw0R5AdonTg-lGo";
const GOOGLE_REVIEW_URL = "https://g.page/r/CeQHaJ04PpRqEBM/review";
const GOOGLE_MAPS_URL = `https://www.google.com/maps/place/?q=place_id:${DEFAULT_PLACE_ID}`;

function normalizePlaceId(rawValue) {
  const cleaned = (rawValue || DEFAULT_PLACE_ID).trim();
  return /^[A-Za-z0-9_-]{10,120}$/.test(cleaned) ? cleaned : DEFAULT_PLACE_ID;
}

function normalizeReviews(rawList, mapper) {
  return (Array.isArray(rawList) ? rawList : [])
    .map(mapper)
    .filter((item) => item.text.length > 0)
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return (b.publishTs || 0) - (a.publishTs || 0);
    });
}

async function fetchPlacesNew(placeId, lang, apiKey) {
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=${lang}`;
  const response = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  if (!data || typeof data.rating !== "number") {
    return null;
  }

  const reviews = normalizeReviews(data.reviews, (r, index) => {
    const publishTime = r.publishTime || null;
    return {
      id: r.name || `google-new-${index}`,
      author: r.authorAttribution?.displayName?.trim() || "Cliente 2BEFIT",
      authorUri: r.authorAttribution?.uri || null,
      photoUri: r.authorAttribution?.photoUri || null,
      rating: typeof r.rating === "number" ? r.rating : 5,
      text: (r.text?.text || r.originalText?.text || "").trim(),
      relativeTime: (r.relativePublishTimeDescription || "").trim(),
      publishTime,
      publishTs: publishTime ? Date.parse(publishTime) || 0 : 0,
    };
  });

  return {
    source: "google_places_new",
    rating: data.rating,
    userRatingCount: data.userRatingCount || reviews.length,
    placeUrl: data.googleMapsUri || GOOGLE_MAPS_URL,
    reviewUrl: GOOGLE_REVIEW_URL,
    reviews,
  };
}

async function fetchPlacesLegacy(placeId, lang, apiKey) {
  const params = new URLSearchParams({
    place_id: placeId,
    fields: "name,rating,user_ratings_total,reviews,url",
    language: lang,
    reviews_sort: "newest",
    key: apiKey,
  });

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`
  );

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  const result = payload?.result;
  if (payload?.status !== "OK" || !result || typeof result.rating !== "number") {
    return null;
  }

  const reviews = normalizeReviews(result.reviews, (r, index) => ({
    id: `google-legacy-${r.time || index}`,
    author: r.author_name?.trim() || "Cliente 2BEFIT",
    authorUri: r.author_url || null,
    photoUri: r.profile_photo_url || null,
    rating: typeof r.rating === "number" ? r.rating : 5,
    text: (r.text || "").trim(),
    relativeTime: (r.relative_time_description || "").trim(),
    publishTime: r.time ? new Date(r.time * 1000).toISOString() : null,
    publishTs: r.time ? r.time * 1000 : 0,
  }));

  return {
    source: "google_places_legacy",
    rating: result.rating,
    userRatingCount: result.user_ratings_total || reviews.length,
    placeUrl: result.url || GOOGLE_MAPS_URL,
    reviewUrl: GOOGLE_REVIEW_URL,
    reviews,
  };
}

/**
 * Serves cached Google Business Profile reviews for 2BEFIT via Google Places API.
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const lang = req.query?.lang === "en" ? "en" : "es";
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = normalizePlaceId(process.env.GOOGLE_PLACE_ID);

  if (!apiKey) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({
      configured: false,
      source: "fallback",
      placeId,
      placeUrl: GOOGLE_MAPS_URL,
      reviewUrl: GOOGLE_REVIEW_URL,
      reviews: [],
    });
  }

  try {
    const liveData =
      (await fetchPlacesNew(placeId, lang, apiKey)) ||
      (await fetchPlacesLegacy(placeId, lang, apiKey));

    if (!liveData) {
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json({
        configured: true,
        source: "fallback",
        placeId,
        placeUrl: GOOGLE_MAPS_URL,
        reviewUrl: GOOGLE_REVIEW_URL,
        reviews: [],
      });
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=43200, stale-while-revalidate=86400"
    );
    return res.status(200).json({
      configured: true,
      placeId,
      ...liveData,
    });
  } catch {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({
      configured: true,
      source: "fallback",
      placeId,
      placeUrl: GOOGLE_MAPS_URL,
      reviewUrl: GOOGLE_REVIEW_URL,
      reviews: [],
    });
  }
}
