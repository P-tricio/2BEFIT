import { useTranslation } from "../i18n/LanguageProvider";

const Footer = () => {
  const { t } = useTranslation();
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
              <a href="#planes">{t("footer.plans")}</a>
              <a href="#contacto">{t("footer.contact")}</a>
              <a href="#faq">{t("footer.faq")}</a>
            </div>
            <p className="footer-legal">
              © {currentYear} 2BEFIT. {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
