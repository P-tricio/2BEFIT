import { useState, useEffect } from "react";
import { useTranslation } from "../i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`header ${isScrolled ? "scrolled" : ""} ${
        isMobileMenuOpen ? "menu-open" : ""
      }`}
    >
      <div className="container header-container">
        <a href="#hero" className="logo" onClick={handleNavClick}>
          <img src="/assets/logo.png" alt="2BEFIT" />
        </a>

        <nav className={`main-nav ${isMobileMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            {/** translated navigation */}
            <NavItems onClick={handleNavClick} isMobile={isMobileMenuOpen} />
          </ul>
        </nav>

        <div className="header-right">
          <LanguageSwitcher className="header-lang" />

          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? "open" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú principal"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

const NavItems = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <>
      <li>
        <a href="#hero" onClick={onClick}>
          {t("nav.home")}
        </a>
      </li>
      <li>
        <a href="#problema" onClick={onClick}>
          {t("nav.why_us")}
        </a>
      </li>
      <li>
        <a href="#beneficios" onClick={onClick}>
          {t("nav.benefits")}
        </a>
      </li>
      <li>
        <a href="#como-funciona" onClick={onClick}>
          {t("nav.how_it_works")}
        </a>
      </li>
      <li>
        <a href="#testimonios" onClick={onClick}>
          {t("nav.testimonials")}
        </a>
      </li>
      <li>
        <a href="#planes" onClick={onClick}>
          {t("nav.plans")}
        </a>
      </li>
      <li>
        <a href="#instagram" onClick={onClick}>
          {t("nav.instagram")}
        </a>
      </li>
      <li>
        <a href="#faq" onClick={onClick}>
          {t("nav.faq")}
        </a>
      </li>
      <li className="nav-cta">
        <a href="#contacto" className="btn btn-primary" onClick={onClick}>
          {t("nav.start_now")}
        </a>
      </li>
    </>
  );
};

export default Header;
