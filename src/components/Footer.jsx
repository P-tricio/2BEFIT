import { useTranslation } from "../i18n/LanguageProvider";
import { motion } from "framer-motion";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 py-32 md:py-40 border-t border-slate-700/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 pb-12 border-b border-slate-700/30"
        >
          {/* Logo & tagline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center lg:items-start gap-4"
          >
            <img
              src="/assets/logo.png"
              alt="2BEFIT"
              className="h-10 object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
            />
            <p className="text-slate-400 text-sm max-w-xs text-center lg:text-left leading-relaxed">
              Transformando vidas a través del fitness y el compromiso personal
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8"
          >
            {[
              { href: "#planes", label: t("footer.plans") },
              { href: "#contacto", label: t("footer.contact") },
              { href: "#faq", label: t("footer.faq") },
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                whileHover={{ color: "#10b981" }}
                className="text-slate-400 hover:text-emerald-400 text-sm font-medium transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          {/* Social + copyright */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center lg:items-end gap-4"
          >
            <motion.a
              href="https://instagram.com/2befit.online"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-white/10 hover:bg-emerald-500/20 rounded-full transition-all duration-300 group"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300 group-hover:text-emerald-400 transition-colors">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.a>
            <p className="text-slate-500 text-xs text-center">
              © {currentYear} 2BEFIT. {t("footer.copyright")}
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom divider with accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 pt-8 text-center origin-left"
        >
          <p className="text-slate-500 text-xs tracking-widest uppercase">
            Transformando cuerpos. Cambiando mentalidades.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
