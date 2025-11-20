import React from "react";
import { useTranslation } from "../i18n/LanguageProvider";

const LanguageSwitcher = ({ className = "" }) => {
  const { lang, setLang } = useTranslation();

  const toggleLang = () => {
    setLang(lang === "es" ? "en" : "es");
  };

  // SVG de bandera de España (mejorada)
  const flagEs = (
    <svg
      className="flag-image"
      viewBox="0 0 60 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="60" height="30" fill="#AA151B" />
      <rect y="7.5" width="60" height="15" fill="#F1BF00" />
    </svg>
  );

  // SVG de bandera de Reino Unido (mejorada)
  const flagEn = (
    <svg
      className="flag-image"
      viewBox="0 0 60 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="cut-off-diagonals">
          <rect width="60" height="30" />
        </clipPath>
      </defs>
      
      {/* Fondo azul */}
      <rect width="60" height="30" fill="#012169" />
      
      {/* Diagonales blancas */}
      <g clipPath="url(#cut-off-diagonals)">
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
      </g>
      
      {/* Cruz blanca */}
      <path d="M30,0 V30 M0,15 H60" stroke="#FFF" strokeWidth="10" />
      
      {/* Cruz roja */}
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
