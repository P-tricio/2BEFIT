import { useTranslation } from "../i18n/LanguageProvider";

const Plans = () => {
  const { t } = useTranslation();
  const data = t("plans");

  const basic = data.basic;
  const top = data.top;
  const packBasic = data.pack.basic;
  const packTop = data.pack.top;

  return (
    <section id="planes" className="bg-light">
      <div className="container">
        <h3>{data.title}</h3>
        <div className="planes-tabs">
          <h4>{data.monthly}</h4>
          <div className="planes-grid">
            <div className="plan-card">
              <div className="plan-header">
                <h4>{basic.name}</h4>
                <p className="precio">
                  <span className="precio-anterior">{basic.price_old}</span>
                  <span>{basic.price}</span>/mes
                </p>
              </div>
              <ul>
                {basic.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <a href="#contacto" className="btn btn-secondary">
                {basic.cta}
              </a>
            </div>
            <div className="plan-card popular">
              <div className="popular-badge">{data.popular_badge}</div>
              <div className="plan-header">
                <h4>{top.name}</h4>
                <p className="precio">
                  <span>{top.price}</span>/mes
                </p>
              </div>
              <ul>
                {top.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <a href="#contacto" className="btn btn-primary">
                {top.cta}
              </a>
            </div>
          </div>
        </div>

        <div className="planes-tabs pack-transformacion">
          <div className="pack-header">
            <h4>{data.pack.transform}</h4>
            <p className="pack-descripcion">
              6 meses para alcanzar tu mejor versión con seguimiento completo y
              precio especial
            </p>
          </div>
          <div className="planes-grid">
            <div className="plan-card pack">
              <div className="plan-header">
                <div className="pack-badge">{packBasic.badge}</div>
                <h4>{packBasic.name}</h4>
                <p className="precio">
                  <span>{packBasic.price_total}</span>
                  <span className="periodo">{packBasic.period}</span>
                </p>
                <p className="precio-mes">{packBasic.per_month}</p>
                <p className="precio-anterior-total">{packBasic.previous}</p>
              </div>
              <ul>
                {packBasic.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <a href="#contacto" className="btn btn-secondary">
                {packBasic.cta}
              </a>
            </div>
            <div className="plan-card pack popular">
              <div className="popular-badge">{data.popular_badge}</div>
              <div className="plan-header">
                <div className="pack-badge">{packTop.badge}</div>
                <h4>{packTop.name}</h4>
                <p className="precio">
                  <span>{packTop.price_total}</span>
                  <span className="periodo">{packTop.period}</span>
                </p>
                <p className="precio-mes">{packTop.per_month}</p>
                <p className="precio-anterior-total">{packTop.previous}</p>
              </div>
              <ul>
                {packTop.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <a href="#contacto" className="btn btn-primary">
                {packTop.cta}
              </a>
            </div>
          </div>
        </div>

        <p className="consulta-gratuita">
          {data.pack.cta_text} <a href="#contacto">{t("nav.start_now")}</a>
        </p>
      </div>
    </section>
  );
};

export default Plans;
