import { useTranslation } from "../i18n/LanguageProvider";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="hero">
      <div className="container">
        <span className="pre-title">{t("hero.pre_title")}</span>
        <h2>{t("hero.title")}</h2>
        <p>{t("hero.paragraph")}</p>
        <div className="cta-buttons">
          <a href="#planes" className="btn btn-primary">
            {t("hero.cta_start")}
          </a>
          <a href="#como-funciona" className="btn btn-outline">
            {t("hero.cta_how")}
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">200+</span>
            <span className="stat-label">{t("hero.stat_clients")}</span>
          </div>
          <div className="stat">
            <span className="stat-number">+9</span>
            <span className="stat-label">{t("hero.stat_success")}</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">{t("hero.stat_support")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
