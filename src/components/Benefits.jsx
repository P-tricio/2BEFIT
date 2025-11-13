import { useTranslation } from "../i18n/LanguageProvider";

const BenefitIcon = ({ index }) => {
  // Different icons for each benefit
  const icons = [
    // Personalized plans - target/crosshair
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="3" x2="12" y2="1" />
      <line x1="12" y1="23" x2="12" y2="21" />
      <line x1="3" y1="12" x2="1" y2="12" />
      <line x1="23" y1="12" x2="21" y2="12" />
    </svg>,
    // Expert follow-up - chart/graph
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="23 6 13 16 8 11 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>,
    // Exclusive app - smartphone
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12" y2="18.01" />
    </svg>,
    // Total flexibility - wind/movement
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>,
  ];

  return icons[index] || icons[0];
};

const Benefits = () => {
  const { t } = useTranslation();
  const data = t("benefits");

  return (
    <section id="beneficios">
      <div className="container">
        <div className="beneficios-header">
          <h3>{data.header}</h3>
          <p className="beneficios-subtitle">{data.subtitle}</p>
        </div>
        <div className="beneficios-grid">
          {data.items.map((it, i) => (
            <div key={i} className="beneficio-item">
              <div className="beneficio-icon">
                <BenefitIcon index={i} />
              </div>
              <h4>{it.title}</h4>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
