import { useTranslation } from "../i18n/LanguageProvider";

const Problem = () => {
  const { t } = useTranslation();
  const data = t("problem");

  return (
    <section id="problema" className="bg-light">
      <div className="container">
        <h3>{data.title}</h3>
        <div className="problema-wrapper">
          <div className="problema-intro">
            <p>{data.intro}</p>
          </div>
          <div className="problemas-grid">
            {data.tags.map((tag, i) => (
              <div key={i} className="problema-item">
                <span className="problema-tag">{tag.tag}</span>
                <p>{tag.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
