import { useTranslation } from "../i18n/LanguageProvider";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const Plans = () => {
  const { t } = useTranslation();
  const data = t("plans");
  const basic = data.basic;
  const top = data.top;
  const packBasic = data.pack?.basic;
  const packTop = data.pack?.top;
  const packDuo = data.pack?.duo;

  // CSS for animated gradient badge
  const badgeStyles = `
    @keyframes slideGradient {
      0% { background-position: -100% 0; }
      100% { background-position: 200% 0; }
    }
    .animate-gradient-slide {
      animation: slideGradient 3s linear infinite;
    }
  `;

  const cards = [
    packBasic && {
      name: packBasic.name,
      price: packBasic.price_total,
      period: data.period_6m || " / 6 meses",
      badge: packBasic.badge,
      desc: packBasic.per_month || "Tu transformación individual garantizada.",
      features: packBasic.bullets || [],
      cta: packBasic.cta,
      featured: false,
    },
    packTop && {
      name: packTop.name,
      price: packTop.price_total,
      period: data.period_6m || " / 6 meses",
      badge: packTop.badge || "Pro Coaching Individual",
      desc: packTop.per_month || "Máximo seguimiento y análisis biomecánico.",
      features: packTop.bullets || [],
      cta: packTop.cta,
      featured: false,
    },
    packDuo && {
      name: packDuo.name,
      price: packDuo.price_total,
      period: data.period_6m_duo || " / 6 meses (2 pers.)",
      badge: packDuo.badge || "Oferta Parejas ⭐",
      desc: packDuo.per_month || "Misma base, distinto plato. El favorito.",
      features: packDuo.bullets || [],
      cta: packDuo.cta,
      featured: true,
    },
  ].filter(Boolean);

  return (
    <section id="planes" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Title */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-black text-slate-900 mb-3"
            style={{
              fontFamily: "'Outfit', 'Inter', sans-serif",
              fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
            }}
          >
            {data.title || "Nuestros Planes"}
          </motion.h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            {data.subtitle || "Un acompañamiento a medida. Sin ataduras, solo resultados tangibles."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl overflow-visible ${
                card.featured
                  ? "ring-2 ring-[#2d6a4f] shadow-[0_16px_48px_rgba(45,106,79,0.2)] scale-[1.02]"
                  : "border border-slate-200 shadow-sm"
              }`}
              style={{
                background: card.featured
                  ? "linear-gradient(160deg, #1b4332 0%, #2d6a4f 100%)"
                  : "#ffffff",
              }}
            >
              {/* Badge */}
              {card.badge && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full ${
                    card.featured ? "animate-gradient-slide" : ""
                  }`}
                  style={{
                    background: card.featured
                      ? "linear-gradient(to right, #10b981, #34d399, #6ee7b7, #a7f3d0, #10b981)"
                      : "#1e293b",
                    backgroundSize: card.featured ? "200% 100%" : "auto",
                    color: "#fff",
                    letterSpacing: "0.06em",
                    boxShadow: card.featured ? "0 4px 20px rgba(16, 185, 129, 0.3)" : "none",
                  }}
                >
                  {card.badge}
                </motion.div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* Name + price */}
                <h3
                  className="text-xl font-black mb-1"
                  style={{
                    fontFamily: "'Outfit', 'Inter', sans-serif",
                    color: card.featured ? "#fff" : "#0f172a",
                  }}
                >
                  {card.name}
                </h3>
                <p className="text-sm mb-5" style={{ color: card.featured ? "#a7f3d0" : "#64748b" }}>
                  {card.desc}
                </p>

                <div className="flex items-baseline gap-1 mb-7">
                  <span
                    className="font-black leading-none"
                    style={{
                      fontFamily: "'Outfit', 'Inter', sans-serif",
                      fontSize: "clamp(2rem, 4vw, 2.6rem)",
                      color: card.featured ? "#fff" : "#0f172a",
                    }}
                  >
                    {card.price}
                  </span>
                  {card.period && (
                    <span className="text-sm" style={{ color: card.featured ? "#a7f3d0" : "#94a3b8" }}>
                      {card.period}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {card.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: card.featured ? "rgba(255,255,255,0.15)" : "#d1fae5",
                        }}
                      >
                        <Check
                          size={10}
                          strokeWidth={3}
                          style={{ color: card.featured ? "#fff" : "#059669" }}
                        />
                      </div>
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: card.featured ? "#d1fae5" : "#374151" }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contacto"
                  className="block text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                  style={{
                    background: card.featured ? "#ffffff" : "#1b4332",
                    color: card.featured ? "#1b4332" : "#ffffff",
                  }}
                >
                  {card.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nota aclaratoria mensual & Garantía */}
        <div className="text-center mt-12 space-y-2">
          <p className="text-slate-600 text-sm font-medium">
            {data.monthly_note || "¿Prefieres acompañamiento mensual sin pack? Disponemos de opción individual desde 129€/mes."}
          </p>
          <p className="text-slate-500 text-xs">
            {data.guarantee_prefix || "Todos nuestros programas de 6 meses cuentan con nuestra "}
            <span className="text-emerald-700 font-bold">
              {data.guarantee_badge || "Garantía de Servicio Condicional"}
            </span>
            {data.guarantee_suffix || ": resultados o seguimos contigo sin coste."}
          </p>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: badgeStyles }} />
    </section>
  );
};

export default Plans;
