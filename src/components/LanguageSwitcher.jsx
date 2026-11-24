import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars -- Used as JSX namespace (<motion.*>)
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "../i18n/LanguageProvider";

const LanguageSwitcher = ({ className = "", scrolled = false }) => {
  const { lang, setLang } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "es", label: "Español", flag: "ES" },
    { code: "en", label: "English", flag: "EN" },
  ];

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

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
        type="button"
        aria-label="Cambiar idioma"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen((open) => !open)}
        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border transition-all duration-200 ${
          scrolled
            ? "bg-slate-100 border-slate-300/80 text-slate-800 hover:bg-slate-200/70"
            : "bg-white/15 border-white/30 text-white hover:bg-white/25"
        }`}
      >
        <span className="text-sm font-extrabold tracking-wide">{currentLang.flag}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute top-full right-0 mt-2 z-50 min-w-[164px]"
            >
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-900/5">
                <div className="p-1.5 flex flex-col gap-0.5">
                  {languages.map((item) => {
                    const selected = item.code === currentLang.code;
                    return (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => handleSelect(item.code)}
                        className={`w-full px-3.5 py-2.5 flex items-center gap-3 rounded-xl text-left transition-colors text-sm ${
                          selected
                            ? "bg-emerald-50 text-[#1b4332] font-semibold"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 font-medium"
                        }`}
                      >
                        <span
                          className={`text-xs font-extrabold tracking-wider px-1.5 py-0.5 rounded ${
                            selected
                              ? "bg-[#2d6a4f] text-white"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.flag}
                        </span>
                        <span className="flex-1">{item.label}</span>
                        {selected && (
                          <span className="text-[#2d6a4f] font-bold" aria-hidden="true">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
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
