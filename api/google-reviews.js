/* global process */

const DEFAULT_PLACE_ID = "ChIJi2Lo99grcw0R5AdonTg-lGo";
const GOOGLE_REVIEW_URL = "https://g.page/r/CeQHaJ04PpRqEBM/review";
const GOOGLE_MAPS_URL = `https://www.google.com/maps/place/?q=place_id:${DEFAULT_PLACE_ID}`;

// Authors excluded from the web showcase (e.g. family surnames or star-only reviews),
// while preserving Google's live aggregate rating and total review count.
const EXCLUDED_AUTHORS = new Set([
  "inma becerra",
  "ivanova becerra",
  "ivanova galan becerra",
  "cristina pt jiménez",
  "cristina pt jimenez",
]);

// Curated Google Maps reviews (ordered for conversion & breadth across in-person, app & nutrition),
// automatically merged with any brand-new future reviews returned by Google Places API.
const CURATED_REVIEWS = [
  {
    id: "curated-francisco-javier",
    author: "Francisco Javier Cabello Gómez",
    photoUri:
      "https://lh3.googleusercontent.com/a-/ALV-UjVQ5MNGnTq_mCxyGw17gfP4FxvIfZMGB_Pyr8HWAZaX4s-lRJ0=s128-c-rp-mo-ba12",
    rating: 5,
    text: {
      es: "Son muchos años entrenando en formato presencial con ellos pero la implementación de la aplicación es un paso más para conseguir tus mejores resultados. Es sencilla de usar, se adapta a ti y tu día a día y está en constante actualización.\nLos recomiendo a todos mis amigos y familiares siempre.",
      en: "I've been training in person with them for many years, and adding the app is another step forward to achieve your best results. It's easy to use, adapts to your daily routine, and is constantly being updated.\nI always recommend them to all my friends and family.",
    },
    relativeTime: {
      es: "hace 3 días",
      en: "3 days ago",
    },
    publishTs: Date.parse("2026-11-21T12:00:00Z"),
  },
  {
    id: "curated-victor-rubiales",
    author: "Victor Rubiales",
    photoUri:
      "https://lh3.googleusercontent.com/a/ACg8ocJB5guOrfuUZ8ZYVzADjWsJgXlawoqti9ux4KgM8x-8Ft8aI60=s128-c-rp-mo-ba12",
    rating: 5,
    text: {
      es: "Conocí 2befit a través de una amiga y contacté con ellos porque sentía que necesitaba dar un cambio a mi alimentación, mejorar mis hábitos y volver a sentirme bien física y mentalmente.\nDesde el primer momento he encontrado a un gran profesional, que sabe escuchar, entender tus necesidades y acompañarte durante todo el proceso. No se trata simplemente de seguir una dieta o entrenar, sino de aprender a cuidarte, adquirir hábitos saludables y conseguir que esos cambios formen parte de tu día a día.\nEstoy muy contento con la evolución y especialmente, con cómo me siento. Sin duda, Patricio es una persona que recomiendo al 100 %.",
      en: "I discovered 2BEFIT through a friend and reached out because I needed to transform my nutrition, improve my habits, and feel good physically and mentally again.\nFrom day one I found a true professional who listens, understands your needs, and supports you throughout the entire journey. It's not just about following a diet or working out, but learning to build sustainable healthy habits into your daily life. I couldn't be happier with my progress and recommend Patricio 100%.",
    },
    relativeTime: {
      es: "hace 3 días",
      en: "3 days ago",
    },
    publishTs: Date.parse("2026-11-21T11:00:00Z"),
  },
  {
    id: "curated-raquel-morales",
    author: "Raquel Morales",
    photoUri:
      "https://lh3.googleusercontent.com/a/ACg8ocL0f24l0ocr6NV581CImGf0c07VMvqHCjijh_nc9pUu6ODBog=s128-c0x00000000-cc-rp-mo-ba3",
    rating: 5,
    text: {
      es: "La mejor app de fitness y nutrición, he utilizado varias y esta es con diferencia la mejor! El tracking de ejercicios es super intuitivo, facil y adaptado a tu caso y la parte de nutrición también, te facilita muchísimo el día a día con los macros y las recetas. Se nota que está desarrollada por grandes profesionales y pensada para no perder tiempo. Un antes y un después después de conocerlos.",
      en: "The best fitness and nutrition app—I've tried several and this is by far the best! Workout tracking is super intuitive, easy, and tailored to you, and the nutrition section makes day-to-day macros and recipes effortless. You can tell it's built by real professionals to save you time. A true before and after since meeting them.",
    },
    relativeTime: {
      es: "Hace un mes",
      en: "a month ago",
    },
    publishTs: Date.parse("2026-10-09T12:16:58Z"),
  },
  {
    id: "curated-luz-rufas",
    author: "Luz Rufas Marquez de ACuña",
    photoUri:
      "https://lh3.googleusercontent.com/a/ACg8ocKs46-2PXensHklRrNc2_L4rSmqJ02zMRahUcjJ6Z5OV5iU8g=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: {
      es: "Buenísima app. Cubren todo el espectro tanto el entrenamiento como la nutrición y el bienestar!!!\nMuy muy recomendable … A nivel personal me están ayudando y acompañando en el proceso con buenísima actitud!!!",
      en: "Fantastic app! They cover the whole spectrum: training, nutrition, and wellness! Highly recommended… On a personal level, they're helping and supporting me throughout the process with a fantastic attitude!",
    },
    relativeTime: {
      es: "en la última semana",
      en: "in the last week",
    },
    publishTs: Date.parse("2026-11-19T09:28:34Z"),
  },
  {
    id: "curated-silvia-vidal",
    author: "Silvia Vidal Rodríguez",
    photoUri:
      "https://lh3.googleusercontent.com/a/ACg8ocIIH7dcxJjndxT5Xe3rSVxhaV96mwU0UDs7_Ov7K2OuV3jDjQ=s128-c-rp-mo",
    rating: 5,
    text: {
      es: "¡Una aplicación fantástica! Es muy fácil de usar, intuitiva y motivadora. Entrenamientos organizados, control de los progresos y mantenerse activo de una forma divertida. La recomiendo totalmente!!",
      en: "A fantastic app! It's very easy to use, intuitive, and motivating. Structured workouts, progress tracking, and a fun way to stay active. I recommend it completely!",
    },
    relativeTime: {
      es: "hace 3 días",
      en: "3 days ago",
    },
    publishTs: Date.parse("2026-11-21T10:00:00Z"),
  },
  {
    id: "curated-javier-vinas",
    author: "Javier Viñas",
    photoUri:
      "https://lh3.googleusercontent.com/a-/ALV-UjXLcDrpK7zi2-8hNuT98uONkiTGrAcye78Onw-ErJGRffY-8tfy=s128-c0x00000000-cc-rp-mo-ba3",
    rating: 5,
    text: {
      es: "Cada dia estoy mas fuerte! Muy contento con el trabajo que estamos haciendo y con el resultado",
      en: "Getting stronger every day! Very happy with the work we are doing and the results.",
    },
    relativeTime: {
      es: "Hace un mes",
      en: "a month ago",
    },
    publishTs: Date.parse("2026-10-09T12:50:43Z"),
  },
];

