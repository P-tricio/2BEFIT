import { useState } from "react";
import { useTranslation } from "../i18n/LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation();
  const faq = t("faq");

  return (
    <section id="faq" className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
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
            {faq.title || "Preguntas Frecuentes"}
          </h2>
          <p className="text-slate-500 text-base">
            Resuelve tus dudas sobre el programa 2BEFIT
          </p>
        </motion.div>

        <div className="space-y-3 max-w-2xl mx-auto">
          {faq.questions.map((item, index) => {
            const isActive = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`overflow-hidden transition-all duration-300 rounded-lg ${
                  isActive
                    ? "border-b-2 border-[#2d6a4f] bg-white"
                    : "border-b border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <motion.button
                  onClick={() => setOpenIndex(isActive ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left cursor-pointer group"
                  whileHover={{ paddingLeft: 24 }}
                  transition={{ duration: 0.2 }}
                >
                  <span
                    className={`text-base font-semibold transition-colors duration-200 ${
                      isActive ? "text-[#1b4332]" : "text-slate-800 group-hover:text-[#2d6a4f]"
                    }`}
                  >
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.25, type: "spring", stiffness: 200 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      size={20}
                      className={`transition-colors ${
                        isActive ? "text-[#2d6a4f]" : "text-slate-400 group-hover:text-slate-600"
                      }`}
                      strokeWidth={2}
                    />
                  </motion.div>
                </motion.button>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="bg-gradient-to-r from-emerald-50/50 to-transparent border-t border-slate-100"
                    >
                      <motion.div
                        initial={{ y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -8, opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                        className="px-6 py-4 text-slate-600 text-sm leading-relaxed"
                      >
                        {item.a}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
