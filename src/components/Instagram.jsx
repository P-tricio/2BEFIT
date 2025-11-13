import { useTranslation } from "../i18n/LanguageProvider";

const Instagram = () => {
  const { t } = useTranslation();
  const data = t("instagram");

  return (
    <section id="instagram" className="bg-light">
      <div className="container">
        <div className="instagram-wrapper">
          <div className="instagram-content">
            <div className="instagram-header">
              <div className="instagram-title">
                <h3>{data.title}</h3>
                <p className="instagram-subtitle">{data.subtitle}</p>
              </div>
              <a
                href="https://instagram.com/2befit.online"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-profile"
              >
                <div className="instagram-avatar">
                  <img src="/assets/favicon.png" alt="2BEFIT" />
                </div>
                <div className="instagram-info">
                  <span className="instagram-handle">{data.handle}</span>
                  <span className="instagram-meta">{data.meta}</span>
                </div>
              </a>
            </div>
            <div className="instagram-features">
              {data.features.map((f, i) => (
                <div key={i} className="instagram-feature">
                  <span className="feature-icon">{f.icon}</span>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="instagram-cta">
              <a
                href="https://instagram.com/2befit.online"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <span className="instagram-btn-icon">📸</span>
                {data.cta}
              </a>
              <p className="instagram-followers">{data.followers}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instagram;
