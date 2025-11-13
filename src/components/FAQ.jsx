import { useState } from "react";
import { useTranslation } from "../i18n/LanguageProvider";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const { t } = useTranslation();

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleSection = () => {
    setIsSectionOpen(!isSectionOpen);
    setOpenIndex(null); // close all when collapsing
  };

  const faq = t("faq");

  return (
    <section id="faq" className={`bg-light ${isSectionOpen ? "open" : ""}`}>
      <div className="container">
        <div className="faq-header" onClick={toggleSection}>
          <h3>{faq.title}</h3>
          <span className="section-toggle-icon">
            {isSectionOpen ? "−" : "+"}
          </span>
        </div>
        <div className={`faq-content ${isSectionOpen ? "show" : ""}`}>
          <div className="faq-grid">
            {faq.questions.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleQuestion(index);
                }}
              >
                <div className="faq-question">
                  <h4>{item.q}</h4>
                  <span className="faq-icon">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </div>
                <div
                  className={`faq-answer ${openIndex === index ? "show" : ""}`}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
