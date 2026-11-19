import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get("lang");
        if (urlLang === "en" || urlLang === "es") {
          return urlLang;
        }
      }
      const saved = localStorage.getItem("lang");
      return saved === "en" || saved === "es" ? saved : "es";
    } catch {
      return "es";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // ignore
    }
    // set document language attribute for accessibility and SEO
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = (keyPath, fallback = "") => {
    if (!keyPath) return fallback;
    const parts = keyPath.split(".");
    let node = translations[lang] || {};
    for (const p of parts) {
      if (node && Object.prototype.hasOwnProperty.call(node, p)) {
        node = node[p];
      } else {
        return fallback || keyPath;
      }
    }
    return node;
  };

  const value = { lang, setLang, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }
  return ctx;
};

export default LanguageProvider;
