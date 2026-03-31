import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const getLink = (hash) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMobileOpen(false);

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    close();
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/96 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Scroll progress */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-[#2d6a4f] transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 relative">
        {/* Logo */}
        <button onClick={handleLogoClick} className="flex-shrink-0 hover:opacity-80 transition-opacity">
          <img src="/assets/logo.png" alt="2BEFIT" className="h-7 object-contain" />
        </button>

        {/* Desktop nav — centered */}
        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {[
            { label: t("nav.why_us"), href: getLink("#problema") },
            { label: t("nav.benefits"), href: getLink("#beneficios") },
            { label: t("nav.how_it_works"), href: getLink("#como-funciona") },
            { label: t("nav.testimonials"), href: getLink("#testimonios") },
            { label: t("nav.plans"), href: getLink("#planes") },
            { label: t("nav.in_person"), href: getLink("#presencial") },
            { label: t("nav.faq"), href: getLink("#faq") },
          ].map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ color: scrolled ? "#2d6a4f" : "#ffffff" }}
              className={`text-sm font-medium transition-colors duration-150 ${
                scrolled ? "text-slate-600 hover:text-[#2d6a4f]" : "text-white hover:text-white/80"
              }`}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4 overflow-visible">
          <LanguageSwitcher scrolled={scrolled} />
          <motion.a
            href={getLink("#contacto")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:inline-flex items-center text-sm font-semibold text-white bg-gradient-to-r from-[#2d6a4f] to-emerald-500 hover:from-[#1b4332] hover:to-[#2d6a4f] rounded-full px-6 py-2.5 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {t("nav.start_now") || "Empezar ahora"}
          </motion.a>
          <button
            className={`lg:hidden p-1.5 transition-colors ${
              scrolled ? "text-slate-600 hover:text-[#2d6a4f]" : "text-white hover:text-white/80"
            }`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menú"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden bg-white border-t border-slate-100 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-3">
            {[
              { label: t("nav.why_us"), href: getLink("#problema") },
              { label: t("nav.benefits"), href: getLink("#beneficios") },
              { label: t("nav.how_it_works"), href: getLink("#como-funciona") },
              { label: t("nav.testimonials"), href: getLink("#testimonios") },
              { label: t("nav.plans"), href: getLink("#planes") },
              { label: t("nav.in_person"), href: getLink("#presencial") },
              { label: t("nav.faq"), href: getLink("#faq") },
              { label: t("nav.instagram"), href: getLink("#instagram") },
            ].map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={close}
                whileHover={{ x: 5, color: "#2d6a4f" }}
                className="text-base font-medium text-slate-700 hover:text-[#2d6a4f] py-2 transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href={getLink("#contacto")}
              onClick={close}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3 text-center font-semibold text-white bg-gradient-to-r from-[#2d6a4f] to-emerald-500 hover:from-[#1b4332] hover:to-[#2d6a4f] py-3 rounded-full transition-all"
            >
              {t("nav.start_now") || "Empezar ahora"}
            </motion.a>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
