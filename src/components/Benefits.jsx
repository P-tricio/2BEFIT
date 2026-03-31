import { useTranslation } from "../i18n/LanguageProvider";
import { motion } from "framer-motion";
import { UserCheck, TrendingUp, Smartphone, Wind } from "lucide-react";

const iconList = [UserCheck, TrendingUp, Smartphone, Wind];

const Benefits = () => {
  const { t } = useTranslation();
  const data = t("benefits");

  return (
    <section id="beneficios" className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-slate-900 mb-4"
          >
            {data.header || "Nuestros Beneficios Clave"}
          </motion.h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.items.map((it, i) => {
            const Icon = iconList[i % iconList.length];
            const accentColors = [
              { bg: "bg-orange-100", text: "text-orange-500" },
              { bg: "bg-blue-100", text: "text-blue-500" },
              { bg: "bg-emerald-100", text: "text-emerald-600" },
              { bg: "bg-purple-100", text: "text-purple-500" },
            ];
            const color = accentColors[i % accentColors.length];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group flex flex-col items-center text-center p-7 rounded-2xl bg-white border border-slate-100 hover:border-emerald-200 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Glowy background on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/0 to-emerald-50/0 group-hover:from-emerald-50/50 group-hover:to-emerald-50/20 transition-all duration-300 pointer-events-none" />

                {/* Icon container */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl ${color.bg} flex items-center justify-center mb-5 relative z-10 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <Icon size={28} className={color.text} strokeWidth={1.6} />
                </motion.div>

                {/* Content */}
                <h3 className="text-base font-bold text-slate-900 mb-3 relative z-10">{it.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed relative z-10">{it.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
