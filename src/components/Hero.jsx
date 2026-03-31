import { useTranslation } from "../i18n/LanguageProvider";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start center", "end center"],
  });
  const screen1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const screen2Y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const screenScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.2]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full overflow-hidden bg-[#0a2118]"
      style={{
        background: "radial-gradient(circle at 20% 30%, #1b4332 0%, #0a2118 100%)",
      }}
    >
      {/* Background glow behind phone */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between lg:min-h-screen pt-20 md:pt-28 pb-16 md:pb-24 gap-12 lg:gap-0">
        
        {/* ── Left Content: Copy + CTAs ─────────────────────────────────── */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-6">
              Premium Fitness Experience
            </span>
            <h1
              className="font-black tracking-tight text-white mb-6 leading-[1.05]"
              style={{
                fontFamily: "'Outfit', 'Inter', sans-serif",
                fontSize: "clamp(2.8rem, 7vw, 4.8rem)",
              }}
            >
              {t("hero.title") || (
                <>
                  Transforma tu<br />
                  <span className="text-emerald-400">cuerpo y mente</span>
                </>
              )}
            </h1>

            <p
              className="text-slate-300 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)" }}
            >
              {t("hero.paragraph") ||
                "Planes personalizados, seguimiento experto y la motivación que necesitas para alcanzar tus metas."}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8">
              <a
                href="#planes"
                className="px-10 py-6 bg-emerald-500 hover:bg-emerald-400 text-[#0a2118] font-bold rounded-2xl shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {t("hero.cta_start") || "Empezar transformación"}
              </a>
              <a
                href="#testimonios"
                className="px-10 py-6 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Ver testimonios
              </a>
            </div>

            {/* Floating stats */}
            <div className="flex justify-center lg:justify-start gap-14 mt-16 pt-10 border-t border-white/10 text-white/80">
              {[
                { val: "200+", label: "Clientes" },
                { val: "+9", label: "Años Experiencia" },
                { val: "24/7", label: "Soporte" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-white font-black text-3xl mb-1">{s.val}</div>
                  <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right Content: App Screens Composition ──────────────── */}
        <motion.div
          className="w-full lg:flex-1 flex justify-center lg:justify-end pr-0 lg:pr-8 relative h-[400px] md:h-[500px] lg:h-[700px]"
          style={{ perspective: 1200 }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Background screen (Plan Diario) */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10"
            style={{
              y: screen1Y,
              scale: screenScale,
              x: -80,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <img
                src="/assets/app-screen-1.png"
                alt="Plan Diario"
                className="w-64 md:w-80 h-auto drop-shadow-[0_30px_80px_rgba(0,0,0,0.4)] rounded-[2.5rem]"
                loading="eager"
              />
            </div>
          </motion.div>

          {/* Foreground screen (Sesión Completada) */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20"
            style={{
              y: screen2Y,
              scale: screenScale,
              x: 60,
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <img
                src="/assets/app-screen-2.png"
                alt="Sesión Completada"
                className="w-72 md:w-96 h-auto drop-shadow-[0_40px_120px_rgba(0,0,0,0.5)] rounded-[2.5rem]"
                loading="eager"
              />
            </div>
          </motion.div>

          {/* Animated background effects */}
          {/* Main glow halos */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/3 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-500 to-emerald-600 blur-[120px] rounded-full pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-20 -left-32 w-72 h-72 bg-gradient-to-tr from-emerald-400 to-teal-500 blur-[140px] rounded-full pointer-events-none"
          />

          {/* Accent glow - center right */}
          <motion.div
            animate={{
              scale: [1, 0.8, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute top-2/3 -right-60 w-96 h-96 bg-gradient-to-bl from-emerald-500/40 to-transparent blur-[160px] rounded-full pointer-events-none"
          />

          {/* Soft radial light - top center */}
          <motion.div
            animate={{
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/3 bg-gradient-to-b from-emerald-500/20 via-emerald-500/5 to-transparent blur-[200px] pointer-events-none"
          />

          {/* Animated accent line */}
          <motion.div
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent blur-md pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Modern Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[120px]" fill="white">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
        </svg>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(25px) scale(1.1); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
      `}} />
    </section>
  );
};

export default Hero;