function normalizeKey(name) {
  return (name || "").trim().toLowerCase();
}

function normalizePlaceId(rawValue) {
  const cleaned = (rawValue || DEFAULT_PLACE_ID).trim();
  return /^[A-Za-z0-9_-]{10,120}$/.test(cleaned) ? cleaned : DEFAULT_PLACE_ID;
}

function normalizeReviews(rawList, mapper) {
  return (Array.isArray(rawList) ? rawList : [])
    .map(mapper)
    .filter(
      (item) =>
        item.text.length > 0 && !EXCLUDED_AUTHORS.has(normalizeKey(item.author))
    );
}

function mergeCuratedAndLiveReviews(liveReviews, lang) {
  const liveByAuthor = new Map();
  for (const rev of liveReviews || []) {
    liveByAuthor.set(normalizeKey(rev.author), rev);
  }

  const curatedKeys = new Set();
  const curatedMerged = CURATED_REVIEWS.map((curated) => {
    const key = normalizeKey(curated.author);
    curatedKeys.add(key);
    const liveMatch = liveByAuthor.get(key);
    return {
      id: liveMatch?.id || curated.id,
      author: curated.author,
      authorUri: liveMatch?.authorUri || null,
      photoUri: liveMatch?.photoUri || curated.photoUri,
      rating: liveMatch?.rating || curated.rating,
      // Prefer live translated text in English if Places API provides it; keep exact Spanish verbatim text
      text:
        lang === "en" && liveMatch?.text
          ? liveMatch.text
          : curated.text[lang] || curated.text.es,
      relativeTime: liveMatch?.relativeTime || curated.relativeTime[lang],
      publishTime: liveMatch?.publishTime || null,
      publishTs: liveMatch?.publishTs || curated.publishTs,
    };
  });

  // Automatically prepend any brand-new future reviews returned by Google Places API
  const newFromGoogle = (liveReviews || [])
    .filter((rev) => !curatedKeys.has(normalizeKey(rev.author)))
    .sort((a, b) => (b.publishTs || 0) - (a.publishTs || 0));

  return [...newFromGoogle, ...curatedMerged];
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
    reviews: mergeCuratedAndLiveReviews(reviews, lang),
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
    reviews: mergeCuratedAndLiveReviews(reviews, lang),
  };
}

/**
 * Serves curated + live Google Business Profile reviews and aggregate rating for 2BEFIT.
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
