import { useTranslation } from "../i18n/LanguageProvider";
import { motion } from "framer-motion";

/* SVG icons matching the Stitch "¿Por qué?" section:
   trending-up graph, user-with-star, target/bullseye */
const icons = [
  // Trending up (Optimiza Tu Tiempo)
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>,
  // Star/expert (Guía Experta)
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>,
  // Target (Resultados Reales)
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>,
];

const Problem = () => {
  const { t } = useTranslation();
  const data = t("problem");

  return (
    <section id="problema" className="bg-gradient-to-b from-white to-slate-50 py-16 md:py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section title */}
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
            {data.title || "¿Por qué entrenar con nosotros?"}
          </h2>
          <p className="text-center text-slate-500 text-base max-w-2xl mx-auto">
            {data.intro}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.tags.map((tag, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group flex flex-col items-center text-center p-8 rounded-2xl border-2 border-slate-100 bg-white hover:border-emerald-200 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Glow background on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/0 to-emerald-50/0 group-hover:from-emerald-50/40 group-hover:to-emerald-50/10 transition-all duration-300 pointer-events-none" />

              {/* Icon circle — with better styling */}
              <motion.div
                className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#2d6a4f] flex items-center justify-center mb-6 relative z-10 group-hover:bg-emerald-100 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="w-7 h-7">{icons[i % icons.length]}</div>
              </motion.div>

              {/* Content */}
              <h3
                className="text-slate-900 font-bold text-base mb-3 relative z-10"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {tag.tag}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed relative z-10">{tag.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
