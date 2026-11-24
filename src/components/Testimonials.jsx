import { useState, useEffect } from "react";
import { useTranslation } from "../i18n/LanguageProvider";
// eslint-disable-next-line no-unused-vars -- Used as JSX namespace (<motion.*>)
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, ExternalLink } from "lucide-react";

const GOOGLE_REVIEW_URL = "https://g.page/r/CeQHaJ04PpRqEBM/review";
const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/?q=place_id:ChIJi2Lo99grcw0R5AdonTg-lGo";

const AVATAR_COLORS = [
  { bg: "#fde68a", text: "#92400e" },
  { bg: "#bbf7d0", text: "#065f46" },
  { bg: "#bfdbfe", text: "#1e40af" },
  { bg: "#e9d5ff", text: "#6b21a8" },
  { bg: "#fed7aa", text: "#9a3412" },
];

const StarRow = ({ count = 5 }) => (
  <div className="flex gap-1" aria-label={`${count} / 5`}>
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
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
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z" />
    <path fill="#FBBC05" d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z" />
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z" />
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
        className={`${className} object-cover bg-slate-100`}
      />
    );
  }

  return (
    <div
      className={`${className} flex items-center justify-center font-bold text-white`}
      style={{ background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}dd 100%)` }}
    >
      {initials}
    </div>
  );
};

const getInitials = (name) =>
  name?.split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "CL";

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
            rating: rev.rating || 5,
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

  return (
    <section id="testimonios" className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24 relative overflow-hidden">
      {/* Decorative blur elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="font-black text-slate-900 mb-4"
            style={{
              fontFamily: "'Outfit', 'Inter', sans-serif",
              fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
            }}
          >
            {data.title || "Lo que dicen nuestros clientes"}
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto">
            {data.subtitle || "Historias reales de transformación y éxito con 2BEFIT"}
          </p>

          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm shadow-sm">
            <span className="inline-flex items-center gap-2 font-semibold text-slate-800">
              <GoogleGlyph />
              {formattedRating && googleState.userRatingCount ? (
                <>
                  <span>{formattedRating} ★</span>
                  <span className="text-slate-300">·</span>
                  <span>
                    {googleState.userRatingCount} {data.reviews_word || "reseñas"}
                  </span>
                </>
              ) : (
                <span>{data.google_badge || "Reseñas en Google"}</span>
              )}
            </span>
            <span className="text-slate-300">|</span>
            <a
              href={googleState.placeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[#2d6a4f] hover:underline"
            >
              {data.view_on_google || "Ver en Google"}
              <ExternalLink size={13} />
            </a>
            <span className="text-slate-300">·</span>
            <a
              href={googleState.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-600 hover:text-slate-900 hover:underline"
            >
              {data.leave_review || "Dejar reseña"}
            </a>
          </div>
        </motion.div>

        {/* Desktop: Premium carousel layout */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            {items[safeActive] && (() => {
              const item = items[safeActive];
              const initials = getInitials(item.cite);
              const ac = AVATAR_COLORS[safeActive % AVATAR_COLORS.length];
              return (
                <motion.div
                  key={`${isLiveGoogle ? "g" : "f"}-${safeActive}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                >
                  {/* Avatar Section */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex justify-center lg:justify-end"
                  >
                    <div className="relative">
                      <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 rounded-full blur-2xl" />
                      <ReviewAvatar
                        photoUri={item.photoUri}
                        initials={initials}
                        bgColor={ac.bg}
                        className="relative w-64 h-64 rounded-3xl text-6xl shadow-2xl"
                      />
                    </div>
                  </motion.div>

                  {/* Content Section */}
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col"
                  >
                    {/* Quote Icon */}
                    <Quote size={40} className="text-emerald-500/20 mb-4" strokeWidth={1} />

                    {/* Stars */}
                    <div className="mb-6">
                      <StarRow count={item.rating} />
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-lg leading-relaxed text-slate-700 mb-8 font-light">
                      "{item.text}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
                      <ReviewAvatar
                        photoUri={item.photoUri}
                        initials={initials}
                        bgColor={ac.bg}
                        className="w-16 h-16 rounded-full text-lg flex-shrink-0 shadow-lg"
                      />
                      <div>
                        <div className="text-base font-bold text-slate-900">{item.cite}</div>
                        <div className="text-sm text-emerald-600 font-medium">{item.role}</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Navigation Dots and Arrows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center items-center gap-8 mt-16"
          >
            <button
              type="button"
              onClick={prev}
              aria-label="Anterior testimonio"
              className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#2d6a4f] hover:text-[#2d6a4f] hover:bg-emerald-50 transition-all duration-300 group"
            >
              <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {items.map((_, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Testimonio ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === safeActive
                      ? "bg-[#2d6a4f] w-8 h-2"
                      : "bg-slate-200 w-2 h-2 hover:bg-slate-300"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Siguiente testimonio"
              className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#2d6a4f] hover:text-[#2d6a4f] hover:bg-emerald-50 transition-all duration-300 group"
            >
              <ChevronRight size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Mobile: Premium carousel */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            {items[safeActive] && (() => {
              const item = items[safeActive];
              const initials = getInitials(item.cite);
              const ac = AVATAR_COLORS[safeActive % AVATAR_COLORS.length];
              return (
                <motion.div
                  key={`${isLiveGoogle ? "gm" : "fm"}-${safeActive}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col"
                >
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex justify-center mb-8"
                  >
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 rounded-full blur-2xl" />
                      <ReviewAvatar
                        photoUri={item.photoUri}
                        initials={initials}
                        bgColor={ac.bg}
                        className="relative w-48 h-48 rounded-3xl text-5xl shadow-xl"
                      />
                    </div>
                  </motion.div>

                  {/* Content Card */}
                  <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-lg">
                    {/* Quote Icon */}
                    <Quote size={32} className="text-emerald-500/20 mb-4" strokeWidth={1} />

                    {/* Stars */}
                    <div className="mb-5">
                      <StarRow count={item.rating} />
                    </div>

                    {/* Text */}
                    <p className="text-base leading-relaxed text-slate-700 mb-6 font-light">
                      "{item.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                      <ReviewAvatar
                        photoUri={item.photoUri}
                        initials={initials}
                        bgColor={ac.bg}
                        className="w-12 h-12 rounded-full text-sm flex-shrink-0 shadow-md"
                      />
                      <div>
                        <div className="text-sm font-bold text-slate-900">{item.cite}</div>
                        <div className="text-xs text-emerald-600 font-medium">{item.role}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Mobile Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-4 mt-8"
          >
            <button
              type="button"
              onClick={prev}
              aria-label="Anterior testimonio"
              className="w-11 h-11 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#2d6a4f] hover:text-[#2d6a4f] hover:bg-emerald-50 transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dot indicators mobile */}
            <div className="flex gap-2">
              {items.map((_, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Testimonio ${i + 1}`}
                  className={`rounded-full transition-all ${
                    i === safeActive
                      ? "bg-[#2d6a4f] w-6 h-2"
                      : "bg-slate-200 w-2 h-2"
                  }`}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Siguiente testimonio"
              className="w-11 h-11 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#2d6a4f] hover:text-[#2d6a4f] hover:bg-emerald-50 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
