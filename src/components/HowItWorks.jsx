import { useTranslation } from "../i18n/LanguageProvider";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const { t } = useTranslation();
  const data = t("how");

  const stepConnectorStyles = `
    @keyframes drawLine {
      0% { background-position: 0% 0; }
      100% { background-position: 200% 0; }
    }
    .animate-connector {
      background: linear-gradient(90deg, #d1fae5 0%, #2d6a4f 25%, #2d6a4f 75%, #d1fae5 100%);
      background-size: 200% 100%;
      animation: drawLine 3s ease-in-out infinite;
    }
  `;

  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-4xl font-black text-slate-900 mb-4"
            style={{
              fontFamily: "'Outfit', 'Inter', sans-serif",
              fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
            }}
          >
            {data.title || "Cómo Funciona"}
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto">
            Un proceso simple y efectivo en 4 pasos
          </p>
        </motion.div>

        {/* Steps with connecting line */}
        <div className="relative">
          {/* Horizontal connector (desktop) */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-[3px] bg-gradient-to-r from-emerald-200 via-[#2d6a4f] to-emerald-200 z-0 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {data.steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step number bubble */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative mb-6"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="relative w-20 h-20 rounded-full bg-white border-2 border-[#2d6a4f] flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/30 group-hover:shadow-2xl transition-all duration-300">
                    <span className="text-2xl font-black text-[#2d6a4f]">
                      {i + 1}
                    </span>
                  </div>
                </motion.div>

                {/* Title and description */}
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#2d6a4f] transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>

                {/* Indicator line (mobile) */}
                {i < data.steps.length - 1 && (
                  <div className="md:hidden w-1 h-8 bg-gradient-to-b from-emerald-400 to-transparent mt-6" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2d6a4f] to-emerald-500 hover:from-[#1b4332] hover:to-[#2d6a4f] text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-base"
          >
            {data.cta || "Empieza Ahora"}
          </motion.a>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: stepConnectorStyles }} />
    </section>
  );
};

export default HowItWorks;
