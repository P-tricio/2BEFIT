import { useState, useEffect } from "react";

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

        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menú principal"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`main-nav ${isMobileMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li>
              <a href="#problema" onClick={handleNavClick}>
                ¿Por qué nosotros?
              </a>
            </li>
            <li>
              <a href="#beneficios" onClick={handleNavClick}>
                Beneficios
              </a>
            </li>
            <li>
              <a href="#como-funciona" onClick={handleNavClick}>
                Cómo funciona
              </a>
            </li>
            <li>
              <a href="#testimonios" onClick={handleNavClick}>
                Testimonios
              </a>
            </li>
            <li>
              <a href="#faq" onClick={handleNavClick}>
                FAQ
              </a>
            </li>
            <li>
              <a href="#planes" onClick={handleNavClick}>
                Planes
              </a>
            </li>
            <li>
              <a href="#instagram" onClick={handleNavClick}>
                Instagram
              </a>
            </li>
            <li className="nav-cta">
              <a
                href="#contacto"
                className="btn btn-primary"
                onClick={handleNavClick}
              >
                Empezar ahora
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
