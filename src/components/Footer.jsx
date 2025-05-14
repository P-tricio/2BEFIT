const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/assets/logo.png" alt="2BEFIT" className="footer-logo" />
            <p className="footer-tagline">
              Transformando vidas a través del fitness
            </p>
          </div>
          <div className="footer-info">
            <div className="footer-links">
              <a href="#planes">Planes</a>
              <a href="#contacto">Contacto</a>
              <a href="#faq">FAQ</a>
            </div>
            <p className="footer-legal">
              © {currentYear} 2BEFIT. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
