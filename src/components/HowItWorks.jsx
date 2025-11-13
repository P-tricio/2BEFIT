import { useTranslation } from "../i18n/LanguageProvider";

const HowItWorks = () => {
  const { t } = useTranslation();
  const data = t("how");

  return (
    <section id="como-funciona" className="bg-light">
      <div className="container">
        <h3>{data.title}</h3>
        <div className="proceso-grid">
          {data.steps.map((s, i) => (
            <div key={i} className="proceso-item">
              <div className="proceso-icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="proceso-cta">
          <a href="#contacto" className="btn btn-primary">
            {data.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
