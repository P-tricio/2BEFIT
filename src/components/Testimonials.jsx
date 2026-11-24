import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars -- Used as JSX namespace (<motion.*>)
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, ExternalLink } from "lucide-react";
import { useTranslation } from "../i18n/LanguageProvider";

const GOOGLE_REVIEW_URL = "https://g.page/r/CeQHaJ04PpRqEBM/review";
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJi2Lo99grcw0R5AdonTg-lGo";

const AVATAR_COLORS = [
  { bg: "#1b4332", text: "#ffffff" },
  { bg: "#2d6a4f", text: "#ffffff" },
  { bg: "#1e3a5f", text: "#ffffff" },
  { bg: "#4c1d95", text: "#ffffff" },
  { bg: "#7c2d12", text: "#ffffff" },
];

const StarRow = ({ count = 5 }) => (
  <div className="flex gap-1" aria-label={`${count} / 5`}>
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill={i < Math.round(count) ? "#f59e0b" : "#e2e8f0"}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const GoogleGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
    />
  </svg>
);

const ReviewAvatar = ({ photoUri, initials, bgColor, className }) => {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [photoUri]);

  if (photoUri && !imgFailed) {
    return (
      <img
        src={photoUri}
        alt={initials}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setImgFailed(true)}
        className={`${className} rounded-full object-cover bg-white`}
      />
    );
  }

  return (
    <div
      className={`${className} rounded-full flex items-center justify-center font-bold text-white`}
      style={{ backgroundColor: bgColor }}
    >
      {initials}
    </div>
  );
};

const getInitials = (name) =>
  name
    ?.split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "CL";

const getShortName = (name) => name?.split(" ").filter(Boolean)[0] || "Cliente";

