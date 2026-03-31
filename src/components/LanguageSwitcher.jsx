import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../i18n/LanguageProvider";

const LanguageSwitcher = ({ className = "", scrolled = false }) => {
  const { lang, setLang } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "es", label: "Español", flag: "ES" },
    { code: "en", label: "English", flag: "EN" },
  ];

  const currentLang = languages.find(l => l.code === lang);

  const handleSelect = (code) => {
    if (code !== lang) {
      setLang(code);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
          scrolled
            ? "bg-slate-100/50 border border-slate-200/50 text-slate-700 hover:bg-slate-100"
            : "bg-white/10 border border-white/20 text-white hover:bg-white/15 hover:border-white/30"
        }`}
      >
        <span className="text-base font-black">{currentLang?.flag}</span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-full right-0 mt-2 z-50 min-w-max"
            >
              <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-2">
                  {languages.map((lang, idx) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => handleSelect(lang.code)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                      className={`w-full px-4 py-3 flex items-center gap-3 rounded-xl text-left transition-all text-sm font-medium group ${
                        lang.code === currentLang?.code
                          ? "bg-emerald-500/30 text-emerald-200"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      <span className="text-base font-black min-w-8">{lang.flag}</span>
                      <span className="flex-1 text-sm">{lang.label}</span>
                      {lang.code === currentLang?.code && (
                        <motion.div
                          layoutId="checkmark"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="text-emerald-300"
                        >
                          ✓
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
