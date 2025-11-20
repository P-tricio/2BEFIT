import { useState, useEffect } from "react";
import { useTranslation } from "../i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  const isHome = location.pathname === "/";

  const getLink = (hash) => {
    return isHome ? hash : `/${hash}`;
  };

  return (
    <header
      className={`header ${isScrolled ? "scrolled" : ""} ${
        isMobileMenuOpen ? "menu-open" : ""
      }`}
    >
      <div className="container header-container">
        <Link to="/" className="logo" onClick={handleNavClick}>
          <img src="/assets/logo.png" alt="2BEFIT" />
        </Link>

        <nav className={`main-nav ${isMobileMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            {/** translated navigation */}
            <NavItems 
              onClick={handleNavClick} 
              isMobile={isMobileMenuOpen} 
              getLink={getLink}
            />
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

const NavItems = ({ onClick, getLink }) => {
  const { t } = useTranslation();
  return (
    <>
      <li>
        <a href={getLink("#hero")} onClick={onClick} aria-label={t("nav.home")}>
          <Home size={20} />
        </a>
      </li>
      <li>
        <a href={getLink("#problema")} onClick={onClick}>
          {t("nav.why_us")}
        </a>
      </li>
      <li>
        <a href={getLink("#beneficios")} onClick={onClick}>
          {t("nav.benefits")}
        </a>
      </li>
      <li>
        <a href={getLink("#como-funciona")} onClick={onClick}>
          {t("nav.how_it_works")}
        </a>
      </li>
      <li>
        <a href={getLink("#testimonios")} onClick={onClick}>
          {t("nav.testimonials")}
        </a>
      </li>
      <li>
        <a href={getLink("#planes")} onClick={onClick}>
          {t("nav.plans")}
        </a>
      </li>
      <li>
        <a href={getLink("#instagram")} onClick={onClick}>
          {t("nav.instagram")}
        </a>
      </li>
      <li>
        <a href={getLink("#faq")} onClick={onClick}>
          {t("nav.faq")}
        </a>
      </li>
      <li>
        <Link to="/entrenamiento-presencial" onClick={onClick}>
          {t("nav.in_person")}
        </Link>
      </li>
      <li className="nav-cta">
        <a href={getLink("#contacto")} className="btn btn-primary" onClick={onClick}>
          {t("nav.start_now")}
        </a>
      </li>
    </>
  );
};

export default Header;
