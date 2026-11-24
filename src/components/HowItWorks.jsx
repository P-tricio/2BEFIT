import { useTranslation } from "../i18n/LanguageProvider";
// eslint-disable-next-line no-unused-vars -- Used as JSX namespace (<motion.*>)
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const { t } = useTranslation();
  const data = t("how");

  return (
    <section
      id="como-funciona"
      className="py-16 md:py-24 bg-[#0c231a] text-white relative overflow-hidden border-y border-emerald-900/50"
    >
      {/* Subtle depth glow */}
      <div className="absolute -top-24 right-0 w-[28rem] h-[28rem] bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 left-0 w-[24rem] h-[24rem] bg-emerald-400/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.45 }}
          className="text-center mb-14"
        >
          <h2
            className="text-3xl md:text-4xl font-black text-white mb-4"
            style={{
              fontFamily: "'Outfit', 'Inter', sans-serif",
              fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
            }}
          >
            {data.title || "Cómo Funciona"}
          </h2>
          <p className="text-emerald-100/85 text-base max-w-2xl mx-auto">
            {data.subtitle || "Un proceso simple y efectivo en 4 pasos adaptado a tu rutina"}
          </p>
        </motion.div>

        {/* Steps with high-contrast cards & connector */}
        <div className="relative">
          {/* Horizontal connector (desktop) */}
          <div className="hidden md:block absolute top-11 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-emerald-500/20 via-emerald-400/70 to-emerald-500/20 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 lg:gap-6 relative z-10">
            {data.steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center text-center rounded-2xl bg-[#122e22] border border-emerald-500/25 hover:border-emerald-400/60 p-6 shadow-lg transition-colors duration-200 group"
              >
                {/* High-contrast Step Number */}
                <div className="relative mb-5">
                  <div className="w-12 h-12 rounded-full bg-emerald-400 text-[#071912] flex items-center justify-center shadow-md shadow-emerald-950/50 group-hover:scale-105 transition-transform duration-200">
                    <span className="text-lg font-black">{i + 1}</span>
                  </div>
                </div>

                {/* Title and description */}
                <h3 className="text-base font-bold text-white mb-2.5 group-hover:text-emerald-300 transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-200/90 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-14 text-center"
        >
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-[#071912] font-bold px-9 py-4 rounded-full transition-colors duration-200 shadow-lg text-base"
          >
            <span>{data.cta || "Empieza Ahora"}</span>
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
