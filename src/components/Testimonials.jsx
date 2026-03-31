import { useState } from "react";
import { useTranslation } from "../i18n/LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const AVATAR_COLORS = [
  { bg: "#fde68a", text: "#92400e" },
  { bg: "#bbf7d0", text: "#065f46" },
  { bg: "#bfdbfe", text: "#1e40af" },
  { bg: "#e9d5ff", text: "#6b21a8" },
  { bg: "#fed7aa", text: "#9a3412" },
];

const StarRow = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const { t } = useTranslation();
  const data = t("testimonials");
  const items = data.items || [];

  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a - 1 + items.length) % items.length);
  const next = () => setActive((a) => (a + 1) % items.length);

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
            Historias reales de transformación y éxito con 2BEFIT
          </p>
        </motion.div>

        {/* Desktop: Premium carousel layout */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            {items[active] && (() => {
              const item = items[active];
              const initials = item.cite?.split(" ").map((w) => w[0]).slice(0, 2).join("") ?? "CL";
              const ac = AVATAR_COLORS[active % AVATAR_COLORS.length];
              return (
                <motion.div
                  key={active}
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
                      <div
                        className="relative w-64 h-64 rounded-3xl flex items-center justify-center text-6xl font-bold text-white shadow-2xl"
                        style={{ background: `linear-gradient(135deg, ${ac.bg} 0%, ${ac.bg}dd 100%)` }}
                      >
                        {initials}
                      </div>
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
                      <StarRow />
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-lg leading-relaxed text-slate-700 mb-8 font-light">
                      "{item.text}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0 shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${ac.bg} 0%, ${ac.bg}dd 100%)` }}
                      >
                        {initials}
                      </div>
                      <div>
                        <div className="text-base font-bold text-slate-900">{item.cite}</div>
                        <div className="text-sm text-emerald-600 font-medium">Cliente 2BEFIT</div>
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
              onClick={prev}
              className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#2d6a4f] hover:text-[#2d6a4f] hover:bg-emerald-50 transition-all duration-300 group"
            >
              <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {items.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? "bg-[#2d6a4f] w-8 h-2"
                      : "bg-slate-200 w-2 h-2 hover:bg-slate-300"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#2d6a4f] hover:text-[#2d6a4f] hover:bg-emerald-50 transition-all duration-300 group"
            >
              <ChevronRight size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Mobile: Premium carousel */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            {items[active] && (() => {
              const item = items[active];
              const initials = item.cite?.split(" ").map((w) => w[0]).slice(0, 2).join("") ?? "CL";
              const ac = AVATAR_COLORS[active % AVATAR_COLORS.length];
              return (
                <motion.div
                  key={active}
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
                      <div
                        className="relative w-48 h-48 rounded-3xl flex items-center justify-center text-5xl font-bold text-white shadow-xl"
                        style={{ background: `linear-gradient(135deg, ${ac.bg} 0%, ${ac.bg}dd 100%)` }}
                      >
                        {initials}
                      </div>
                    </div>
                  </motion.div>

                  {/* Content Card */}
                  <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-lg">
                    {/* Quote Icon */}
                    <Quote size={32} className="text-emerald-500/20 mb-4" strokeWidth={1} />

                    {/* Stars */}
                    <div className="mb-5">
                      <StarRow />
                    </div>

                    {/* Text */}
                    <p className="text-base leading-relaxed text-slate-700 mb-6 font-light">
                      "{item.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow-md"
                        style={{ background: `linear-gradient(135deg, ${ac.bg} 0%, ${ac.bg}dd 100%)` }}
                      >
                        {initials}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{item.cite}</div>
                        <div className="text-xs text-emerald-600 font-medium">Cliente 2BEFIT</div>
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
              onClick={prev}
              className="w-11 h-11 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#2d6a4f] hover:text-[#2d6a4f] hover:bg-emerald-50 transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dot indicators mobile */}
            <div className="flex gap-2">
              {items.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all ${
                    i === active
                      ? "bg-[#2d6a4f] w-6 h-2"
                      : "bg-slate-200 w-2 h-2"
                  }`}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </div>

            <button
              onClick={next}
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
