import { useTranslation } from "../i18n/LanguageProvider";
import { motion } from "framer-motion";

const Instagram = () => {
  const { t } = useTranslation();
  const data = t("instagram");

  // Real Instagram posts from @2befit.online feed
  const feedPosts = [
    {
      title: "Obstáculos a la\nhora de comer sano",
      image: "bg-gradient-to-br from-amber-200 to-amber-300",
    },
    {
      title: "y deseamos feliz\nNavidad",
      image: "bg-gradient-to-br from-orange-200 to-amber-200",
    },
    {
      title: "Entrenamiento &\nAnsiedad",
      image: "bg-gradient-to-br from-emerald-200 to-teal-200",
    },
    {
      title: "¿Tu dieta no\nfunciona?",
      image: "bg-gradient-to-br from-blue-200 to-cyan-200",
    },
    {
      title: "BRUTALES de\nazúcar",
      image: "bg-gradient-to-br from-yellow-200 to-amber-200",
    },
    {
      title: "Hoy es domingo\ny quizás estés",
      image: "bg-gradient-to-br from-slate-300 to-slate-200",
    },
    {
      title: "errores comunes\nal entrenar",
      image: "bg-gradient-to-br from-green-200 to-emerald-200",
    },
    {
      title: "Cardio, ¿antes o\ndespués?",
      image: "bg-gradient-to-br from-blue-200 to-slate-200",
    },
    {
      title: "La importancia\nde la proteína",
      image: "bg-gradient-to-br from-orange-200 to-rose-200",
    },
  ];

  return (
    <section id="instagram" className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
                {data.title}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {data.subtitle}
              </p>
            </div>

            {/* CTA Button */}
            <motion.a
              href="https://instagram.com/2befit.online"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-emerald-500 hover:from-pink-600 hover:to-emerald-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl w-fit"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <circle cx="17.5" cy="6.5" r="1.5" />
              </svg>
              {data.cta || "Síguenos en Instagram"}
            </motion.a>
          </motion.div>

          {/* Right: iPhone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-sm mx-auto">
              {/* iPhone Body - Dark frame */}
              <div className="relative aspect-[9/19.5] bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-900">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-950 rounded-b-3xl z-50" />

                {/* Screen Content */}
                <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col bg-gradient-to-b from-white to-gray-50">
                  {/* Top Bar - Instagram Header */}
                  <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-20">
                    <button className="text-2xl text-gray-700">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h1 className="font-bold text-slate-900 text-lg">2befit.online</h1>
                    <div className="flex gap-2">
                      <button className="text-gray-500 text-xl">🔔</button>
                      <button className="text-gray-500 text-xl">•••</button>
                    </div>
                  </div>

                  {/* Profile Section */}
                  <div className="px-4 py-4 bg-white border-b border-gray-200">
                    {/* Avatar and Stats */}
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/assets/favicon.png" alt="2BEFIT" className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-emerald-500" />
                      <div className="flex-1">
                        <h2 className="font-bold text-slate-900 mb-3">2BEFIT</h2>
                        <div className="flex justify-between text-center">
                          <div>
                            <div className="font-bold text-slate-900 text-sm">96</div>
                            <div className="text-xs text-slate-600">publicaciones</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">1.5K</div>
                            <div className="text-xs text-slate-600">seguidores</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">795</div>
                            <div className="text-xs text-slate-600">seguidos</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-slate-900 mb-1">👥 Patricio y Cristina 👩</p>
                      <p className="text-xs text-slate-700 leading-snug mb-2">La solución para optimizar salud y físico en pareja 💪</p>
                      <p className="text-xs text-slate-600 mb-2">Resultados mediante un método lógico y científico.</p>
                      <p className="text-xs text-blue-600 font-semibold mb-2">🔗 linktr.ee/2befit.online</p>
                      <p className="text-xs text-slate-700">@️ 2befit.online</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mb-4">
                      <button className="flex-1 px-3 py-2 bg-gray-100 text-slate-900 font-semibold text-xs rounded-lg hover:bg-gray-200 transition">
                        Siguiendo ▼
                      </button>
                      <button className="flex-1 px-3 py-2 bg-gray-100 text-slate-900 font-semibold text-xs rounded-lg hover:bg-gray-200 transition">
                        Mensaje
                      </button>
                      <button className="px-3 py-2 bg-gray-100 text-slate-900 font-semibold text-xs rounded-lg hover:bg-gray-200 transition">
                        +📧
                      </button>
                    </div>

                    {/* Highlights */}
                    <div className="flex gap-3 justify-start">
                      {["Reviews", "Familia", "Menús"].map((highlight, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div className="w-14 h-14 rounded-full bg-gray-300 border-2 border-gray-400 flex items-center justify-center">
                            <span className="text-gray-600 text-lg">📸</span>
                          </div>
                          <span className="text-xs text-slate-700 font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="px-4 py-3 bg-white border-b border-gray-200 flex gap-8">
                    <button className="text-xs font-semibold text-slate-900 border-b-2 border-slate-900 pb-2 flex items-center gap-1">
                      ⊞ Publicaciones
                    </button>
                  </div>

                  {/* Posts Grid */}
                  <div className="flex-1 overflow-y-auto bg-white">
                    <div className="grid grid-cols-3 gap-1 p-1">
                      {feedPosts.map((post, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.03 }}
                          className={`${post.image} aspect-square rounded-sm cursor-pointer relative overflow-hidden group`}
                        >
                          {/* Text overlay */}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center p-2">
                            <p className="text-white text-xs font-bold text-center leading-tight">
                              {post.title}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone shadow/glow */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-400/20 to-emerald-400/20 blur-3xl rounded-[3rem]" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Instagram;
