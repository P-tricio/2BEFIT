import React from "react";
import { useTranslation } from "../i18n/LanguageProvider";

const LanguageSwitcher = ({ className = "" }) => {
  const { lang, setLang } = useTranslation();

  const toggleLang = () => {
    setLang(lang === "es" ? "en" : "es");
  };

  // SVG de bandera de España
  const flagEs = (
    <svg
      className="flag-image"
      viewBox="0 0 900 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="900" height="600" fill="#C60B1E" />
      <rect y="150" width="900" height="300" fill="#FFC400" />
      <rect width="900" height="600" fill="#C60B1E" opacity="0" />
    </svg>
  );

  // SVG de bandera de Reino Unido
  const flagEn = (
    <svg
      className="flag-image"
      viewBox="0 0 60 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        stroke="#C8102E"
        strokeWidth="4"
        clipPath="polygon(0 0, 60 0, 60 30, 0 30)"
      />
      <path d="M30,0 V30 M0,15 H60" stroke="#FFF" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );

  return (
    <button
      aria-label={lang === "es" ? "Cambiar a English" : "Cambiar a Español"}
      className={`language-switcher ${className}`}
      onClick={toggleLang}
      title={lang === "es" ? "English" : "Español"}
    >
      <span className="flag-icon">{lang === "es" ? flagEn : flagEs}</span>
    </button>
  );
};

export default LanguageSwitcher;