const Testimonials = () => {
  const { t, lang } = useTranslation();
  const data = t("testimonials");
  const fallbackItems = data.items || [];

  const [googleState, setGoogleState] = useState({
    reviews: [],
    rating: null,
    userRatingCount: null,
    placeUrl: GOOGLE_MAPS_URL,
    reviewUrl: GOOGLE_REVIEW_URL,
  });

  useEffect(() => {
    const controller = new AbortController();
    const apiLang = lang === "en" ? "en" : "es";

    fetch(`/api/google-reviews?lang=${apiLang}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (!payload || !Array.isArray(payload.reviews) || payload.reviews.length === 0) {
          return;
        }
        setGoogleState({
          reviews: payload.reviews.map((rev) => ({
            text: rev.text,
            cite: rev.author,
            photoUri: rev.photoUri,
            authorUri: rev.authorUri,
            rating: rev.rating || 5,
            relativeTime: rev.relativeTime || "",
            role: rev.relativeTime
              ? `${data.google_verified_role || "Reseña verificada en Google"} · ${rev.relativeTime}`
              : data.google_verified_role || "Reseña verificada en Google",
          })),
          rating: payload.rating,
          userRatingCount: payload.userRatingCount,
          placeUrl: payload.placeUrl || GOOGLE_MAPS_URL,
          reviewUrl: payload.reviewUrl || GOOGLE_REVIEW_URL,
        });
      })
      .catch(() => {
        // Keep localized fallback testimonials when API is offline or not yet configured
      });

    return () => controller.abort();
  }, [lang, data.google_verified_role]);

  const isLiveGoogle = googleState.reviews.length > 0;
  const items = isLiveGoogle
    ? googleState.reviews
    : fallbackItems.map((item) => ({
        ...item,
        rating: 5,
        role: data.client_label || "Cliente 2BEFIT",
      }));

  const [active, setActive] = useState(0);
  const safeActive = items.length > 0 ? active % items.length : 0;
  const prev = () => setActive((a) => (a - 1 + items.length) % items.length);
  const next = () => setActive((a) => (a + 1) % items.length);

  const formattedRating =
    typeof googleState.rating === "number"
      ? googleState.rating.toFixed(1).replace(".", lang === "en" ? "." : ",")
      : null;

  const currentItem = items[safeActive];
  const currentInitials = getInitials(currentItem?.cite);
  const currentPalette = AVATAR_COLORS[safeActive % AVATAR_COLORS.length];

  return (
    <section
      id="testimonios"
      className="bg-slate-50/90 py-16 md:py-24 relative overflow-hidden border-b border-slate-100"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Title & Google Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <h2
            className="font-black text-slate-900 mb-3"
            style={{
              fontFamily: "'Outfit', 'Inter', sans-serif",
              fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
            }}
          >
            {data.title || "Lo que dicen nuestros clientes"}
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            {data.subtitle || "Historias reales de transformación y éxito con 2BEFIT"}
          </p>

          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl sm:rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm shadow-sm">
            <span className="inline-flex items-center gap-2 font-bold text-slate-900">
              <GoogleGlyph />
              {formattedRating && googleState.userRatingCount ? (
                <span>
                  {formattedRating} ★ · {googleState.userRatingCount}{" "}
                  {data.reviews_word || "reseñas"}
                </span>
              ) : (
                <span>{data.google_badge || "Reseñas en Google"}</span>
              )}
            </span>

            <span className="hidden sm:inline-block h-3.5 w-px bg-slate-200" aria-hidden="true" />

            <span className="inline-flex items-center gap-3">
              <a
                href={googleState.placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#1b4332] hover:text-[#2d6a4f] hover:underline"
              >
                {data.view_on_google || "Ver en Google"}
                <ExternalLink size={13} />
              </a>
              <span className="text-slate-300" aria-hidden="true">
                |
              </span>
              <a
                href={googleState.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-600 hover:text-slate-950 hover:underline"
              >
                {data.leave_review || "Dejar reseña"}
              </a>
            </span>
          </div>
        </motion.div>

        {/* Single Editorial Review Card */}
        {currentItem && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_-18px_rgba(15,23,42,0.1)] p-7 sm:p-10 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${isLiveGoogle ? "g" : "f"}-${safeActive}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Card Top: Stars + Verified Tag + Quote Mark */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <StarRow count={currentItem.rating} />
                      <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-0.5 text-xs font-semibold text-[#1b4332]">
                        {currentItem.role}
                      </span>
                    </div>
                    <Quote
                      size={32}
                      className="text-emerald-600/20 flex-shrink-0 hidden sm:block"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Editorial Quote */}
                  <blockquote className="text-base sm:text-lg leading-relaxed text-slate-800 font-normal mb-8 min-h-[5.5rem] whitespace-pre-line">
                    "{currentItem.text}"
                  </blockquote>

                  {/* Card Footer: Compact Author + Arrows */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <ReviewAvatar
                        photoUri={currentItem.photoUri}
                        initials={currentInitials}
                        bgColor={currentPalette.bg}
                        className="w-12 h-12 sm:w-14 sm:h-14 text-base ring-2 ring-emerald-500/15 shadow-sm flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-base font-bold text-slate-900 truncate">
                          {currentItem.cite}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500 font-medium">
                          {isLiveGoogle ? "Google Maps · 5,0 ★" : "2BEFIT"}
                        </div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2.5 ml-auto">
                      <span className="text-xs font-semibold text-slate-400 mr-1 tabular-nums">
                        {safeActive + 1} / {items.length}
                      </span>
                      <button
                        type="button"
                        onClick={prev}
                        aria-label="Anterior testimonio"
                        className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:border-[#2d6a4f] hover:text-[#2d6a4f] hover:bg-emerald-50 transition-colors"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        aria-label="Siguiente testimonio"
                        className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:border-[#2d6a4f] hover:text-[#2d6a4f] hover:bg-emerald-50 transition-colors"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Reviewer Quick Switcher Pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {items.map((item, i) => {
                const selected = i === safeActive;
                const palette = AVATAR_COLORS[i % AVATAR_COLORS.length];
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={item.cite}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border transition-all ${
                      selected
                        ? "bg-[#1b4332] border-[#1b4332] text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:text-[#1b4332]"
                    }`}
                  >
                    <ReviewAvatar
                      photoUri={item.photoUri}
                      initials={getInitials(item.cite)}
                      bgColor={palette.bg}
                      className="w-5 h-5 text-[10px] flex-shrink-0"
                    />
                    <span>{getShortName(item.cite)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
