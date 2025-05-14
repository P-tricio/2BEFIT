import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleSection = () => {
    setIsSectionOpen(!isSectionOpen);
    setOpenIndex(null); // Cerrar todas las preguntas cuando se cierra la sección
  };

  const questions = [
    {
      question: "¿Necesito experiencia previa para empezar?",
      answer:
        "No. Adaptamos el entrenamiento y la nutrición a tu nivel, tanto si eres principiante como si ya llevas tiempo entrenando.",
    },
    {
      question: "¿Tengo que pesar la comida?",
      answer:
        "No es obligatorio. Puedes usar una guía visual por porciones (mano, puño, pulgar) o si prefieres, trabajamos con macros exactos.",
    },
    {
      question: "¿Y si no me gusta algún alimento?",
      answer:
        "Personalizamos tu plan según tus preferencias, intolerancias o estilo de vida. No hay alimentos obligatorios.",
    },
    {
      question: "¿Puedo entrenar en casa?",
      answer:
        "Sí. Puedes elegir entrenar en casa, en gimnasio o combinar ambos. Adaptamos el plan al material que tengas.",
    },
    {
      question: "¿Puedo cambiar de plan después?",
      answer:
        "Claro. Puedes pasar del BASIC al TOP en cualquier momento, o renovar por el pack semestral si quieres aprovechar el descuento.",
    },
    {
      question: "¿Qué incluye la app?",
      answer:
        "Acceso a tu rutina, pautas nutricionales, feedback, seguimiento semanal y todo el historial de progresos.",
    },
    {
      question: "¿Cómo se hace el seguimiento?",
      answer:
        "Cada semana revisamos tu progreso, resolvemos dudas y ajustamos tu plan. En el plan TOP además tienes videollamada quincenal para comentar tus avances.",
    },
    {
      question: "¿Cómo contrato el servicio?",
      answer:
        'Puedes empezar desde esta web pulsando en "¡Quiero empezar!" para enviarnos un mensaje por WhatsApp. Puedes contactar a través de Instagram si te resulta más cómodo.',
    },
  ];

  return (
    <section id="faq" className={`bg-light ${isSectionOpen ? "open" : ""}`}>
      <div className="container">
        <div className="faq-header" onClick={toggleSection}>
          <h3>❓ Preguntas frecuentes</h3>
          <span className="section-toggle-icon">
            {isSectionOpen ? "−" : "+"}
          </span>
        </div>
        <div className={`faq-content ${isSectionOpen ? "show" : ""}`}>
          <div className="faq-grid">
            {questions.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleQuestion(index);
                }}
              >
                <div className="faq-question">
                  <h4>{item.question}</h4>
                  <span className="faq-icon">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </div>
                <div
                  className={`faq-answer ${openIndex === index ? "show" : ""}`}
                >
                  <p>{item.answer}</p>
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
