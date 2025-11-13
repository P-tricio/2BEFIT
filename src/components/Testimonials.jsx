import { useTranslation } from "../i18n/LanguageProvider";

const Testimonials = () => {
  const { t } = useTranslation();
  const data = t("testimonials");

  return (
    <section id="testimonios">
      <div className="container">
        <h3>{data.title}</h3>
        <div className="testimonios-grid">
          {data.items.map((it, i) => (
            <div key={i} className="testimonio">
              <p>"{it.text}"</p>
              <cite>- {it.cite}</cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
